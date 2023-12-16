import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSmoke,
  WiDust,
  WiThunderstorm,
  WiSnow,
} from "weather-icons-react";

const ForecastWeather = ({ selectedCity, api_key }) => {
  const [weatherForecast, setWeatherForecast] = useState([]);

  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (!selectedCity || !api_key) {
        return; // Avoid unnecessary API calls if city or API key is missing
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${api_key}&units=metric`
        );
        const data = response.data;
        setWeatherForecast(data.list);
        console.log(data);
      } catch (error) {
        console.log("Error Fetching Weather Forecast", error);
      }
    };

    fetchWeatherForecast();
  }, [selectedCity, api_key]);

  const uniqueDays = Array.from(
    new Set(weatherForecast.map((forecast) => getDayOfWeek(forecast.dt_txt)))
  );

  // Filter weather forecast to get the first occurrence of each day
  const filteredForecast = uniqueDays
    .map((day) =>
      weatherForecast.find((forecast) => getDayOfWeek(forecast.dt_txt) === day)
    )
    .filter(Boolean); // Filter out any potential 'undefined' entries

  return (
    <div className="container">
      {filteredForecast && filteredForecast.length > 0 && (
        <div>
          
          <div className="row">
            {filteredForecast.map((forecast, index) => (
              <div key={index} className="col-lg-3 col-md-3 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      {getDayOfWeek(forecast.dt_txt)}
                    </h5>
                    <div className="card-text">
                    
                      <div className="forecast-icons">
                        {forecast.weather[0].main === "Thunderstorm" && (
                          <p>
                            <WiThunderstorm size={50} color="#888" />{" "}
                            Thunderstorm
                          </p>
                        )}
                        {forecast.weather[0].main === "Clear" && (
                          <p>
                            <WiDaySunny size={50} color="#FFD700" /> Clear
                          </p>
                        )}
                        {forecast.weather[0].main === "Rain" && (
                          <p>
                            <WiRain size={50} color="#4286f4" /> Rain
                          </p>
                        )}
                        {forecast.weather[0].main === "Clouds" && (
                          <p>
                            <WiCloudy size={50} color="#aaa" /> Clouds
                          </p>
                        )}
                        {forecast.weather[0].main === "Smoke" && (
                          <p>
                            <WiSmoke size={50} color="#777" /> Smoke
                          </p>
                        )}
                        {forecast.weather[0].main === "Mist" && (
                          <p>
                            <WiDust size={50} color="#bbb" /> Mist
                          </p>
                        )}
                        {forecast.weather[0].main === "Haze" && (
                          <p>
                            <WiSmoke size={50} color="#bbb" /> Haze
                          </p>
                        )}
                        {forecast.weather[0].main === "Snow" && (
                          <p>
                            <WiSnow size={50} color="#bbb" /> Snow
                          </p>
                        )}
                      </div>

                      <p style={{marginLeft:"20px", fontSize:'25px', fontWeight: 'bold'}}> {forecast.main.temp}°C</p>
                      {/* Other relevant forecast data */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastWeather;
