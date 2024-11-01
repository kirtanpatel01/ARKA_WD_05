import React, { useEffect, useState } from "react";
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

function LocationForecast({ weatherData }) {
  const [dateTime, setDateTime] = useState({
    time: "",
    date: "",
    day: "",
  });
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // Function to update date and time
    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const date = now.toLocaleDateString();
      const day = now.toLocaleDateString("en-US", { weekday: "long" });
      setDateTime({ time, date, day });
    };

    // Set interval to update every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Initial call to set the date and time
    updateDateTime();

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    switch (weatherData.weather?.[0]?.main) {
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
  }, [weatherData]);

  console.log(weatherData);
  return (
    <div
      className="w-1/2 h-fit text-white p-4 bg-opacity-40 bg-black rounded-lg shadow-md flex flex-col gap-2
    max-lg:w-full max-[375px]:p-0"
    >
      <div className="text-end mt-6 mr-6 max-[375px]:mt-4 max-[375px]:mr-4">
        <p className="text-4xl font-semibold">
          {weatherData.name || (
            <span className="font-normal">Don't have Location access !</span>
          )}
        </p>
        <p className="text-end mr-1 mt-3">{weatherData.sys?.country || "--"}</p>
      </div>
      <div className="w-full flex flex-col items-center">
        <img src={icon} alt="weather icon" className="w-56 h-56 m-8" />
        <div className="flex items-center gap-1">
          <span className="text-2xl">
            {weatherData.main
              ? (weatherData.main.temp - 273.15).toFixed(2)
              : "--"}{" "}
            &deg;C
          </span>-
          <span>{weatherData.weather?.[0]?.main || "--"}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-6 max-[375px]:p-2">
        <div className="flex gap-2">
          <p className="text-6xl tracking-wider">
            {dateTime.time.split(" ")[0]}
          </p>
          <span className="flex self-end mb-1">
            {dateTime.time.split(" ")[1]}
          </span>
        </div>
        <div className="flex gap-6 text-2xl">
          <span>{dateTime.day},</span>
          <span>{dateTime.date}</span>
        </div>
      </div>
    </div>
  );
}

export default LocationForecast;
