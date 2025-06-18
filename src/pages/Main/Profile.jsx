import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Profile.css";
import avatar from "../../images/avatar.png";
import { FaPen, FaSave } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const skillLevels = ["select level", "Beginner", "Intermediate", "Advanced"];

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", password: "", phone: "", skills: [] });
  const [allSkills, setAllSkills] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, skillsRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/profile/${user.id}`),
          axios.get("http://localhost:3001/api/skills"),
        ]);

        setProfile({
          name: userRes.data.name,
          email: userRes.data.email,
          password: userRes.data.password || "",
          phone: userRes.data.phone || "",
          skills: userRes.data.skills || [],
        });
        setAllSkills(skillsRes.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillLevel = (skillName, value) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s) =>
        s.skill === skillName ? { ...s, level: value } : s
      ),
    }));
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await axios.put(`http://localhost:3001/api/profile/${user.id}`, {
          user_id: user.id,
          name: profile.name,
          email: profile.email,
          password: profile.password,
          phone: profile.phone,
          skills: profile.skills,
        });
        alert("Profile updated successfully");
      } catch (err) {
        console.error("Update failed", err);
        alert("Update failed");
      }
    }
    setEditMode((prev) => !prev);
  };

  return (
    <div className="profile-page">
      <main className="profile-main">
        <aside className="profile-sidebar">
          <img src={avatar} alt="Avatar" className="profile-avatar" />
          <div className="profile-menu">
            <Link
              to="/profile"
              className={location.pathname === "/profile" ? "active" : ""}
            >
              Personal Information
            </Link>
            <Link
              to="/myRequests"
              className={location.pathname === "/myRequests" ? "active" : ""}
            >
              My Requests
            </Link>
          </div>
        </aside>

        <section className="profile-info-card">
          <button
            className="profile-edit-btn"
            onClick={handleEditClick}
            style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", cursor: "pointer", color: "#f6e3b4", fontSize: 22 }}
            aria-label={editMode ? "Save changes" : "Edit profile"}
          >
            {editMode ? <FaSave /> : <FaPen />}
          </button>
          <form>
            <div className="profile-form-2col">
              <div className="profile-form-row-grid">
                <div className="profile-form-group">
                  <label>Name</label>
                  <input type="text" name="name" value={profile.name} onChange={handleChange} readOnly={!editMode} />
                </div>
                <div className="profile-form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={profile.email} onChange={handleChange} readOnly={!editMode} />
                </div>
                <div className="profile-form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={profile.password} onChange={handleChange} readOnly={!editMode} />
                </div>
                <div className="profile-form-group">
                  <label>Phone</label>
                  <input type="text" name="phone" value={profile.phone} onChange={handleChange} readOnly={!editMode} />
                </div>
              </div>
            </div>

            <div className="profile-form-skills-grid">
              {allSkills.map((skill) => {
                const owned = profile.skills.find((s) => s.skill === skill.name);
                return (
                  <div className="profile-form-skill-block" key={skill.id}>
                    <label>{skill.name}</label>
                    <div className="profile-form-skill-row">
                      <input
                        type="checkbox"
                        checked={!!owned}
                        disabled={!editMode}
                        onChange={() => {
                          if (!editMode) return;
                          setProfile((prev) => {
                            const exists = prev.skills.find((s) => s.skill === skill.name);
                            return {
                              ...prev,
                              skills: exists
                                ? prev.skills.filter((s) => s.skill !== skill.name)
                                : [...prev.skills, { skill: skill.name, level: "select level" }],
                            };
                          });
                        }}
                      />
                      <div className="profile-form-skill-select-block">
                        <label className="profile-form-skill-select-label">Level</label>
                        <select
                          value={owned?.level || "select level"}
                          disabled={!editMode || !owned}
                          onChange={(e) => handleSkillLevel(skill.name, e.target.value)}
                        >
                          {skillLevels.map((lvl) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;
