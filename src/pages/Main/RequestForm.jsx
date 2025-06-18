import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/RequestForm.css";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const RequestForm = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state?.editingData || null;

  const [showAllSkills, setShowAllSkills] = useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    wanted_skill_id: "",
    wanted_level: "Beginner",
    description: "",
    your_skill_id: "",
    your_level: "Beginner",
  });

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  // Fetch all skills and user-specific skills
  useEffect(() => {
    if (!user) return;

    const fetchSkills = async () => {
      try {
        const [allRes, userRes] = await Promise.all([
          axios.get("http://localhost:3001/api/skills"),
          axios.get(`http://localhost:3001/api/skills/user/${user.id}`),
        ]);
        setAllSkills(allRes.data);
        setUserSkills(userRes.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, [user]);

  // Pre-fill form in edit mode
  useEffect(() => {
    if (mode === "edit" && editingData) {
      setFormData({
        wanted_skill_id: editingData.wanted_skill_id || "",
        wanted_level: editingData.wanted_level || "Beginner",
        description: editingData.message || "",
        your_skill_id: editingData.your_skill_id || "",
        your_level: editingData.your_level || "Beginner",
      });
    }
  }, [mode, editingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in.");

    const skill_ids = showAllSkills
      ? userSkills.map((s) => s.id)
      : [formData.your_skill_id];

    try {
      if (mode === "add") {
        await axios.post("http://localhost:3001/api/requests", {
          description: formData.description,
          user_id: user.id,
          wanted_skill_id: formData.wanted_skill_id,
          skill_ids: skill_ids.filter(Boolean),
        });
      } else {
        await axios.put(`http://localhost:3001/api/requests/${editingData.id}`, {
          description: formData.description,
          wanted_skill_id: formData.wanted_skill_id,
          user_id: user.id,
        });
      }

      navigate("/home");
    } catch (err) {
      console.error("Request failed:", err);
      alert("Request failed. Check console for details.");
    }
  };

  return (
    <div className="request-container">
      <h2 className="request-title">
        {mode === "add" ? "Add New Request" : "Update Your Request"}
      </h2>
      <form className="request-form" onSubmit={handleSubmit}>
        {/* LEFT COLUMN */}
        <div className="column">
          <div className="form-group">
            <label>Wanted skill</label>
            <select
              name="wanted_skill_id"
              value={formData.wanted_skill_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a skill --</option>
              {allSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Level in wanted skill</label>
            <select
              name="wanted_level"
              value={formData.wanted_level}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>What you want to learn (message)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="column">
          {!showAllSkills && (
            <>
              <div className="form-group">
                <label>Your skill</label>
                <select
                  name="your_skill_id"
                  value={formData.your_skill_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select your skill --</option>
                  {userSkills.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Level in your skill</label>
                <select
                  name="your_level"
                  value={formData.your_level}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group switch-group">
            <label>Offer all your skills</label>
            <span
              className="toggle-icon"
              onClick={() => setShowAllSkills(!showAllSkills)}
            >
              {showAllSkills ? <FaToggleOn /> : <FaToggleOff />}
            </span>
          </div>

          {showAllSkills && (
            <ul className="skill-list">
              {userSkills.map((s, i) => (
                <li key={i}>
                  {s.name} - <strong>{s.level}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="submit-button">
          {mode === "add" ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
