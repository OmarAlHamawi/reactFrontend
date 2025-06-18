import React, { useState } from "react";
import "../Css/Box.css";
import { MdCompareArrows } from "react-icons/md";
import avatar from "../../images/avatar.png";
import axios from "axios";

const RequestBox = ({ request }) => {
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const {
    wanted = {},
    has = {},
    message = "",
    user = {},
    hasAllSkills = false,
  } = request;

  const handleStartBridge = async () => {
    try {
      if (!currentUser || !user?.id) {
        alert("Missing user info.");
        return;
      }

      const res = await axios.post(`${BASE_URL}/api/chat/start`, {
        sender_id: currentUser.id,
        receiver_id: user.id,
      });

      alert("Bridge started. Your phone number was shared!");
      // Optionally navigate to chat
    } catch (err) {
      console.error("Start Bridge failed:", err);
      alert("Failed to start bridge.");
    }
  };

  return (
    <div className="request-box">
      {/* Main row */}
      <div className="request-box-row" style={{ alignItems: "center" }}>
        {/* Want */}
        <div className="request-box-col">
          <div className="request-box-label">want</div>
          <div className="request-box-skill">
            {wanted.skill || "No skill"}
          </div>
        </div>

        {/* Arrow */}
        <div className="request-box-arrow">
          <MdCompareArrows size={38} />
        </div>

        {/* Has */}
        <div className="request-box-col has-col">
          <div className="request-box-label">has</div>
          <div
            className={`request-box-skill${hasAllSkills ? " has-hover" : ""}`}
            onMouseEnter={() => hasAllSkills && setShowMenu(true)}
            onMouseLeave={() => hasAllSkills && setShowMenu(false)}
          >
            {has.skill || "Skill(s)"}

            {hasAllSkills && showMenu && (
              <div className="hover-skill-menu">
                <div className="hover-skill-title">All skills</div>
                <ul className="hover-skill-list">
                  {has.skillsList.map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="request-box-message">{message}</div>

      {/* Footer */}
      <div className="request-box-footer">
        <button className="request-box-btn" onClick={handleStartBridge}>
          Start a Bridge
        </button>
        <div className="request-box-user">
          <img src={avatar} alt="avatar" className="request-box-avatar" />
          <span>By: {user.name || "Anonymous"}</span>
        </div>
      </div>
    </div>
  );
};

export default RequestBox;
