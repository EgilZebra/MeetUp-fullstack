<<<<<<< HEAD
import React, { useState } from "react";
import AllMU from "../components/allMU/AllMU";
import MyMU from "../components/myMU/MyMU";
import SearchMU from "../components/searchMU/SearchMU";
import CreateMU from "../components/forms/createMU/CreateMU";
import "./style/Profile.css";

const UserProfile = () => {
  const [activeButton, setActiveButton] = useState("Min Profil");

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
=======
import AllMU from "../components/Allmu/AllMU";
import MyMU from "../components/myMU/MyMU";
import SearchMU from "../components/searchMU/SearchMU";
import CreateMU from "../components/forms/createMU/CreateMU";
import Search from "./Search";
import "./style/Profile.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "../components/overlay/Overlay";
import CreateForm from "./CreateMeet";

const API_URL_BASE =
process.env.VITE_API_URL == undefined
   ? import.meta.env.VITE_API_URL
    : process.env.VITE_API_URL;

const currentUserId = localStorage.getItem('username');

const profile = () => {
  const GoTo = useNavigate();
  const [activeButton, setActiveButton] = useState("Alla Meetups");
  const [meetupsData, setMeetupsData] = useState([]);
  const [myMeetupsData, setMyMeetupsData] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const fetchMeetups = async () => {
    try {
      const url = `${API_URL_BASE}/meetups`;
      console.log("URL", url);
      const response = await axios.get(url);
      console.log("response", response);
      const data = response.data.data.Items;
      console.log(data);
      setMeetupsData(data);
      return data;
    } catch (error) {
      console.error("Error fetching meetups:", error);
    }
  };
  const fetchMyMeetups = async (userId) => {
    try {
      const url = API_URL_BASE + "/meetups";
      console.log("URL", url);
      const response = await axios.post(url, { userId });
      console.log("response", response);
      const data = response.data.data;
      console.log(data);
      setMyMeetupsData(data);
      return data;
    } catch (error) {
      console.error("Error fetching meetups:", error);
    }
  };

  useEffect(() => {
    if (activeButton === "Alla Meetups") {
      fetchMeetups();
    }
    if (activeButton === "Min Profil") {
      fetchMyMeetups(currentUserId);
    }
  }, [activeButton]);

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
        <h1>{localStorage.getItem('username')}</h1>
        <button className="userProfile-personalInfo__logout" onClick={() => {GoTo('/Login2')}}>Logga ut</button>

      </div>

      <div className="profile--menu">
        <button
          className={activeButton === "Min Profil" ? "profile--active" : ""}
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
          onClick={() => setActiveButton("Min Profil")}
        >
          Min Profil
        </button>
<<<<<<< HEAD

        <button
          className={activeButton === "Sök Meetups" ? "active" : ""}
          onClick={() => setActiveButton("Sök Meetups")}
=======
        <button
          className={activeButton === "Sök Meetups" ? "profile--active" : ""}
          onClick={() => {
            setActiveButton("Sök Meetups");
          }}
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
        >
          Sök Meetups
        </button>
        <button
<<<<<<< HEAD
          className={activeButton === "Alla Meetups" ? "active" : ""}
          onClick={() => setActiveButton("Alla Meetups")}
=======
          className={activeButton === "Alla Meetups" ? "profile--active" : ""}
          onClick={() => {
            setActiveButton("Alla Meetups");
            // GoTo('/AllMU');
          }}
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
        >
          Alla Meetups
        </button>
        <button
<<<<<<< HEAD
          className={activeButton === "Skapa Meetup" ? "active" : ""}
          onClick={() => setActiveButton("Skapa Meetup")}
=======
          className={activeButton === "Skapa Meetup" ? "profile--active" : ""}
          onClick={() => {
            setActiveButton("Skapa Meetup");
          }}
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
        >
          Skapa Meetup
        </button>
      </div>

<<<<<<< HEAD
      <div className="userProfile-content">
        {activeButton === "Min Profil" && (
          <div className="userProfile-content__profile">
            <MyMU />
          </div>
        )}
        {activeButton === "Sök Meetups" && (
          <div className="userProfile-content__searchMUs">
            <SearchMU />
          </div>
        )}
        {activeButton === "Alla Meetups" && (
          <div className="userProfile-content__listMUs">
            <AllMU />
          </div>
        )}
        {activeButton === "Skapa Meetup" && (
          <div className="userProfile-content__createMU">
            <CreateMU />
          </div>
        )}
      </div>
=======
      <div className="profile-content">
        {activeButton === "Min Profil" && (
          <div className="profile-content__profile">
            {myMeetupsData && myMeetupsData.length > 0 ? (
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Mer Info</th>
                  </tr>
                </thead>
                <tbody>
                  {myMeetupsData &&
                    myMeetupsData.map((meetup) => {
                      return (
                        <tr key={meetup.MeetingId}>
                          <td>{meetup.MeetingId}</td>
                          <td>{meetup.name}</td>
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
              <p>You have not registired to any MU yet.</p>
            )}
          </div>
        )}
        {activeButton === "Sök Meetups" && (
          <div className="profile-content__searchMUs">
            <Search />
          </div>
        )}
        {activeButton === "Alla Meetups" && (
          <div className="profile-content__listMUs">
            {meetupsData && meetupsData.length > 0 ? (
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>MeetingId</th>
                    <th>Name</th>
                    <th>Mer Info</th>
                  </tr>
                </thead>
                <tbody>
                  {meetupsData &&
                    meetupsData.map((meetup) => {
                      return (
                        <tr key={meetup.MeetingId}>
                          <td>{meetup.MeetingId}</td>
                          <td>{meetup.name}</td>
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
            <CreateForm />
          </div>
        )}
      </div>
      {isOverlayOpen && (
        <Overlay
          isOpen={isOverlayOpen}
          selectedMeetup={selectedMeetup}
          onClose={closeOverlay}
          currentUserId={currentUserId}
        />
      )}
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
    </div>
  );
};

<<<<<<< HEAD
export default UserProfile;
=======
export default profile;
>>>>>>> 1ff044f008f663b14d7743dc03cc42145d36f075
