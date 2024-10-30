import React, { useState, useEffect } from "react";
import AllMU from "../components/allMU/AllMU";
import MyMU from "../components/myMU/MyMU";
import SearchMU from "../components/searchMU/SearchMU";
import CreateMU from "../components/forms/createMU/CreateMU";
import "./style/Profile.css";
import axios from "axios";

const UserProfile = () => {
  const [activeButton, setActiveButton] = useState("Min Profil");
  const [meetupsData, setMeetupsData] = useState([]); // State to store fetched data

  const fetchMeetups = async () => {
    try {
      const response = await axios.get(
        "https://xj9ne7lghe.execute-api.eu-north-1.amazonaws.com/meetups"
      );
      const data = response.data.data; // Access the 'data' array from the API response
      setMeetupsData(data);
    } catch (error) {
      console.error("Error fetching meetups:", error);
    }
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  return (
    <div className="userProfile-wrapper">
      <div className="userProfile-personalInfo">
        <h1>username</h1>
        <p>eventuell lägga till övrig personalInfo</p>
        <button className="userProfile-personalInfo__logout">Logga ut</button>
      </div>

      <div className="userProfile-menu">
        <button
          className={activeButton === "Min Profil" ? "active" : ""}
          onClick={() => setActiveButton("Min Profil")}
        >
          Min Profil
        </button>
        <button
          className={activeButton === "Sök Meetups" ? "active" : ""}
          onClick={() => setActiveButton("Sök Meetups")}
        >
          Sök Meetups
        </button>
        <button
          className={activeButton === "Alla Meetups" ? "active" : ""}
          onClick={() => setActiveButton("Alla Meetups")}
        >
          Alla Meetups
        </button>
        <button
          className={activeButton === "Skapa Meetup" ? "active" : ""}
          onClick={() => setActiveButton("Skapa Meetup")}
        >
          Skapa Meetup
        </button>
      </div>

      <div className="userProfile-content">
        {activeButton === "Min Profil" && (
          <div className="userProfile-content__profile">
            <h2>API Data:</h2>
            {meetupsData.length > 0 ? (
              <ul>
                {meetupsData.map((meetup) => (
                  <li key={meetup.MeetingId}>
                    <h3>{meetup.name}</h3>
                    <p>Date: {meetup.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No meetups available.</p>
            )}
          </div>
        )}
        {activeButton === "Sök Meetups" && (
          <div className="userProfile-content__searchMUs">
            <SearchMU />
          </div>
        )}
        {activeButton === "Alla Meetups" && (
          <div className="userProfile-content__listMUs">
            <AllMU meetupsData={meetupsData} />{" "}
            {/* Pass fetched data to AllMU */}
          </div>
        )}
        {activeButton === "Skapa Meetup" && (
          <div className="userProfile-content__createMU">
            <CreateMU />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
