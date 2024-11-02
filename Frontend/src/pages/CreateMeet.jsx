import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL_BASE = (process.env.VITE_API_URL == undefined) ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL ;
import './style/CreateMeet.css';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    city: '',
    location: '',
    starttime: '',
    endtime: '',
    capacity: '',
    name: '',
    participants: [],
  });

  const [participantInput, setParticipantInput] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddParticipant = () => {
    if (participantInput.trim()) {
      setFormData({
        ...formData,
        participants: [...formData.participants, participantInput.trim()],
      });
      setParticipantInput('');
    }
  };

  const handleCreateMeet = async () => {
    const payLoad = {
      city: formData.city,
      location: formData.location,
      starttime: formData.starttime,
      endtime: formData.endtime,
      capacity: parseInt(formData.capacity, 10),
      name: formData.name,
      participants: formData.participants,
    };

    setLoading(true);

    try {
      const token = localStorage.getItem(token);
      const response = await fetch(`${API_URL_BASE}/create-meetup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payLoad),
      });

      if (response.ok) {
        toast.success('Meetup created successfully!');
        setFormData({
          city: '',
          location: '',
          starttime: '',
          endtime: '',
          capacity: '',
          name: '',
          participants: [],
        });
        setErrors({});
        setTimeout(() => {
          GoTo('/profile');
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error creating meetup');
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.starttime.trim()) newErrors.starttime = 'Start time is required';
    if (!formData.endtime.trim()) newErrors.endtime = 'End time is required';
    if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.participants.length === 0) newErrors.participants = 'At least one participant is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      handleCreateMeet();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Create Meetup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="starttime">Start Time</label>
            <input
              id="starttime"
              name="starttime"
              type="datetime-local"
              value={formData.starttime}
              onChange={handleChange}
              className={errors.starttime ? 'error' : ''}
            />
            {errors.starttime && <span className="error-message">{errors.starttime}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endtime">End Time</label>
            <input
              id="endtime"
              name="endtime"
              type="datetime-local"
              value={formData.endtime}
              onChange={handleChange}
              className={errors.endtime ? 'error' : ''}
            />
            {errors.endtime && <span className="error-message">{errors.endtime}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              className={errors.capacity ? 'error' : ''}
            />
            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="participants">Participants</label>
            <input
              id="participants"
              name="participants"
              type="text"
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              className={errors.participants ? 'error' : ''}
            />
            <button type="button" className= "Createbtn" onClick={handleAddParticipant}>
              Add Participant
            </button>
            {errors.participants && <span className="error-message">{errors.participants}</span>}
            <div>
              {formData.participants.map((participant, index) => (
                <span key={index} className="participant-badge">
                  {participant}
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="Createbtn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Meetup'}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreateForm;
