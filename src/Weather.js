import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState({});
  let [searched, setSearched] = useState(false);

  function showTemperature(response) {
    setSearched(true);
    setTemperature({
      temp: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b400ae3b711a616262d18b0ca2cbe78f&units=metric`;
    axios
      .get(url)
      .then(showTemperature)
      .catch((e) => {});
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (searched) {
    return (
      <div>
        {form}
        <ul>
          <li>Current Weather in {city}</li>
          <li>{temperature.temp}°C</li>
          <li>{temperature.wind}%</li>
          <li>{temperature.humidity}km/h</li>
          <li>
            <img src={temperature.icon} alt={temperature.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
