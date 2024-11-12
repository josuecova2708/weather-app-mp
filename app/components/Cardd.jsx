"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { WeatherContext } from './WeatherContext'
export default function Cardd({ date, temp_min, temp_max, icon }) {

  const { degrees } = useContext(WeatherContext)
  const { setDegrees } = useContext(WeatherContext)

  let tempMaxF = Math.round(temp_max) * 9 / 5 + 32.
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="card w-32 h-40 bg-slate-500 bg-opacity-30 flex flex-col items-center gap-2 text-slate-100 justify-around py-2 ">
      <h2 className="text-md">
        {formattedDate}
      </h2>
      <figure className="w-1/2 h-1/2 ">
        <Image src={`/weatherapp/weather/${icon}.png`} width={500} height={500} alt="imageweather" className="w-full h-full object-contain" />
      </figure>
      <div className="flex gap-2 font-semibold">
        <p>{degrees ? Math.round(tempMaxF) : Math.round(temp_max)}{`${degrees ? "ºF" : "ºC"}`}</p>
        <p>{degrees ? Math.round(Math.round(temp_min) * 9 / 5 + 32) : Math.round(temp_min)}{`${degrees ? "ºF" : "ºC"}`}</p>
      </div>
    </div>
  )
}
