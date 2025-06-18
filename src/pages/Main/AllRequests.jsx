import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestBox from "./RequestBox";
import "../Css/AllRequests.css";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get logged-in user ID
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchRequests = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_SERVER_URL;
        const res = await axios.get(`${BASE_URL}/api/requests?excludeUser=${currentUserId}`);
        setRequests(res.data); 
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
  }, [currentUserId]);

  return (
    <div className="requests-container">
      {requests.map((req, i) => (
        <RequestBox key={i} request={req} />
      ))}
    </div>
  );
};

export default AllRequests;
