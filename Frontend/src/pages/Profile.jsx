import Search from "./Search";
import "./style/Page.css";
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

const currentUserId = localStorage.getItem("username");

const profile = () => {
  const GoTo = useNavigate();
  const [activeButton, setActiveButton] = useState("Alla Meetups");
  const [meetupsData, setMeetupsData] = useState([]);
  const [myMeetupsData, setMyMeetupsData] = useState([]);
  const [selectedMeetup, setSelectedMeetup] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const token = localStorage.getItem("token");
  const currentDate = new Date();
  const pastEvents = myMeetupsData.filter(
    (meetup) => new Date(meetup.starttime) < currentDate
  );
  const futureEvents = myMeetupsData.filter(
    (meetup) => new Date(meetup.starttime) >= currentDate
  );

  const fetchMeetups = async () => {
    try {
      const url = `${API_URL_BASE}/meetups`;
      console.log("URL", url);
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.post(
        url,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div className="page-wrapper">
      <div className="profile--wrapper">
        <div className="profile--personalInfo">
          <h1>
            {localStorage.getItem("username")} |
            <button
              className="userProfile-personalInfo__logout"
              onClick={() => {
                localStorage.clear();
                GoTo("/Login2");
              }}
            >
              Logga ut
            </button>
          </h1>
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
            }}
          >
            Sök Meetups
          </button>
          <button
            className={activeButton === "Alla Meetups" ? "profile--active" : ""}
            onClick={() => {
              setActiveButton("Alla Meetups");
              // GoTo('/AllMU');
            }}
          >
            Alla Meetups
          </button>
          <button
            className={activeButton === "Skapa Meetup" ? "profile--active" : ""}
            onClick={() => {
              setActiveButton("Skapa Meetup");
            }}
          >
            Skapa Meetup
          </button>
        </div>

        <div className="profile-content">
          {activeButton === "Min Profil" && (
            <div className="profile-content__profile">
              {pastEvents && pastEvents.length > 0 ? (
                <div>
                  <h2>Past Events</h2>
                  <table className="profile-table">
                    <thead>
                      <tr>
                        <th>Namn</th>
                        <th>Plats</th>
                        <th>Start-tid</th>
                        <th>Mer Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastEvents.map((meetup) => (
                        <tr key={meetup.MeetingId}>
                          <td>{meetup.name}</td>
                          <td>{meetup.location}</td>
                          <td>{meetup.starttime}</td>
                          <td>
                            <button onClick={() => handleMoreInfoClick(meetup)}>
                              Mer information
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No past events available.</p>
              )}

              {futureEvents && futureEvents.length > 0 ? (
                <div>
                  <h2>Future Events</h2>
                  <table className="profile-table">
                    <thead>
                      <tr>
                        <th>Namn</th>
                        <th>Plats</th>
                        <th>Start-tid</th>
                        <th>Mer Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {futureEvents.map((meetup) => (
                        <tr key={meetup.MeetingId}>
                          <td>{meetup.name}</td>
                          <td>{meetup.location}</td>
                          <td>{meetup.starttime}</td>
                          <td>
                            <button onClick={() => handleMoreInfoClick(meetup)}>
                              Mer information
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No future events available.</p>
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
                      <th>Namn</th>
                      <th>Plats</th>
                      <th>Start-tid</th>
                      <th>Mer Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetupsData &&
                      meetupsData.map((meetup) => {
                        return (
                          <tr key={meetup.MeetingId}>
                            <td>{meetup.name}</td>
                            <td>{meetup.location}</td>
                            <td>{meetup.starttime}</td>
                            <td>
                              <button
                                onClick={() => handleMoreInfoClick(meetup)}
                              >
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
          />
        )}
      </div>
    </div>
  );
};

export default profile;
