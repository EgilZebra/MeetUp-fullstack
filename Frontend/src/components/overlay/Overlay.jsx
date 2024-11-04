import React, { useState, useEffect } from "react";
import "./Overlay.css";
const API_URL_BASE =
  process.env.VITE_API_URL == undefined
    ? import.meta.env.VITE_API_URL
    : process.env.VITE_API_URL;

const Overlay = ({ isOpen, selectedMeetup, onClose }) => {
  const token = localStorage.getItem("token");
  if (!isOpen) return null;
  const meetingId = selectedMeetup.MeetingId;
  const [registerStatus, setRegisterStatus] = useState(null);
  const [unregisterStatus, setUnregisterStatus] = useState(null);
  //const [isMUFUll, setIsMUFull] = useState(false);
  const isEventFull =
    selectedMeetup.participants.length < selectedMeetup.capacity ? false : true;

  const registerMU = async () => {
    try {
      const response = await fetch(`${API_URL_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meetingId: meetingId,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        alert(data.message ? data.message : data.error);
      }
      setRegisterStatus(
        response.status === 200
          ? "Registered successfully"
          : "Failed to register"
      );
      console.log(data);
      return data;
    } catch (error) {
      setRegisterStatus("Error unregistering");
      console.error("Error:", error);
    }
  };

  const unRegisterMU = async () => {
    try {
      const response = await fetch(`${API_URL_BASE}/register`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meetingId: meetingId,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        alert(data.message ? data.message : data.error);
      }
      setUnregisterStatus(
        response.status === 200
          ? "Unregistered successfully"
          : "Failed to unregister"
      );
      console.log(data);
      return data;
    } catch (error) {
      setUnregisterStatus(
        response.status === 200
          ? "Unregistered successfully"
          : "Failed to unregister"
      );
      console.error("Error:", error);
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
        <h2>Name: {selectedMeetup.name}</h2>

        <p>
          <strong>Start-time:</strong> {selectedMeetup.starttime}
        </p>
        <p>
          <strong>End-time:</strong> {selectedMeetup.endtime}
        </p>
        <p>
          <strong>Max antal platser:</strong> {selectedMeetup.capacity}
        </p>
        <p>
          <strong>Värd:</strong> {selectedMeetup.host}
        </p>
        <p>
          <strong>Participants:</strong> {selectedMeetup.participants}
        </p>
        {isEventFull ? (
          <button disabled className="button-registerMU">
            Event Fullt
          </button>
        ) : (
          <button
            className="button-registerMU"
            onClick={() => registerMU(meetingId)}
          >
            Anmäl mig
          </button>
        )}

        <button onClick={() => unRegisterMU(meetingId)}>Avanmäl mig</button>
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
