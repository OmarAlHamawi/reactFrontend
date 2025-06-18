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
import LandingPage from "./pages/Main/LandingPage";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import RequestForm from "./pages/Main/RequestForm";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import MyRequests from "./pages/Main/MyRequests";
import Profile from "./pages/Main/Profile";
import AllRequests from "./pages/Main/AllRequests";
import Messages from "./pages/Main/Messages";

// Admin Components
import SkillManager from "./pages/admin/SkillManager";
import AdminNav from "./Components/AdminNav";

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
