import { useState } from "react";
import AllMU from "../components/Allmu/AllMU";
import MyMU from "../components/myMU/MyMU";
import SearchMU from "../components/searchMU/SearchMU";
import CreateMU from "../components/forms/createMU/CreateMU";
import "./style/Profile.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "../components/overlay/Overlay";

const API_URL_BASE = process.env.API_URL_BASE;

const profile = () => {
  const GoTo = useNavigate();
  const [activeButton, setActiveButton] = useState("Alla Meetups");

  const [meetupsData, setMeetupsData] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const fetchMeetups = async () => {
    try {
      const url = API_URL_BASE + "/meetups";
      console.log("URL", url);
      const response = await axios.get(url);
      console.log("response", response);
      const data = response.data.data;
      console.log(data);
      setMeetupsData(data);
      return data;
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
    <div className="profile--wrapper">
      <div className="profile--personalInfo">
        <h1>username</h1>
        <button className="userProfile-personalInfo__logout" onClick={() => {GoTo('/Login2')}}>Logga ut</button>

      </div>

      <div className="profile--menu">
        <button
          className={activeButton === "Min Profil" ? "profile--active" : ""}
          onClick={() => setActiveButton("Min Profil")}
        >
          Min Profil
        </button>
        <button
          className={activeButton === "Sök Meetups" ? "profile--active" : ""}
          onClick={() => {
            setActiveButton("Sök Meetups");
            GoTo('/search');
           }

        >
          Sök Meetups
        </button>
        <button
          className={activeButton === "Alla Meetups" ? "profile--active" : ""}
          onClick={() => setActiveButton("Alla Meetups")}
        >
          Alla Meetups
        </button>
        <button
          className={activeButton === "Skapa Meetup" ? "profile--active" : ""}
          onClick={() => {
            setActiveButton("Skapa Meetup");
            GoTo('/CreateMeet');
          }
        >
          Skapa Meetup
        </button>
      </div>

      <div className="profile-content">
        {activeButton === "Min Profil" && (
          <div className="profile-content__profile">
            <h4>Min Profil</h4>
            <p>
              Som en användare, vill jag ha en profil där jag kan se mina
              anmälda meetups och tidigare meetups, så att jag kan hålla reda på
              min meetup-historik och planera för framtida meetups.Användaren
              kan se en "Min Profil" knapp eller länk någonstans på sidan.
              Användaren kan klicka på "Min Profil" för att se en lista över
              sina anmälda och tidigare meetups. Användaren kan klicka på varje
              meetup i listan för att se mer information.
            </p>
          </div>
        )}
        {activeButton === "Sök Meetups" && (
          <div className="profile-content__searchMUs">
            {navigate("/search")}
          </div>
        )}
        {activeButton === "Alla Meetups" && (
          <div className="profile-content__listMUs">
            {meetupsData.length > 0 ? (
              <table className="profile-table">
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
                  {meetupsData &&
                    meetupsData.map((meetup) => {
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
                            <button
                              disabled={
                                availableSpots === 0 || participant === true
                              }
                            >
                              {participant
                                ? "Du är anmäld"
                                : availableSpots > 0
                                ? "Anmäl mig"
                                : "Fullt"}
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
        {activeButton === "Skapa Meetup" && (
          <div className="profile-content__createMU">
            {navigate("/CreateMeet")}
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

export default profile;
