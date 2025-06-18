import React from "react";
import { useNavigate } from "react-router-dom"; // Import the navigate hook
import "../css/LandingPage.css";

import ShellehBridgelearn from "../../images/landingpage/ShellehBridgelearn.png";
import WhoIsShellehGroup from "../../images/landingpage/WhoIsShellehGroup.png";
import WhyShellehBridge from "../../images/landingpage/WhyShellehBridge.png";
import HowToUseShellehBridge from "../../images/landingpage/HowToUseShellehBridge.png";

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-text">
          <h1 className="headline">
            Shelleh Bridge <span>Learn Together, Grow Together.</span>
          </h1>
          <p className="subheadline">
            Join a community of learners, creators, and collaborators
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
        <img
          src={ShellehBridgelearn}
          alt="Shelleh Group Logo"
          className="about-image"
        />
      </section>

      <section className="about">
        <h2>Who is Shelleh Group</h2>
        <div className="about-content">
          <img
            src={WhoIsShellehGroup}
            alt="Shelleh Group"
            className="about-image"
          />
          <p className="about-description">
            Shelleh Group is a one-person innovation lab led by a student with a
            passion for turning ideas into real-world solutions. It began as a
            fun Instagram page—Shelleh Memez—used to share tech projects in a
            humorous way. Over time, it grew into a portfolio of creative builds
            and smart systems.
          </p>
        </div>
      </section>

      <section className="why">
        <h2>Why Shelleh Bridge</h2>
        <div className="why-content">
          <img
            src={WhyShellehBridge}
            alt="Why Shelleh Bridge"
            className="why-image"
          />
          <p className="why-description">
            Because everyone's good at something, and no one should have to
            build alone. Shelleh Bridge is a student-built skill-swapping
            platform that connects developers, designers, writers, and creators
            to team up, share strengths, and build together.
          </p>
        </div>
      </section>

      <section className="how">
        <h2>How to Use Shelleh Bridge</h2>
        <div className="how-content">
          <img
            src={HowToUseShellehBridge}
            alt="How Shelleh Bridge Works"
            className="how-image"
          />
          <p className="how-description">
            Create your free Shelleh account. Browse existing skill "spans" for
            what you need. Didn't find it? Post your own request and wait for a
            match. Chat, swap contact info, and lock in your collaboration.
            Learn the new skill, then log it in your Skill Book!
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
