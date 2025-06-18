import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Profile.css";
import "../Css/MyRequests.css";
import avatar from "../../images/avatar.png";
import { useNavigate, Link, useLocation } from "react-router-dom";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  // Fetch my requests
  useEffect(() => {
    if (!user) return;

    const fetchMyRequests = async () => {
            console.log("Fetching requests for user:", user.id);

      try {
        const res = await axios.get(`http://localhost:3001/api/requests/user/${user.id}`);
        console.log("Raw backend response:", res.data);

        // ✅ Format backend response into nested shape the UI expects
        const formatted = res.data.map((r) => ({
          id: r.id,
          wanted: { skill: r.wanted_skill },
          has: {
            skill: r.skills[0] || "Skill(s)",
            skillsList: r.skills.map((name) => ({ name })),
          },
          hasAllSkills: r.skills.length > 1,
          message: r.description,
          user: { name: user.name },
        }));

        setRequests(formatted);
      } catch (err) {
        console.error("Fetch failed:", err);

        console.error("Failed to load requests", err);
      }
    };

    fetchMyRequests();
  }, [user]);

  // Handle update
  const handleUpdate = (request) => {
    navigate("/requestForm/edit", {
      state: { editingData: request },
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/requests/${id}`, {
        data: { user_id: user.id },
      });
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete request.");
    }
  };

  return (
    <div className="profile-page">
      <main className="profile-main">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <img src={avatar} alt="Avatar" className="profile-avatar" />
          <div className="profile-menu">
            <Link
              to="/profile"
              className={location.pathname === "/profile" ? "active" : ""}
            >
              Personal Information
            </Link>
            <Link
              to="/myRequests"
              className={location.pathname === "/myRequests" ? "active" : ""}
            >
              My Requests
            </Link>
          </div>
        </aside>

        {/* Requests */}
        <section className="requests-section">
          <div className="requests-list">
            {requests.length === 0 && (
              <p style={{ color: "#fff", paddingLeft: "2rem" }}>No requests found.</p>
            )}
            {requests.map((req) => (
              <div className="request-card" key={req.id}>
                <div className="request-row">
                  <div className="request-col">
                    <div className="request-label">wanted</div>
                    <div className="request-skill">{req.wanted.skill}</div>
                  </div>
                  <div className="request-arrow">&#8646;</div>
                  <div className="request-col">
                    <div className="request-label">Has</div>
                    <div className="request-skill">{req.has.skill}</div>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="update-btn" onClick={() => handleUpdate(req)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(req.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyRequests;
