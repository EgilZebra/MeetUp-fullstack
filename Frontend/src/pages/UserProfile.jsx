import React, { useState } from "react";
import "./style/UserProfile.css";

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
      </div>

      <div className="userProfile-content">
        {activeButton === "Min Profil" && (
          <div className="userProfile-content__profile">
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
          <div className="userProfile-content__searchMUs">
            <h4>Sök MUs</h4>
            <p>
              Som en användare, vill jag kunna söka efter meetups med specifika
              nyckelord så att jag lättare kan hitta meetups som passar mina
              intressen. Användaren kan se en sökruta på sidan med meetups.
              Användaren kan skriva in nyckelord i sökrutan och se en lista över
              matchande meetups.
            </p>
          </div>
        )}
        {activeButton === "Alla Meetups" && (
          <div className="userProfile-content__listMUs">
            <h4>Visa Alla MUs</h4>
            <p>
              Som en användare, vill jag kunna se en lista över kommande meetups
              med detaljer som tid, plats, beskrivning och värd, så att jag kan
              hitta meetups som intresserar mig. Användaren kan se en lista över
              kommande meetups på startsidan eller på en särskild sida. Varje
              meetup i listan innehåller detaljer som tid, plats och värd.
              Användaren kan klicka på en meetup för att se mer information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
