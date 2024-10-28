"use client"
import { useContext, useState } from 'react'
import React from 'react'
import { WeatherContext } from './WeatherContext'



export default function Modal({setToogleModal}) {
    const {city,setCity} =useContext(WeatherContext)
    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (e) => {
        setInputValue(e.target.value);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        setCity(inputValue); // Actualiza la ciudad en el contexto
        setInputValue(''); // Limpia el input
      setToogleModal(false)  
    };    

      console.log(city)

    return (
    <div className='modal max-w-screen-md md:max-w-none md:w-[50vw] h-screen bg-indigo-950  '>
                    <span onClick={()=>setToogleModal(false)} className='text-white text-3xl cursor-pointer '>&times;</span>
                    <form onSubmit={handleSubmit} action="" className='w-full flex items-center justify-around'>
                        <label htmlFor="" className='flex border-2 border-slate-600 px-1'>
                            <figure className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path style={{ fill: "#616475" }} d="M795.761-114.304 531.326-378.5q-29.761 25.264-69.6 39.415-39.84 14.15-85.161 14.15-109.835 0-185.95-76.195Q114.5-477.326 114.5-585t76.196-183.87q76.195-76.195 184.369-76.195t183.87 76.195q75.695 76.196 75.695 184.02 0 43.328-13.641 82.97-13.641 39.641-40.924 74.402L845.5-164.043l-49.739 49.739ZM375.65-393.065q79.73 0 135.29-56.245Q566.5-505.554 566.5-585t-55.595-135.69q-55.595-56.245-135.255-56.245-80.494 0-136.757 56.245Q182.63-664.446 182.63-585t56.228 135.69q56.227 56.245 136.792 56.245Z" /></svg>
                            </figure>
                            <input type="text" value={inputValue} onChange={handleChange} className='bg-transparent outline-none text-white px-2' placeholder='Buscá la ciudad' />
                        </label>
                        <button className='bg-indigo-500 px-3 py-1 text-white'>Buscar</button>
                    </form>
                    <ul className=' px-7 mt-5  flex flex-col gap-5  text-slate-100 '>
                      <li onClick={(e)=>{
                         setCity(e.target.textContent)
                         setToogleModal(false)
                      }} className='hover:border-2 hover:border-slate-400 cursor-pointer px-3'>Bogota</li>
                      <li onClick={(e)=>{
                         setCity(e.target.textContent)
                         setToogleModal(false)
                      }} className='hover:border-2 hover:border-slate-400 cursor-pointer px-3'>Lima</li>
                      <li onClick={(e)=>{
                         setCity(e.target.textContent)
                         setToogleModal(false)
                      }} className='hover:border-2 hover:border-slate-400 cursor-pointer px-3'>Helsinki</li>
                    </ul>
                </div>
  )
}
