import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Main Components
import LandingPage from "./Components/Main/LandingPage";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import RequestForm from "./Components/RequestForm";
import Footer from "./Components/Main/Footer";
import Nav from "./Components/Main/Nav";
import MyRequests from "./Components/Main/MyRequests";
import Profile from "./Components/Main/Profile";
import AllRequests from "./Components/Main/AllRequests";
import Messages from "./Components/Main/Messages";

// Admin Components
import SkillManager from "./Components/admin/SkillManager";
import AdminNav from "./Components/admin/AdminNav";

const AppRoutes = () => {
  const location = useLocation();
  const path = location.pathname;

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const isAdminPage = path.startsWith("/admin");

  // Admin layout (show only admin nav)
  const showAdminNavOnly = isAdmin && isAdminPage;

  // Show standard nav/footer only for non-admin and non-auth routes
  const showNav =
    !["/", "/login", "/signup"].includes(path) && !showAdminNavOnly;
  const showFooter =
    path !== "/login" && path !== "/signup" && !showAdminNavOnly;

  return (
    <>
      {showNav && <Nav />}
      {showAdminNavOnly && <AdminNav />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<AllRequests />} />
        <Route path="/requestForm" element={<RequestForm mode="add" />} />
        <Route path="/requestForm/edit" element={<RequestForm mode="edit" />} />
        <Route path="/myRequests" element={<MyRequests />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />

        {/* ✅ Admin Route */}
        <Route path="/admin/skills" element={<SkillManager />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
