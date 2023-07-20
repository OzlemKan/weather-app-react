import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import WeatherChart from "./assets/WeatherChart";
import useLocalStorage from "use-local-storage";

function App() {
  const [data, setData] = useState({});
  const [photoUrl, setPhotoUrl] = useLocalStorage("userPhotoUrl", "");

  const defaultImageUrl = "https://unsplash.com/fr/photos/Q1p7bh3SHj8";
  const [location, setLocation] = useLocalStorage(
    "userLocation",
    defaultImageUrl
  );

  let debounceTimer;

  const searchLocation = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=0e851b2f408ed70e8347308854b3fe70`
      );

      setData(response.data);

      const photoResponse = await axios.get(
        `https://api.unsplash.com/photos/random?query=${location}&client_id=nOq89hQk6sTCBZb8EOXZB0tQKvOoJLdpbFA9QuoKR3E`
      );

      setPhotoUrl(photoResponse.data.urls.regular);

      setLocation(location);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchData(location);
    }
  }, [location]);

  const fetchData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=0e851b2f408ed70e8347308854b3fe70`
      );

      setData(response.data);
    } catch (error) {
      console.log("Error Response:", error.response.data);
    }
    storeLocation(location);
  };

  const storeLocation = (location) => {
    setLocation(location);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Call the debounce function with a delay of 500ms before making the API call
      debounce(searchLocation, 500)();
    }
  };

  // Debounce function to delay the execution of a function
  const debounce = (func, delay) => {
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${photoUrl ? photoUrl : defaultImageUrl})`,
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchLocation();
            }
          }}
          type="text"
        />
      </div>

      {data.city !== undefined && (
        <div className="container">
          <div className="top">
            <div className="location">
              {data.city ? <h1>{data.city.name}, today</h1> : null}
            </div>
            <div>
              <img
                className="icon"
                src={`https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </div>

            <div className="temp">
              {data.list ? <p>{data.list[0].main.temp.toFixed()}°C</p> : null}
            </div>
          </div>

          <div className="bottom_container">
            <div className="bottom">
              {data.list ? (
                <p className="bold">
                  {new Date(data.list[7].dt * 1000).toLocaleDateString(
                    "en-EN",
                    {
                      weekday: "long",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                </p>
              ) : null}

              <div>
                {data.list ? (
                  <img
                    className="icon"
                    src={`https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                ) : null}
              </div>

              {data.list ? <p>{data.list[7].main.temp.toFixed()}°C</p> : null}
            </div>

            <div className="bottom">
              {data.list ? (
                <p className="bold">
                  {new Date(data.list[14].dt * 1000).toLocaleDateString(
                    "en-EN",
                    {
                      weekday: "long",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                </p>
              ) : null}

              <div>
                {data.list ? (
                  <img
                    className="icon"
                    src={`https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                ) : null}
              </div>

              {data.list ? <p>{data.list[14].main.temp.toFixed()}°C</p> : null}
            </div>

            <div className="bottom">
              {data.list ? (
                <p className="bold">
                  {new Date(data.list[21].dt * 1000).toLocaleDateString(
                    "en-EN",
                    {
                      weekday: "long",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                </p>
              ) : null}

              <div>
                {data.list ? (
                  <img
                    className="icon"
                    src={`https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                ) : null}
              </div>

              {data.list ? <p>{data.list[21].main.temp.toFixed()}°C</p> : null}
            </div>

            <div className="bottom">
              {data.list ? (
                <p className="bold">
                  {new Date(data.list[28].dt * 1000).toLocaleDateString(
                    "en-EN",
                    {
                      weekday: "long",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                </p>
              ) : null}

              <div>
                {data.list ? (
                  <img
                    className="icon"
                    src={`https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                ) : null}
              </div>
              <p>
                {data.list ? (
                  <p>{data.list[28].main.temp.toFixed()}°C</p>
                ) : null}
              </p>
            </div>
          </div>

          <WeatherChart location={location} />
        </div>
      )}
    </div>
  );
}

export default App;
