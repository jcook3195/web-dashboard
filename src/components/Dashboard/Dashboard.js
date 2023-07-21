import React from "react";
import "./Dashboard.scss";

import pul from "../../data/_greetings.json";

import Quotes from "../Widgets/Quotes/Quotes";
import Recipes from "../Widgets/Recipes/Recipes";

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pt-4 pb-4 text-center">
          <h1>{pickUpLine[key]}</h1>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12">
          <Quotes />
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12">
          <Recipes />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
