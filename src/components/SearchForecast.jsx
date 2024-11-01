import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { key, base } from "../apiKeys";
import Line from "./Line";
import {
  clear,
  drizzle,
  dust,
  hot,
  mist,
  thunder,
  rain,
  snow,
  cold,
  cloudy,
  tornado,
  wind,
  clouds,
  smoke,
  haze,
  fog,
  sad,
} from "../assets";

function SearchForecast({ weatherData, date, time }) {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [icon, setIcon] = useState(null);

  const fetchData = () => {
    fetch(`${base}weather?q=${input}&appid=${key}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          setSearchResult(data); // Set the response data to `searchResult`
        } else {
          console.error("City not found");
          setSearchResult(null); // Clear previous data if not found
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleInputChange = (value) => {
    setInput(value);
  };

  const displayData = searchResult || weatherData; // Use searchResult if available, otherwise weatherData

  useEffect(() => {
    if (displayData && displayData.weather?.[0]?.main) {
      switch (displayData.weather[0].main) {
        case "Clear":
          setIcon(clear);
          break;
        case "Clouds":
          setIcon(clouds);
          break;
        case "Snow":
          setIcon(snow);
          break;
        case "Rain":
          setIcon(rain);
          break;
        case "Drizzle":
          setIcon(drizzle);
          break;
        case "Thunderstorm":
          setIcon(thunder);
          break;
        case "Mist":
          setIcon(mist);
          break;
        case "Dust":
          setIcon(dust);
          break;
        case "Tornado":
          setIcon(tornado);
          break;
        case "Smoke":
          setIcon(smoke);
          break;
        case "Haze":
          setIcon(haze);
          break;
        case "Fog":
          setIcon(fog);
          break;
        default:
          setIcon(sad);
          break;
      }
    }
  }, [displayData]); // Add displayData as a dependency to rerun the effect when displayData changes

  return (
    <div
      className="w-1/2 h-full text-white px-4 py-8 bg-opacity-40 bg-black rounded-lg shadow-md flex flex-col gap-8
      max-lg:w-full max-[375px]:p-0 max-[375px]:gap-4"
    >
      <h1 className="text-center max-[375px]:mt-4">Search Location by City</h1>
      <div className="flex items-center gap-2 max-[375px]:mx-2">
        <div className="flex items-center bg-white rounded-md px-4 py-2 flex-grow gap-2 max-[375px]:px-2">
          <FaSearch className="text-slate-700" />
          <input
            type="text"
            placeholder="Enter city"
            value={input}
            className="text-black focus:outline-none bg-transparent max-[375px]:w-full"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
        <button
          className="bg-slate-800 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold max-[375px]:px-2"
          onClick={fetchData}
        >
          Find
        </button>
      </div>

      {displayData && displayData.weather && displayData.main && (
        <div className="flex flex-col  items-center gap-4">
          <div className="text-center">
            <span>{displayData.name}</span>
            <span className="text-base"> ({displayData.sys?.country})</span>
          </div>
          <Line />
          <div className="flex items-center gap-2">
            <img src={icon} alt="weather icon" className="h-12"/>
            <span>{displayData.weather[0].description}</span>
          </div>
          <Line />
          <p>Feels Like: {displayData.main
              ? (displayData.main.temp - 273.15).toFixed(2)
              : "--"}{" "}
            &deg;C</p>
          <Line />
          <p>Temperature: {displayData.main
              ? (displayData.main.temp - 273.15).toFixed(2)
              : "--"}{" "}
            &deg;C</p>
          <Line />
          <p>Humidity: {displayData.main.humidity}{" "}g/m3</p>
          <Line />
          <p>Wind Speed: {displayData.wind.speed}{" "}meter/sec</p>
          <Line />
          <p>Clouds: {displayData.clouds.all}</p>
        </div>
      )}
    </div>
  );
}

export default SearchForecast;
