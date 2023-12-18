import React, { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import { Link } from "react-router-dom";
import "./Style.css";

const Home = ({ api_key }) => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCitySelect = (selectedCity) => {
    console.log("Selected city in handleCitySelect:", selectedCity);
    setSelectedCity(selectedCity);
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: "#D6D7DA", paddingBottom: '30px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-3 col-md-12 col-sm-12 current-weather-div">
              <CurrentWeather handleCitySelect={handleCitySelect} />
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12 weekly-weather-div">
              <nav className="navbar navbar-expand-lg">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ width: '100%' }}>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="#"
                        onClick={() => setSelectedCity(selectedCity)} // Set the selected city directly
                        style={{
                          fontWeight: "bold",
                          color: "orange", // Always set to orange when clicked
                          textDecoration: "none",
                          transition: "color 0.3s, font-weight 0.3s",
                          fontSize: "30px",
                          position: "relative",
                          cursor: "pointer",
                          display: "inline-block",
                        }}
                      >
                        Weekly Forecast
                        <span
                          style={{
                            position: "absolute",
                            bottom: "-4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderBottom: "2px solid orange", // Always show orange underline
                            width: "40%",
                            transition: "border-color 0.3s",
                          }}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <ForecastWeather // Render ForecastWeather directly
                selectedCity={selectedCity}
                api_key={api_key}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
