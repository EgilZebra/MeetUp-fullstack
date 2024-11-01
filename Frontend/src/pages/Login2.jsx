import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle submit
  const handleSubmitLogin = async () => {
    const payLoad = { 
      username: formData.username, 
      password: formData.password 
    };
    console.log("Payload to send:", payLoad);
    
    try {
      const response = await fetch('https://glgh7httw0.execute-api.eu-north-1.amazonaws.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });

      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json(); // Get the response data
        console.log("Login successful, received data:", data);
        localStorage.setItem('token', data.token, data.username ); // Store token in localStorage
        toast.success('Account Login successful');
        setTimeout(() => {
          window.location.href = 'http://localhost:5173/profile';
        }, 1000);
      } else {
        const errorData = await response.json(); // Handle errors returned by your API
        console.log("Error response data:", errorData);
        toast.error(`Error Login account: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Caught error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      await handleSubmitLogin(); // Await the promise
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
          <div>
            <p>Already have an account?</p>
            <button type="button" onClick={() => window.location.href = 'http://localhost:5173/signup2'}>
              Sign up Here
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          padding: 1rem;
        }

        .form-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
          font-size: 0.9rem;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        input.error {
          border-color: #dc3545;
        }

        .error-message {
          color: #dc3545;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
        }

        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: #357abd;
        }

        button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.4);
        }
      `}</style>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
