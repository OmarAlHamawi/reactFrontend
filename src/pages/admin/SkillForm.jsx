import React, { useEffect, useState } from "react";

const SkillForm = ({ skill, onSubmit }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(skill ? skill.name : "");
  }, [skill]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = skill ? "PUT" : "POST";
    const url = skill
      ? `http://localhost:3001/api/admin/skills/${skill.id}`
      : "http://localhost:3001/api/admin/skills";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter skill name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {skill ? "Update Skill" : "Add Skill"}
      </button>
    </form>
  );
};

export default SkillForm;
