import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import baseUrl from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherForcast, setWeatherForcast] = useState([]);

  const search = (city) => {
    axios
      .get(
        `${baseUrl.Base}/currentWeather/${
          city != "[object Object]" ? city : query
        }`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const forcastdata = (city) => {
    axios
      .get(
        `${baseUrl.Base}/forecast/${city != "[object Object]" ? city : query}`
      )
      .then((response) => {
        console.log(response.data, "response");
        setWeatherForcast(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setWeatherForcast("");
        setQuery("");
        setError({ message: "Not Fount ", query: query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi");
    forcastdata("delhi");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={search}
            />
          </div>
        </div>
        <ul>
          {weather.name ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">{Math.round(weather.temp)}°c</span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">{Math.round(weather.humidity)}%</span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.windSpeed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
        
      </div>
      <div className="today-weather" style={{borderBottom:"none"}} >
      <ul style={{ display: "flex" }}>
          {/* {weatherForcast.name ? ( */}
          {weatherForcast?.slice(1, -1).map((item) => (
            <li key={item.date}>
              <p>{item.date}</p>
              <div>{item.temperature}</div>
              <img
                className="temp"
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
