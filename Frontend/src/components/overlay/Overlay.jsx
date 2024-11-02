import React from "react";
import "./Overlay.css";
import axios from "axios";
const API_URL_BASE = process.env.API_URL_BASE;

const Overlay = ({ isOpen, selectedMeetup, onClose, currentUserId }) => {
  if (!isOpen) return null;
  const userName = currentUserId;
  const meetingId = selectedMeetup.MeetingId;

  const registerMU = async () => {
    try {
      const url = API_URL_BASE + "/register";
      console.log("URL", url);
      const response = await axios.post(url, { userName, meetingId });
      console.log("response", response);
      const data = response.data.data.Items;
      //console.log(data);
      // setMeetupsData(data);
      return data;
    } catch (error) {
      console.error("Error register meetups:", error);
    }
  };

  const unRegisterMU = async () => {
    try {
      const url = API_URL_BASE + "/register";
      console.log("URL", url);
      const response = await axios.delete(url, {
        data: { userName, meetingId }, // Use 'data' to send the payload with axios.delete
      });
      console.log("response", response);
      const data = response.data.data.Items;
      return data;
    } catch (error) {
      console.error("Error unRegister meetups:", error);
    }
  };

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
        <button onClick={() => registerMU(userName, meetingId)}>
          Anmäl mig
        </button>
        <button onClick={() => unRegisterMU(userName, meetingId)}>
          Avanmäl mig
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
