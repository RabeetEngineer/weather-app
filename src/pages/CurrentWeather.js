import React, { useState, useEffect } from "react";
import moment from "moment-timezone"; // Import moment-timezone library
import axios from "axios";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSmoke,
  WiDust,
  WiThunderstorm,WiSnow,
} from "weather-icons-react";

// Function to get country based on timezone
const getCountryForTimezone = (timezone) => {
  const country = moment.tz(timezone).zoneAbbr();
  return country;
};

// Function to get current time based on timezone
const getCurrentTimeForTimezone = (timezone) => {
  const currentTime = moment.tz(timezone).format("LLL");
  return currentTime;
};

const CurrentWeather = ({ handleCitySelect }) => {
  const famousCities = [
    // Cities in Pakistan
    "Karachi",
    "Lahore",
    "Islamabad",
    "Faisalabad",
    "Rawalpindi",
    "Multan",
    "Gujranwala",
    "Quetta",
    "Peshawar",
    "Sargodha",
    "Sialkot",
    "Bahawalpur",
    "Sukkur",
    "Jhang",
    "Sheikhupura",
    "Larkana",
    "Gujrat",
    "Mardan",
    "Kasur",
    "Rahim Yar Khan",
    "Sahiwal",
    "Okara",
    "Wah Cantonment",
    "Dera Ghazi Khan",
    "Mirpur Khas",
    "Nawabshah",
    "Mingora",
    "Chiniot",
    "Kamoke",
    "Mandi Bahauddin",
    "Hafizabad",
    "Sadiqabad",
    "Jacobabad",
    "Kohat",
    "Shikarpur",
    "Khanewal",
    "Hub",
    "Dera Ismail Khan",
    "Charsadda",
    "Kandhkot",
    "Mansehra",
    "Tando Allahyar",
    "Gojra",
    "Swabi",
    "Muridke",
    "Jalalpur",
    "Muzaffargarh",
    "Khanpur",
    "Havelian",
    "Lodhran",
    "Lalamusa",
    "Kohlu",
    "Khuzdar",
    "Dera Allahyar",
    "Tank",
    "Chakwal",
    "Kharian",
    "Mehrabpur",
    "Mianwali",
    "Muzaffarabad",
    "Moro",
    "Tando Adam",
    "Jaranwala",
    "Chishtian",
    "Kandiaro",
    "Hasilpur",
    "Arifwala",
    "Bhakkar",
    "Khairpur",
    "Vihari",
    "Attock",
    "Gujranwala",
    "Lala Musa",
    "Bannu",
    "Timargara",
    "Parachinar",
    "Ghotki",
    "Sambrial",
    "Jatoi",
    "Kahror Pakka",
    "Haroonabad",
    "Shujaabad",
    "Daska",
    "Dadu",
    "Tando Muhammad Khan",
    "Pakpattan",
    "Badin",
    "Bahawalnagar",
    "Shahdadkot",
    "Ghotki",
    "Naushahro Feroze",
    "Shahdadpur",
    "Shahpur Chakar",
    "Hala",
    "Rajanpur",
    "Turbat",
    "Shahkot",
    "Shikarpur",
    "Bhera",
    "Matli",
    "Gharo",
    "Mirpur Mathelo",
    "Kulachi",
    "Mehar",
    "Usta Muhammad",
    "Dinga",
    "Warburton",
    "Choa Saidan Shah",
    "Bhong",
    "Pindi Bhattian",
    "Sodhra",
    "Rohri",
    "Ranipur",
    "Kotri",
    "Kashmor",
    "Matiari",
    "Mangla",
    "Mithi",
    "Zhob",
    "Kunjah",
    "Matiari",
    "Mehar",
    "Usta Muhammad",
    "Dinga",
    "Warburton",
    "Choa Saidan Shah",
    "Bhong",
    "Pindi Bhattian",
    "Sodhra",
    "Rohri",
    "Ranipur",
    "Kotri",
    "Kashmor",
    "Matiari",
    "Mangla",
    "Mithi",
    "Zhob",
    "Kunjah",
    "Matiari",
    "Mehar",
    "Usta Muhammad",
    "Dinga",
    "Warburton",
    "Choa Saidan Shah",
    "Bhong",
    "Pindi Bhattian",
    "Sodhra",
    "Rohri",
    "Ranipur",
    "Kotri",
    "Kashmor",
    "Matiari",
    "Mangla",
    "Mithi",
    "Zhob",
    "Kunjah",
    // Famous cities around the world
    "New York",
    "Paris",
    "Tokyo",
    "London",
    "Dubai",
    "Los Angeles",
    "Beijing",
    "Moscow",
    "Delhi",
    "Mumbai",
    "Rome",
    "Sydney",
    "Cairo",
    "Rio de Janeiro",
    "Toronto",
    "Berlin",
    "Madrid",
    "Amsterdam",
    "Athens",
    "Seoul",
    "Stockholm",
    "Bangkok",
    "Singapore",
    "Istanbul",
    "Vienna",
    "Prague",
    "Budapest",
    "Helsinki",
    "Cape Town",
    "Johannesburg",
    "Mexico City",
    // Add more famous cities from around the world as needed
  ];

  const countryNames = {
    PK: "Pakistan",
    IN: "India",
    US: "United States",
    GB: "United Kingdom",
    FR: "France",
    // Add more country codes and names as needed
    PK: "Pakistan",
    IN: "India",
    US: "United States",
    GB: "United Kingdom",
    FR: "France",
    DE: "Germany",
    IT: "Italy",
    ES: "Spain",
    CA: "Canada",
    AU: "Australia",
    EG: "Egypt",
    BR: "Brazil",
    RU: "Russia",
    CN: "China",
    JP: "Japan",
    AE: "United Arab Emirates",
    // ... (Add more countries as needed)
  };

  // Function to get full country name based on country code
  const getCountryName = (countryCode) => {
    return countryNames[countryCode] || "Unknown";
  };

  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const api_key = "7ee565136d49b93a2def96656f3c04e4"; // Replace with your API key

  const handleInputChange = (event) => {
    setSelectedCity(event.target.value);
    console.log("Selected City:", event.target.value); // Check the selected value
    handleCitySelect(event.target.value); // Invoke handleCitySelect with the selected value
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${api_key}&units=metric`
      );
      const data = response.data;
      const temperature = data.main.temp;
      const condition = data.weather[0].main;
      const country = data.sys.country;
      setWeatherData({
        temperature,
        condition,
        timezone: data.sys.timezone,
        country,
      });
      console.log(data);
    } catch (error) {
      console.log("Error Fetching Weather Data", error);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity]);

  return (
    <div>
      <select
        className="form-select mt-5"
        value={selectedCity}
        onChange={(e) => handleInputChange(e)}
      >
        <option value="">Select a city...</option>
        {/* Render options for famous cities */}
        {famousCities.map((cityName, index) => (
          <option key={index} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>

      {weatherData && (
        <div>
        {weatherData.condition === "Thunderstorm" && (
          <WiThunderstorm size={300} color="#888" />
        )}
        {weatherData.condition === "Clear" && (
          <WiDaySunny size={300} color="#FFD700" />
        )}
        {weatherData.condition === "Rain" && (
          <WiRain size={300} color="#4286f4" />
        )}
        {weatherData.condition === "Clouds" && (
          <WiCloudy size={300} color="#aaa" />
        )}
        {weatherData.condition === "Smoke" && (
          <WiSmoke size={300} color="#3524" />
        )}
        {weatherData.condition === "Mist" && (
          <WiDust size={300} color="#bbb" />
        )}
        {weatherData.condition === "Haze" && (
          <WiSmoke size={300} color="#bbb" />
        )}
        {weatherData.condition === "Snow" && (
          <WiSnow size={300} color="#ffw" />
        )}
          {/* <p>City: {selectedCity.toUpperCase()}</p> */}
          <div className="temperature-container">
            <span className="temperature-value">{weatherData.temperature}</span>
            <span className="celsius-symbol">&#8451;</span>
          </div>
          <p className="time-value">
            {getCurrentTimeForTimezone(weatherData.timezone)}
          </p>
          <hr className="minor-horizontal-line" />

          <div className="condition-value">
            {weatherData.condition === "Thunderstorm" && (
              <p>
                <WiThunderstorm size={50} color="#888" /> Thunderstorm
              </p>
            )}
            {weatherData.condition === "Clear" && (
              <p>
                <WiDaySunny size={50} color="#FFD700" /> Clear
              </p>
            )}
            {weatherData.condition === "Rain" && (
              <p>
                <WiRain size={50} color="#4286f4" /> Rain
              </p>
            )}
            {weatherData.condition === "Clouds" && (
              <p>
                <WiCloudy size={50} color="#aaa" /> Clouds
              </p>
            )}
            {weatherData.condition === "Smoke" && (
              <p>
                <WiSmoke size={50} color="#777" /> Smoke
              </p>
            )}
            {weatherData.condition === "Mist" && (
              <p>
                <WiDust size={50} color="#bbb" /> Mist
              </p>
            )}
            {weatherData.condition === "Haze" && (
              <p>
                <WiSmoke size={50} color="#bbb" /> Haze
              </p>
            )}
            {weatherData.condition === "Snow" && (
              <p>
                <WiSnow size={50} color="#bbb" /> Snow
              </p>
            )}
          </div>

            {/* <p>Country: {getCountryName(weatherData.country)}</p> */}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
