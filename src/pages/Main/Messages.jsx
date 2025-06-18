import React, { useEffect, useState } from "react";
import "../Css/Messages.css";
import avatar from "../../images/avatar.png";
import axios from "axios";

const Messages = () => {
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const BASE_URL = import.meta.env.VITE_SERVER_URL;

    axios
      .get(`${BASE_URL}/api/chat/user/${user.id}`)
      .then((res) => {
        setChatData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch chats:", err);
      });
  }, []);

  return (
    <div className="messages-container">
      <div className="messages-card">
        <div className="messages-header-row">
          <div className="messages-header-col">Chats</div>
          <div className="messages-header-col">Phone number</div>
        </div>
        <div className="messages-list">
          {chatData.map((chat, i) => (
            <div className={`messages-row${i % 2 === 1 ? " alt" : ""}`} key={i}>
              <div className="messages-user">
                <img src={avatar} alt="avatar" className="messages-avatar" />
                <span className="messages-username">{chat.name}</span>
              </div>
              <div className="messages-phone">{chat.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
