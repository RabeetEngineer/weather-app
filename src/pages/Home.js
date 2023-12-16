import React, { useState } from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import { Link } from "react-router-dom";
import "./Style.css";

const Home = ({ api_key }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [activeTab, setActiveTab] = useState("default"); // Set "today" as the default active

  

  const handleCitySelect = (selectedCity) => {
    console.log("Selected city in handleCitySelect:", selectedCity);
    setSelectedCity(selectedCity);
  };
  const handleTabChange = (tab) => {
    console.log("Tab changed to:", tab);
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: "#D6D7DA" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12 current-weather-div">
              <CurrentWeather handleCitySelect={handleCitySelect} />
              {console.log("")}
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 weekly-weather-div">
              <nav className="navbar navbar-expand-lg">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/** 
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          activeTab === "today" ? "active" : ""
                        }`}
                        to="#"
                        onClick={() => handleTabChange("today")}
                      >
                        Today
                      </Link>
                    </li>
                    */}
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          activeTab === "week" ? "active" : ""
                        }`}
                        to="#"
                        onClick={() => handleTabChange("week")}
                        style={{
                          fontWeight: "bold",
                          color: activeTab === "week" ? "orange" : "inherit",
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
                            borderBottom: `2px solid ${
                              activeTab === "week" ? "orange" : "transparent"
                            }`, // Show underline when active
                            width: "40%",
                            transition: "border-color 0.3s", // Add transition for smooth effect
                          }}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              {activeTab === "week" && (
                <ForecastWeather
                  selectedCity={selectedCity}
                  api_key={api_key}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
