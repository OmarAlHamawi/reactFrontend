// Footer.tsx
import React from "react";

import logo2 from "../images/logo/logo2.png";
import InstagramIcon from "../images/socialmedia/instagramLogo.png";
import LinkedInIcon from "../images/socialmedia/linkedinLogo.png";
import GitHubIcon from "../images/socialmedia/githubLogo.png";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="about">
          <img src={logo2} alt="Logo" className="foote_logo" />
          <p>
            <strong>About:</strong>
            <br />
            Shelleh Bridge is a platform that connects learners and mentors to
            swap skills, grow together, and build community.
          </p>
        </div>

        <div className="contact">
          <h3 className="footer-title">Contact us</h3>
          <p className="footer-text">Email: omar.alhamawi@outlook.com</p>
          <p className="footer-text">Phone: +962-799875468</p>
          <div className="footer-info">
            Designed and developed by Omar Al-Hamwi
            <br />© 2025 Shelleh Bridge. All rights reserved
          </div>
        </div>

        <div className="social-media">
          <h4>Follow us</h4>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <img
              src={InstagramIcon}
              alt="Instagram"
              className="social-icon-image"
            />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <img
              src={LinkedInIcon}
              alt="LinkedIn"
              className="social-icon-image"
            />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <img src={GitHubIcon} alt="GitHub" className="social-icon-image" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
