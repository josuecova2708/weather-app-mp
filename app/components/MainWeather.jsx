"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import axios from 'axios'
import { WeatherContext } from './WeatherContext'
import useGeolocation from '@/hooks/useGeolocation'

export default function MainWeather() {
    const [toogleModal, setToogleModal] = useState(false)
    const { todayWeather, loading, setTodayWeather } = useContext(WeatherContext);
    const { getGeo, geolocation: geo } = useGeolocation()
    const [ubication, setUbication] = useState(false)
    const key = "3bc4c9f45cf04e7a74ac17d51146bf82";
    let lat = geo?.lat
    let lon = geo?.lon
    let link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

    const fetchDataLatLong = async () => {
        const response = await axios.get(link);
        return response.data;
    };

    useEffect(() => {
        fetchDataLatLong()
            .then(data => {
                setTodayWeather(data)
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }, [ubication]);


    const timestamp = todayWeather?.dt;
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });
    const description = todayWeather?.weather?.[0]?.main
    const pic = todayWeather?.weather?.[0]?.icon

    return (
        <>
            {!toogleModal ?
                <div className="main-weather max-w-screen-md md:max-w-none md:w-[50vw] h-screen bg-indigo-950 ">

                    <div className="flex w-full h-16 justify-between px-16 md:px-7 items-center pt-9">
                        <button onClick={() => setToogleModal(true)} className="bg-gray-500 text-white h-fit py-2 px-8  md:px-3">
                            Buscar Lugares
                        </button>
                        <button onClick={() => {getGeo(); setUbication(!ubication);}}>
                            <figure className="size-12   rounded-full bg-gray-400 grid place-content-center">
                                <svg className="w-4/6 mx-auto" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill='white'><path d="M444-22v-82q-139-15-232.5-108T103-444H21v-73h82q15-139 108.5-232.5T444-859v-82h73v82q138 16 231.5 109.5T858-517h82v73h-82q-16 139-109.5 232T517-104v82h-73Zm37-154q126 0 215.5-89T786-481q0-127-89.5-216.5T481-787q-127 0-216.5 89.5T175-481q0 127 89.5 216T481-176Zm0-141q-69 0-116.5-47.5T317-481q0-69 47.5-116.5T481-645q68 0 116 47.5T645-481q0 69-48 116.5T481-317Z" /></svg>
                            </figure>
                        </button>
                    </div>
                    <div className="relative w-full h-2/5 bg-cover bg-center flex justify-center items-center">
                        <div className="absolute inset-0 bg-[url('/weatherapp/others/Cloud-background.png')] bg-cover bg-center opacity-20 z-0"></div>
                        <figure className="size-48 ">
                            <Image src={`/weatherapp/weather/${pic}.png`} width={500} height={500} alt="imageweather" className="w-full h-full" />
                        </figure>
                    </div>
                    <div className="w-full text-center text-gray-300 gap-10 flex flex-col">
                        <h2 className="text-9xl">
                            {todayWeather && todayWeather.main ? `${Math.round(todayWeather.main.temp)}º` : 'loading'}
                            <span className="text-8xl">C</span>
                        </h2>
                        <p className="text-3xl">{description}</p>
                        <div className="flex mx-auto justify-around w-1/2 px-8">
                            <p>Today</p>
                            <p> {formattedDate} </p>
                        </div>
                        <div className="flex w-fit mx-auto">
                            <figure className="size-6">      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                <path style={{ fill: '#88869D' }} d="M480.089-490Q509-490 529.5-510.589q20.5-20.588 20.5-49.5Q550-589 529.411-609.5q-20.588-20.5-49.5-20.5Q451-630 430.5-609.411q-20.5 20.588-20.5 49.5Q410-531 430.589-510.5q20.588 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                            </svg></figure>
                            <p>{todayWeather?.name}</p>
                        </div>
                    </div>

                </div>
                :

                <Modal
                    setToogleModal={setToogleModal}

                />
            }



        </>


    )
}
