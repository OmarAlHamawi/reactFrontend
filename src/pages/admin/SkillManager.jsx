import React, { useEffect, useState } from "react";
import SkillForm from "./SkillForm";

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchSkills = async () => {
    const res = await fetch(`${BASE_URL}/api/admin/skills`);
    const data = await res.json();
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/api/admin/skills/${id}`, {
      method: "DELETE",
    });
    fetchSkills();
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
  };

  const handleFormSubmit = () => {
    setEditingSkill(null);
    fetchSkills();
  };

  return (
    <div className="container mt-4">
      <h2>Skill Management</h2>
      <SkillForm skill={editingSkill} onSubmit={handleFormSubmit} />
      <hr />
      <h4>All Skills</h4>
      <ul className="list-group">
        {skills.map((skill) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={skill.id}
          >
            {skill.name}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(skill)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(skill.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillManager;
