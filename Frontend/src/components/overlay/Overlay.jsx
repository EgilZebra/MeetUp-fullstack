import React from "react";
import "./Overlay.css";

const Overlay = ({ isOpen, selectedMeetup, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="selectedMU-overlay">
      <div className="selectedMU-overlay-content">
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
