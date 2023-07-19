import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=0e851b2f408ed70e8347308854b3fe70`
        );
        const forecastData = response.data;
        const temperatures = [
          forecastData.list ? forecastData.list[0].main.temp.toFixed() : null,
          forecastData.list ? forecastData.list[7].main.temp.toFixed() : null,
          forecastData.list ? forecastData.list[14].main.temp.toFixed() : null,
          forecastData.list ? forecastData.list[21].main.temp.toFixed() : null,
          forecastData.list ? forecastData.list[28].main.temp.toFixed() : null,
        ];

        setTempdata(temperatures);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location]);

  const data = {
    labels: ["18/7", "18/7", "18/7", "18/7", "18/7"],
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

export default WeatherChart;
