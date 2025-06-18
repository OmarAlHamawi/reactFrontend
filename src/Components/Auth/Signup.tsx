import React, { useState } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../css/Signup.css";
import logo from "../../images/logo/logo2.png";

const Signup = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      console.log("Signup successful:", response.data);
      // Optionally redirect to login or dashboard
      // navigate("/login"); — if using useNavigate from react-router-dom
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message
      );
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo-wrapper">
          <img src={logo} alt="Shelleh Bridge Logo" className="signup-logo" />
        </div>
        <h2 className="signup-title">SIGN UP</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="signup-row">
            <div className="signup-field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="signup-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="signup-row">
            <div className="signup-field">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            <div className="signup-field">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword2 ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
          </div>
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">login...</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
