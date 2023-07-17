import React, { useState } from "react";
import axios from "axios";

export const Forecast = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=0e851b2f408ed70e8347308854b3fe70`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
    return (
      <div className="bold">
        <p color="red">test</p>
      </div>
    );
  };
};
