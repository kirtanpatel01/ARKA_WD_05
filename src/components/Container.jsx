import React, { useState, useEffect } from "react";
import LocationForecast from "./LocationForecast";
import SearchForecast from "./SearchForecast";

function Container({ weatherData }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchWeather, setSearchWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Fetch current weather & set date/time
  }, []);

  const handleSearch = () => {
    // API call to fetch weather data for searchQuery and setSearchWeather
  };

  return (
    <div className="bg-slate-900 bg-opacity-5 flex gap-4 w-2/3 h-fit rounded-xl backdrop-blur-lg border border-gray-700 shadow-lg p-6 text-white
    max-lg:grid max-lg:grid-rows-2 max-lg:mt-4 max-sm:w-full max-sm:m-4 max-sm:mb-20 max-[415px]:p-2 max-[375px]:m-0 max-[375px]:mb-20 max-[280px]:p-1">
      <LocationForecast weatherData={weatherData}/>
      <SearchForecast weatherData={weatherData} />
    </div>
  );
}

export default Container;
