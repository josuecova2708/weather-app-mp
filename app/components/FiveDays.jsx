"use client"
import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from './WeatherContext'
import { fetchDataDays } from '@/fetchs/fetchDataDays'
import Cardd from './Cardd'

export default function FiveDays() {
    const [days, setDays] = useState([])
    const { todayWeather } = useContext(WeatherContext);
    const [dailyData, setDailyData] = useState([]);
    let cityname = todayWeather?.name

    useEffect(() => {
        fetchDataDays(cityname).then(data => {
            const processedData = processWeatherData(data);
            setDays(data);
            setDailyData(processedData);
        }).catch(error => {
            console.error("Error fetching weather data:", error);
        });
    }, [cityname]);

    
    const processWeatherData = (data) => {
        const dailyDataMap = {};

        data.forEach(item => {
            const date = item.dt_txt.split(' ')[0]; // Obtiene solo la fecha (YYYY-MM-DD)

            if (!dailyDataMap[date]) {
                dailyDataMap[date] = {
                    temp_max: item.main.temp_max,
                    temp_min: item.main.temp_min,
                    icon: item.weather[0].icon // Usamos el icono del primer registro del día
                };
            } else {
                // Actualiza la temp_max y temp_min si encuentra valores mayores o menores
                dailyDataMap[date].temp_max = Math.max(dailyDataMap[date].temp_max, item.main.temp_max);
                dailyDataMap[date].temp_min = Math.min(dailyDataMap[date].temp_min, item.main.temp_min);
            }
        });

        // Convierte el objeto en un array y toma solo los primeros 5 días
        return Object.keys(dailyDataMap).slice(0, 5).map(date => ({
            date,
            ...dailyDataMap[date]
        }));
    };

  
    return (
        <div className="fivedays max-w-screen-md h-screen bg-slate-900
         md:max-w-none md:w-full     md:max-h-[65vh]  lg:max-h-[50vh]">
            <div className="container w-4/5  flex-col flex mx-auto  ">
                <div className="flex text-white gap-3 pt-10 md:pt-1 pe-4 w-fit self-end ">
                    <button className="bg-gray-500 size-10 rounded-full text-2xl text-center">
                        ºC
                    </button>
                    <button className="bg-gray-500 size-10 rounded-full text-2xl text-center">
                        ºF
                    </button>
                </div>
                <div className="container-cards max-w-96 md:max-w-full flex justify-center flex-wrap gap-4 mt-6 ">
                    {dailyData.map((day, index) =>
                    
                      <Cardd key={index}
                        date={day.date}
                     temp_min={day.temp_min}
                     temp_max={day.temp_max}
                     icon ={day.icon}  />

                    )}

                </div>
            </div>

        </div>
    )
}
