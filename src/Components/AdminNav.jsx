import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import './css/AdminNav.css';

const AdminNav = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = "Amman";
        const response = await fetch(`https://wttr.in/${city}?format=%t+%C`);
        const text = await response.text();
        setWeather(text); // Example: +28°C Sunny
      } catch (error) {
        console.error("Weather fetch failed:", error.message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <nav className="admin-nav">
      <h5 className="admin-title">Admin Panel</h5>

      {weather && <div className="weather-info">{weather}</div>}

      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt className="me-2" /> Logout
      </button>
    </nav>
  );
};

export default AdminNav;
