import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
      setIsVisible(!isVisible);
  };

  // Handle submit
  const handleSubmitSignup = async () => {
      const payLoad = { username, password };
      try {
          // Create a POST request
          const response = await fetch('https://glgh7httw0.execute-api.eu-north-1.amazonaws.com/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payLoad),
          });

          // Check if the request was successful
          if (response.ok) {
              toast.success('Account created successfully');
          } else {
              toast.error('Error creating account');
          }
      } catch (error) {
          console.log(error, { success: false, error: error.message });
          toast.error("An error occurred. Please try again.");
      }
  };

  return (
      <Card className="w-[350px]">
          <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>Meetup</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid w-full gap-4">
                  <div className="grid gap-2 items-start space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                          id="username"
                          type="text"
                          placeholder="JohnDoe123"
                          value={username} // Bind username state
                          onChange={(e) => setUsername(e.target.value)} // Update state on change
                      />
                  </div>
              </div>
              <div className="grid gap-2 items-start space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                      id="password"
                      type={isVisible ? "text" : "password"}
                      value={password} // Bind password state
                      onChange={(e) => setPassword(e.target.value)} // Update state on change
                  />
                  <Switch
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-blue-500"
                      checked={isVisible}
                  />
              </div>
          </CardContent>
          <CardFooter>
              <Button className="w-full" onClick={handleSubmitSignup}>
                  Sign up
              </Button>
          </CardFooter>
          <ToastContainer /> {/* Container for displaying toasts */}
      </Card>
  );
}

export default Signup;
