import React, { useEffect, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import Container from "./Container";
import { key, base } from "../apiKeys";

import {
  winterV,
  winterA,
  summerV,
  summerA,
  monsoonV,
  monsoonA,
  defaultV,
  defaultA,
} from "../assets";

function WeatherBg() {
  const seasonData = {
    winter: { videoSrc: winterV, audioSrc: winterA },
    summer: { videoSrc: summerV, audioSrc: summerA },
    monsoon: { videoSrc: monsoonV, audioSrc: monsoonA },
    default: { videoSrc: defaultV, audioSrc: defaultA },
  };

  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [season, setSeason] = useState("default");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    console.log("come in useeffect");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const weatherUrl = `${base}weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
      try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
        const weatherMain = data.weather[0].main.toLowerCase();

        if (["snow", "cold"].includes(weatherMain)) {
          setSeason("winter");
        } else if (["rain", "drizzle", "thunderstorm"].includes(weatherMain)) {
          setSeason("monsoon");
        } else if (["clear", "hot"].includes(weatherMain)) {
          setSeason("summer");
        } else {
          setSeason("default");
        }
      } catch (err) {
        console.error("Error fetching weather data: ", err);
        setSeason("default");
      }
      () => {
        console.error("Error getting location");
        setSeason("default");
      };
    });
  }, []);

  useEffect(() => {
    const video = document.getElementById("bg-video");
    const audio = document.getElementById("bg-audio");

    const handleUserInteraction = () => {
      video.play();
      if (isAudioPlaying) audio.play();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [season, isAudioPlaying]);

  const toggleAudio = () => {
    const audio = document.getElementById("bg-audio");
    if (isAudioPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="relative w-full min-h-screen">
      <video
        id="bg-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={seasonData[season]?.videoSrc}
        type="video/mp4"
        loop
        muted
        playsInline
      ></video>

      <audio id="bg-audio" src={seasonData[season]?.audioSrc} loop />

      <div className="relative z-10 flex items-center justify-center min-h-screen bg-black bg-opacity-40">
        <Container weatherData={weatherData} />
        <button
          onClick={toggleAudio}
          className="absolute bottom-10 right-10 bg-black text-white bg-opacity-50 px-4 py-2 rounded-full tracking-widest max-sm:bottom-5"
        >
          {isAudioPlaying ? (
            <MdMusicNote size={24} />
          ) : (
            <MdMusicOff size={24} />
          )}
        </button>
      </div>
    </div>
  );
}

export default WeatherBg;
