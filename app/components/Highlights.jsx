"use client"
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { WeatherContext } from './WeatherContext';
export default function Highlights() {
  const { todayWeather, loading } = useContext(WeatherContext);
  const progress = todayWeather?.main?.humidity
  const getWindDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) return "N"
    else if (degrees >= 22.5 && degrees < 67.5) return "NE";
    else if (degrees >= 67.5 && degrees < 112.5) return "E";
    else if (degrees >= 112.5 && degrees < 157.5) return "SE";
    else if (degrees >= 157.5 && degrees < 202.5) return "S";
    else if (degrees >= 202.5 && degrees < 247.5) return "SO";
    else if (degrees >= 247.5 && degrees < 292.5) return "O";
    else if (degrees >= 292.5 && degrees < 337.5) return "NO";
  };

  const getRotation = (card) => {
    if (card == "N") return "0"
    else if (card == "NE") return "45"
    else if (card == "E") return "90"
    else if (card == "SE") return "135"
    else if (card == "S") return "180"
    else if (card == "SO") return "225"
    else if (card == "O") return "270"
    else if (card == "NO") return "315"
    return 0
  }
  const direction = getWindDirection(todayWeather?.wind?.deg)
  const rotation = getRotation(direction)



  return (
    <div className="highlights max-w-screen-sm min-h-screen pb-7 bg-slate-900 text-white
    md:max-w-none md:w-full md:min-h-[40vh] md:mx-auto  ">
      <h2 className="text-3xl font-semibold text-center " >Today`s Highlights</h2>
      <div className="flex flex-col items-center gap-6 mt-4  md:gap-2 md:flex md:flex-row md:flex-wrap md:w-3/5 mx-auto ">
        <div className="w-72 h-44 bg-slate-500 bg-opacity-30 flex flex-col items-center gap-2 py-2 md:mx-auto ">
          <h2 className="text-lg">Wind Status</h2>
          <h3 className="text-7xl">
            <span className="font-semibold">{todayWeather?.wind?.speed}</span><span className="text-5xl font-thin">ms</span>
          </h3>
          <div className="flex gap-4 ">
            <figure className={`size-8 bg-gray-200 bg-opacity-10 rounded-full flex`} style={{ transform: `rotate(${rotation}deg)` }} >
              <svg className="w-2/3 h-2/3 self-center mx-auto" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path style={{ fill: "#E7E7EB" }} d="m190-120-30-30 320-730 320 730-30 30-290-132-290 132Z" /></svg>
            </figure>
            <p>{direction}</p>
          </div>
        </div>
        <div className="w-72 h-44 bg-slate-500 bg-opacity-30 md:mx-auto flex flex-col items-center gap-3 py-2 ">
          <h2 className="text-lg ">Humidity</h2>
          <h3 className="text-7xl">
            <span className="font-semibold">{progress}</span><span className="text-5xl font-thin">%</span>
          </h3>
          <div className='w-4/5 h-2 bg-slate-500 rounded-2xl'>
            <div className='h-full bg-yellow-300 rounded-2xl' style={{ width: `${progress}%` }}  >
            </div>
          </div>

        </div>
        <div className="w-72 h-36 bg-slate-500 bg-opacity-30 text-center pt-3 flex flex-col gap-4 md:mx-auto">
          <h2 className="text-lg">Visibility</h2>
          <h3 className="text-7xl">
            <span className="font-semibold">{(todayWeather?.visibility / 1000).toFixed(2)}</span><span className="text-5xl font-thin">km</span>
          </h3>
        </div>

        <div className="w-72 h-36  bg-slate-500 bg-opacity-30 text-center pt-3 flex flex-col gap-4 md:mx-auto">
          <h2 className="text-lg">Air Pressure</h2>
          <h3 className="text-7xl">
            <span className="font-semibold">{todayWeather?.main?.pressure}</span><span className="text-5xl font-thin">mb</span>
          </h3>
        </div>
      </div>
    </div>
  )
}
