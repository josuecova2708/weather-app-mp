import Image from "next/image";
import Card from "./components/card";
import MainWeather from "./components/MainWeather";
import FiveDays from "./components/FiveDays";
import Highlights from "./components/Highlights";

export default function Home() {
  return (
    <div className="container md:flex md:bg-indigo-950 mx-auto ">
      <MainWeather />
      
      <div className="  md:flex md:flex-col md:w-full md:max-w-none ">
        <FiveDays />

        <Highlights />

      </div>

    </div>
  );
}
