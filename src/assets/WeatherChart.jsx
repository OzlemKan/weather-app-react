import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const WeatherChart = ({ location }) => {
  const [tempdata, setTempdata] = useState([]);
  const [day, setDay] = useState([]);

  useEffect(() => {
    if (!location) return; // Skip if location is empty

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=0e851b2f408ed70e8347308854b3fe70`
        );

        const forecastData = response.data;
        if (forecastData.list && forecastData.list.length > 0) {
          const temperatures = [
            forecastData.list[0].main.temp.toFixed(),
            forecastData.list[7].main.temp.toFixed(),
            forecastData.list[14].main.temp.toFixed(),
            forecastData.list[21].main.temp.toFixed(),
            forecastData.list[28].main.temp.toFixed(),
          ];
          setTempdata(temperatures);

          const days = [
            new Date(forecastData.list[0].dt * 1000).toLocaleDateString(
              "en-EN",
              {
                month: "numeric",
                day: "numeric",
              }
            ),
            new Date(forecastData.list[7].dt * 1000).toLocaleDateString(
              "en-EN",
              {
                month: "numeric",
                day: "numeric",
              }
            ),
            new Date(forecastData.list[14].dt * 1000).toLocaleDateString(
              "en-EN",
              {
                month: "numeric",
                day: "numeric",
              }
            ),
            new Date(forecastData.list[21].dt * 1000).toLocaleDateString(
              "en-EN",
              {
                month: "numeric",
                day: "numeric",
              }
            ),
            new Date(forecastData.list[28].dt * 1000).toLocaleDateString(
              "en-EN",
              {
                month: "numeric",
                day: "numeric",
              }
            ),
          ];

          setDay(days);
        }
      } catch (error) {
        console.log("Error Response:", error.response.data);
      }
    };

    fetchData();
  }, [location]);

  const data = {
    labels: day,
    datasets: [
      {
        data: tempdata,
        borderColor: "darkslategray",
      },
    ],
  };

  const options = {};

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

WeatherChart.propTypes = {
  location: PropTypes.string.isRequired,
};

export default WeatherChart;
