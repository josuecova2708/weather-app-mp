import axios from "axios";

export  const fetchDataDays = async (cityname) => {
        const key = "3bc4c9f45cf04e7a74ac17d51146bf82";
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&APPID=${key}&units=metric`);
        return response.data.list;
    };
