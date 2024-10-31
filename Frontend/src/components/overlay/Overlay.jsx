// src/components/Overlay.js
import React from "react";
import "./Overlay.css"; // Add styles for your overlay if needed

const Overlay = ({ isOpen, selectedMeetup, onClose }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>{selectedMeetup.name}</h2>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(selectedMeetup.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Capacity:</strong> {selectedMeetup.capacity}
        </p>
        <p>
          <strong>Participants:</strong> {selectedMeetup.participants}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
