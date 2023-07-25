import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Weather.scss";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [updatedTime, setUpdatedTime] = useState([]);

  const refreshWeatherClickHandler = async () => {
    const result = await axios(
      "http://api.weatherapi.com/v1/forecast.json?key=3673c8abbc6948c480e171650232107&q=31023&days=3&aqi=no&alerts=no"
    );

    setCurrentWeather(result.data.current);
    setForecast(result.data.forecast.forecastday);

    const now = new Date();

    setUpdatedTime(now);
  };

  useEffect(() => {
    const fetchForecast = async () => {
      const result = await axios(
        "http://api.weatherapi.com/v1/forecast.json?key=3673c8abbc6948c480e171650232107&q=31023&days=3&aqi=no&alerts=no"
      );

      console.log("current:");
      console.log(result.data.current);
      console.log("forecast:");
      console.log(result.data.forecast.forecastday);

      setCurrentWeather(result.data.current);
      setForecast(result.data.forecast.forecastday);
    };

    fetchForecast();

    const now = Date.now();

    setUpdatedTime(now);
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
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <p>Last updated: {updatedTime}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">L</div>
            <div className="col-6">H</div>
          </div>
          <div className="row">
            <div className="col-12">Partly Cloudy</div>
          </div>
          <div className="row">
            <div className="col-6">Humidty</div>
            <div className="col-6">Wind</div>
          </div>
        </div>
      </div>
      <div className="row forecast">
        <div className="col-12">
          <h3>Forecast</h3>
          <p>Temp: &deg;F</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button
            className="btn btn-secondary"
            onClick={refreshWeatherClickHandler}
          >
            Refresh Weather
          </button>
        </div>
      </div>
    </div>
  );
};

export default Weather;
