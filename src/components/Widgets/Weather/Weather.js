import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../UIElements/Button";

import "./Weather.scss";

const daysOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const today = new Date();
const dayOfWeek = today.getDay();

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [currentCondition, setCurrentCondition] = useState([]);
  const [forecastDayOne, setForecastDayOne] = useState([]);
  const [dayOneCondition, setDayOneCondition] = useState([]);
  const [forecastDayTwo, setForecastDayTwo] = useState([]);
  const [dayTwoCondition, setDayTwoCondition] = useState([]);
  const [forecastDayThree, setForecastDayThree] = useState([]);
  const [dayThreeCondition, setDayThreeCondition] = useState([]);

  const refreshWeatherClickHandler = async () => {
    const result = await axios(
      "http://api.weatherapi.com/v1/forecast.json?key=3673c8abbc6948c480e171650232107&q=31023&days=3&aqi=no&alerts=no"
    );

    setCurrentWeather(result.data.current);
    setCurrentCondition(result.data.current.condition);
    setForecastDayOne(result.data.forecast.forecastday[0].day);
    setDayOneCondition(result.data.forecast.forecastday[0].day.condition);
    setForecastDayTwo(result.data.forecast.forecastday[1].day);
    setDayTwoCondition(result.data.forecast.forecastday[1].day.condition);
    setForecastDayThree(result.data.forecast.forecastday[2].day);
    setDayThreeCondition(result.data.forecast.forecastday[2].day.condition);
  };

  useEffect(() => {
    const fetchForecast = async () => {
      const result = await axios(
        "https://api.weatherapi.com/v1/forecast.json?key=3673c8abbc6948c480e171650232107&q=31023&days=3&aqi=no&alerts=no"
      );

      console.log("current:");
      console.log(result.data.current);
      console.log("forecast:");
      console.log(result.data.forecast.forecastday[0].day);

      console.log(result);

      setCurrentWeather(result.data.current);
      setCurrentCondition(result.data.current.condition);
      setForecastDayOne(result.data.forecast.forecastday[0].day);
      setDayOneCondition(result.data.forecast.forecastday[0].day.condition);
      setForecastDayTwo(result.data.forecast.forecastday[1].day);
      setDayTwoCondition(result.data.forecast.forecastday[1].day.condition);
      setForecastDayThree(result.data.forecast.forecastday[2].day);
      setDayThreeCondition(result.data.forecast.forecastday[2].day.condition);
    };

    fetchForecast();
  }, []);

  return (
    <div className="weather-row">
      <div className="row current-weather">
        <div className="col-4">
          <h3>Eastman, GA</h3>
          <h1>{currentWeather.temp_f} &deg;</h1>
          <h3>feels like</h3>
          <h1>{currentWeather.feelslike_f} &deg;</h1>
        </div>
        <div className="col-8 d-flex flex-column justify-content-between current-more-details">
          <div className="row">
            <div className="col-12">
              <span className="condition">
                <img
                  src={currentCondition.icon}
                  alt={currentCondition.text + " condition icon"}
                />
                <h2>{currentCondition.text}</h2>
              </span>
            </div>
            <div className="col-4">
              <h2>Low:</h2>
              <p className="current-secondary-data">
                {forecastDayOne.mintemp_f}&deg;
              </p>
            </div>
            <div className="col-4">
              <h2>High:</h2>
              <p className="current-secondary-data">
                {forecastDayOne.maxtemp_f}&deg;
              </p>
            </div>
            <div className="col-4">
              <h2>Rain Chance:</h2>
              <p className="current-secondary-data">
                {forecastDayOne.daily_chance_of_rain}%
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h2>Humidity:</h2>
              <p className="current-secondary-data">
                {currentWeather.humidity}%
              </p>
            </div>
            <div className="col-6">
              <h2>Wind:</h2>
              <p className="current-secondary-data">
                {currentWeather.wind_mph}mph
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-end">
              <p>Updated: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <Button
            classNames="btn-custom"
            onClickEvent={refreshWeatherClickHandler}
          >
            Refresh Weather
          </Button>
        </div>
      </div>
      <div className="row forecast">
        <div className="col-12">
          <div className="row">
            <div className="col-12 mt-5 mb-3 text-center">
              <h2 className="forecast-header">Next 3 Days</h2>
            </div>
            <div className="col-4">
              <div className="row forecast-card text-center">
                <div className="col-12">
                  <h3>Today</h3>
                </div>
                <div className="col-12">
                  <span className="condition">
                    <img
                      src={dayOneCondition.icon}
                      alt={dayOneCondition.text + " condition icon"}
                    />
                    <h2>{dayOneCondition.text}</h2>
                  </span>
                </div>
                <div className="col-12">
                  <h4>
                    {forecastDayOne.mintemp_f}&deg; - {forecastDayOne.maxtemp_f}
                    &deg;
                  </h4>
                </div>
                <div className="col-6">
                  <h5>Rain Chance:</h5>
                  <h4>{forecastDayOne.daily_will_it_rain}%</h4>
                </div>
                <div className="col-6">
                  <h5>Humidity:</h5>
                  <h4>{forecastDayOne.avghumidity}%</h4>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row forecast-card text-center">
                <div className="col-12">
                  <h3>{daysOfWeek[dayOfWeek + 1]}</h3>
                </div>
                <div className="col-12">
                  <span className="condition">
                    <img
                      src={dayTwoCondition.icon}
                      alt={dayTwoCondition.text + " condition icon"}
                    />
                    <h2>{dayTwoCondition.text}</h2>
                  </span>
                </div>
                <div className="col-12">
                  <h4>
                    {forecastDayTwo.mintemp_f}&deg; - {forecastDayTwo.maxtemp_f}
                    &deg;
                  </h4>
                </div>
                <div className="col-6">
                  <h5>Rain Chance:</h5>
                  <h4>{forecastDayTwo.daily_will_it_rain}%</h4>
                </div>
                <div className="col-6">
                  <h5>Humidity:</h5>
                  <h4>{forecastDayTwo.avghumidity}%</h4>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row forecast-card text-center">
                <div className="col-12">
                  <h3>{daysOfWeek[dayOfWeek + 2]}</h3>
                </div>
                <div className="col-12">
                  <span className="condition">
                    <img
                      src={dayThreeCondition.icon}
                      alt={dayThreeCondition.text + " condition icon"}
                    />
                    <h2>{dayThreeCondition.text}</h2>
                  </span>
                </div>
                <div className="col-12">
                  <h4>
                    {forecastDayThree.mintemp_f}&deg; -{" "}
                    {forecastDayThree.maxtemp_f}
                    &deg;
                  </h4>
                </div>
                <div className="col-6">
                  <h5>Rain Chance:</h5>
                  <h4>{forecastDayThree.daily_will_it_rain}%</h4>
                </div>
                <div className="col-6">
                  <h5>Humidity:</h5>
                  <h4>{forecastDayThree.avghumidity}%</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
