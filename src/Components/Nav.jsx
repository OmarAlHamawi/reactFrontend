import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaBoxOpen,
  FaPenSquare,
  FaComments,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function FillExample() {
  const [profileLabel, setProfileLabel] = useState("Profile");
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (profileLabel === "Profile") {
      setProfileLabel("Logout");
      navigate("/profile");
    } else {
      // Perform logout
      localStorage.removeItem("user");
      setProfileLabel("Profile");
      navigate("/login");
    }
  };

  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home"><FaHome className="nav-icon" /><span> Home</span></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/myRequests"><FaBoxOpen className="nav-icon" /><span> My Requests</span></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/requestForm"><FaPenSquare className="nav-icon" /><span> Make Request</span></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/messages"><FaComments className="nav-icon" /><span> Messages</span></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleProfileClick}>
          {profileLabel === "Profile" ? <FaUser className="nav-icon" /> : <FaSignOutAlt className="nav-icon" />}
          <span> {profileLabel}</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default FillExample;
