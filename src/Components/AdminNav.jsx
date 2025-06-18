import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="admin-nav p-3 bg-dark text-white d-flex justify-content-between">
      <h5 className="m-0">Admin Panel</h5>
      <button onClick={handleLogout} className="btn btn-outline-light">
        <FaSignOutAlt className="me-2" /> Logout
      </button>
    </nav>
  );
};

export default AdminNav;
