import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditStats = () => {
  const [stats, setStats] = useState({ employees: 0, interns: 0, projects: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/dashboard/stats", stats)
      .then(() => navigate("/admin/dashboard"))
      .catch(err => console.error("Failed to update", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Dashboard Stats</h2>
      <form onSubmit={handleSubmit}>
        <label>Employees:</label>
        <input type="number" name="employees" value={stats.employees} onChange={handleChange} /><br />
        <label>Interns:</label>
        <input type="number" name="interns" value={stats.interns} onChange={handleChange} /><br />
        <label>Projects:</label>
        <input type="number" name="projects" value={stats.projects} onChange={handleChange} /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditStats;
