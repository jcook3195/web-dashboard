import React from "react";
import "./Dashboard.scss";

import pul from "../../data/_greetings.json";

import DateModal from "../DateModal/DateModal";
import Weather from "../Widgets/Weather/Weather";
import Quotes from "../Widgets/Quotes/Quotes";
import Recipes from "../Widgets/Recipes/Recipes";

const greetings = {
  morning: "Good morning, beautiful.",
  afternoon: "Live and love every day like it's your last chance.",
  evening: "You're perfect in every way.",
  night: "Good night, sleep tight.",
};

const pickGreeting = () => {
  const today = new Date();
  const now = today.getHours();
  let greeting;

  if (now >= 21) {
    greeting = greetings.night;
  } else if (now >= 17) {
    greeting = greetings.evening;
  } else if (now >= 12) {
    greeting = greetings.afternoon;
  } else if (now >= 0) {
    greeting = greetings.morning;
  } else {
    greeting = "Have a wonderful day!";
  }

  console.log(greeting);

  return greeting;
};

const pickPul = (pul) => {
  const keys = Object.keys(pul);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const line = pul[randomKey];

  return line;
};

const Dashboard = (props) => {
  const pickUpLine = pickPul(pul);
  const key = Object.keys(pickUpLine);
  const greeting = pickGreeting();

  return (
    <React.Fragment>
      <div className="container-fluid main-container">
        <DateModal />
        <div className="row">
          <div className="col-12 text-center p-3 greeting-container">
            <h2 className="greeting">{greeting}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center p-5 pul-container">
            <h1 className="text-white">{pickUpLine[key]}</h1>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <Weather />
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-12 p-0">
            <Quotes />
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <Recipes />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
