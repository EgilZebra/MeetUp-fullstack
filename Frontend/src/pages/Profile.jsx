import React, { useState, useEffect } from "react";
import AllMU from "../components/allMU/AllMU";
import MyMU from "../components/myMU/MyMU";
import SearchMU from "../components/searchMU/SearchMU";
import CreateMU from "../components/forms/createMU/CreateMU";
import Overlay from "../components/overlay/Overlay";
import "./style/Profile.css";
import { getAPI } from "../utils/api"; // Import the getAPI function

const UserProfile = () => {
  const [activeButton, setActiveButton] = useState("Min Profil");
  const [meetupsData, setMeetupsData] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const fetchMeetups = async () => {
    try {
      const apiData = await getAPI();
      setMeetupsData(apiData);
    } catch (error) {
      console.error("Error fetching meetups:", error);
    }
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  const handleMoreInfoClick = (meetup) => {
    setSelectedMeetup(meetup);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedMeetup(null);
  };

  return (
    <div className="userProfile-wrapper">
      <div className="userProfile-personalInfo">
        <h1>username</h1>
        <p>eventuell lägga till övrig personalInfo</p>
        <button className="userProfile-personalInfo__logout">Logga ut</button>
      </div>

      <div className="userProfile-menu">
        <button
          className={activeButton === "Min Profil" ? "userProfile-active" : ""}
          onClick={() => setActiveButton("Min Profil")}
        >
          Min Profil
        </button>
        <button
          className={activeButton === "Sök Meetups" ? "userProfile-active" : ""}
          onClick={() => setActiveButton("Sök Meetups")}
        >
          Sök Meetups
        </button>
        <button
          className={
            activeButton === "Alla Meetups" ? "userProfile-active" : ""
          }
          onClick={() => setActiveButton("Alla Meetups")}
        >
          Alla Meetups
        </button>
        <button
          className={
            activeButton === "Skapa Meetup" ? "userProfile-active" : ""
          }
          onClick={() => setActiveButton("Skapa Meetup")}
        >
          Skapa Meetup
        </button>
      </div>

      <div className="userProfile-content">
        {activeButton === "Min Profil" && (
          <div className="userProfile-content__profile">
            {meetupsData.length > 0 ? (
              <table className="userProfile-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Platser tillgängliga</th>
                    <th>Platser lediga</th>
                    <th>Anmälan</th>
                    <th>AV-Anmälan</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  {meetupsData.map((meetup) => {
                    const participants = meetup.participants
                      ? meetup.participants.split(",")
                      : [];
                    const availableSpots =
                      meetup.capacity - participants.length;

                    const currentUserId = "elva";
                    const participant = participants.includes(currentUserId);

                    return (
                      <tr key={meetup.MeetingId}>
                        <td>{new Date(meetup.date).toLocaleDateString()}</td>
                        <td>{meetup.name}</td>
                        <td>{meetup.capacity}</td>
                        <td>{availableSpots}</td>
                        <td>
                          <button disabled={availableSpots === 0}>
                            {availableSpots > 0 ? "Anmäl mig" : "Fullt"}
                          </button>
                        </td>
                        <td>
                          <button disabled={participant === false}>
                            {participant ? "AvAnmäl mig" : "Ej anmäld"}
                          </button>
                        </td>
                        <td>
                          <button onClick={() => handleMoreInfoClick(meetup)}>
                            Mer information
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
            <AllMU meetupsData={meetupsData} />
          </div>
        )}
        {activeButton === "Skapa Meetup" && (
          <div className="userProfile-content__createMU">
            <CreateMU />
          </div>
        )}
      </div>

      {isOverlayOpen && (
        <Overlay
          isOpen={isOverlayOpen}
          selectedMeetup={selectedMeetup}
          onClose={closeOverlay}
        />
      )}
    </div>
  );
};

export default UserProfile;
