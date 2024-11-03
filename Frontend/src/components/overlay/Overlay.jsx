import React, { useState, useEffect } from "react";
import "./Overlay.css";
import axios from "axios";
const API_URL_BASE = (process.env.VITE_API_URL == undefined) ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL;

const Overlay = ({ isOpen, selectedMeetup, onClose, currentUserId }) => {
  if (!isOpen) return null;
  const userName = currentUserId;
  const meetingId = selectedMeetup.MeetingId;
  console.log("userName", userName);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [unregisterStatus, setUnregisterStatus] = useState(null);

  const registerMU = async () => {
    try {
      const url = API_URL_BASE + "/register";
      console.log("URL", url);
      const response = await axios.post(url, { meetingId });
      console.log("response", response);
      const data = response.data.data.Items;
      setRegisterStatus(
        response.status === 200
          ? "Registered successfully"
          : "Failed to register"
      );
      //console.log(data);
      // setMeetupsData(data);
      return data;
    } catch (error) {
      setRegisterStatus("Error unregistering");
      console.error("Error register meetups:", error);
    }
  };

  const unRegisterMU = async () => {
    try {
      const url = API_URL_BASE + "/register";
      console.log("URL", url);
      const response = await axios.delete(url, {
        data: { meetingId },
      });
      console.log("response", response);
      const data = response.data.data.Items;
      setUnregisterStatus(
        response.status === 200
          ? "Unregistered successfully"
          : "Failed to unregister"
      );
      return data;
    } catch (error) {
      setUnregisterStatus(
        response.status === 200
          ? "Unregistered successfully"
          : "Failed to unregister"
      );
      console.error("Error unRegister meetups:", error);
    }
  };

  useEffect(() => {
    if (registerStatus || unregisterStatus) {
      console.log("Status updated:", { registerStatus, unregisterStatus });
    }
  }, [registerStatus, unregisterStatus]);

  return (
    <div className="selectedMU-overlay">
      {console.log("selected MU", selectedMeetup)}
      <div className="selectedMU-overlay-content">
        <h2>{selectedMeetup.name}</h2>
        <p>user: {currentUserId}</p>
        <p>
          <strong>Date:</strong>{" "}
        </p>
        <p>
          <strong>Capacity:</strong> {selectedMeetup.capacity}
        </p>
        <p>
          <strong>Participants:</strong> {selectedMeetup.participants}
        </p>
        <button onClick={() => registerMU( meetingId)}>
          Anmäl mig
        </button>
        <button onClick={() => unRegisterMU( meetingId)}>
          Avanmäl mig
        </button>
        <button onClick={onClose}>Close</button>
        {registerStatus && <p className="status-message">{registerStatus}</p>}
        {unregisterStatus && (
          <p className="status-message">{unregisterStatus}</p>
        )}
      </div>
    </div>
  );
};

export default Overlay;
