"use client"
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const WeatherContext = createContext();


export const WeatherProvider = ({ children }) => {
  const [todayWeather, setTodayWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Santo Domingo"); 

  
  const fetchData = async () => {
    const key = "3bc4c9f45cf04e7a74ac17d51146bf82";
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    return response.data;
  };

    useEffect(() => {
    fetchData()
      .then(data => {
        setTodayWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }, [city]); 
  return (
    <WeatherContext.Provider value={{ todayWeather, loading, city, setCity, setTodayWeather}}>
      {children}
    </WeatherContext.Provider>
  );
};
