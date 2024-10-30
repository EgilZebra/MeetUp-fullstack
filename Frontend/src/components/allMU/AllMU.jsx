// AllMU.js
import React from "react";

const AllMU = ({ meetups }) => {
  return (
    <div>
      <h2>Alla Meetups</h2>
      <ul>
        {meetups.map((meetup, index) => (
          <li key={index}>
            <h3>{meetup.name}</h3> {/* Meetup name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMU;
