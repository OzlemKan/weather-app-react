import React, { useState } from "react";
import axios from "axios";
import { Forecast } from "./Forecast";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=0e851b2f408ed70e8347308854b3fe70`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.city ? <p>{data.city.name}</p> : null}
          </div>
          <div className="temp">
            {data.list ? <h1>{data.list[0].main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.list ? <p>{data.list[0].weather[0].main}</p> : null}
          </div>
        </div>

        <div className="forecastContainer">
          <div className="bottom">
            {data.list ? (
              <p className="bold">
                {new Date(data.list[7].dt * 1000).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            ) : null}

            {data.list ? <p>{data.list[7].main.temp.toFixed()}°C</p> : null}
          </div>

          <div className="bottom">
            {data.list ? (
              <p className="bold">
                {new Date(data.list[14].dt * 1000).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            ) : null}

            {data.list ? <p>{data.list[14].main.temp.toFixed()}°C</p> : null}
          </div>

          <div className="bottom">
            {data.list ? (
              <p className="bold">
                {new Date(data.list[21].dt * 1000).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            ) : null}

            {data.list ? <p>{data.list[21].main.temp.toFixed()}°C</p> : null}
          </div>

          <div className="bottom">
            {data.list ? (
              <p className="bold">
                {new Date(data.list[28].dt * 1000).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            ) : null}
            <p>
              {data.list ? <p>{data.list[28].main.temp.toFixed()}°C</p> : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
