import { useState } from "react";
import AllMU from "../components/Allmu/AllMU";
import MyMU from "../components/myMU/MyMU";
import SearchMU from "../components/searchMU/SearchMU";
import CreateMU from "../components/forms/createMU/CreateMU";
import "./style/Profile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const GoTo = useNavigate(); 
  const [activeButton, setActiveButton] = useState("Min Profil");

  return (
    <div className="userProfile-wrapper">
      <div className="userProfile-personalInfo">
        <h1>username</h1>
        <p>eventuell lägga till övrig personalInfo</p>
        <button className="userProfile-personalInfo__logout" onClick={() => {GoTo('/Login2')}}>Logga ut</button>
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
          onClick={() => {
            setActiveButton("Sök Meetups");
            GoTo('/search');
          }}
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
          onClick={() => {
            setActiveButton("Skapa Meetup");
            GoTo('/CreateMeet'); // Uncomment if navigation is needed
          }}
        >
          Skapa Meetup
        </button>
      </div>

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
    </div>
  );
};

export default UserProfile;
