import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../../images/logo/logo2.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin/skills");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <img src={logo} alt="Shelleh Bridge Logo" className="login-logo" />
        </div>
        <h2 className="login-title">LOGIN</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <span>
            <Link to="/signup">Sign up...</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
