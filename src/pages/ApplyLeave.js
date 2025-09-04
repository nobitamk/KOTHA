import React, { useState } from "react";
import axios from "axios";

const ApplyLeave = () => {
  const [form, setForm] = useState({ name: "", reason: "", startDate: "", endDate: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leave/apply", form);
      alert("✅ Leave request submitted");
    } catch {
      alert("❌ Failed to apply");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" onChange={handleChange} required />
      <input name="reason" placeholder="Reason" onChange={handleChange} required />
      <input name="startDate" type="date" onChange={handleChange} required />
      <input name="endDate" type="date" onChange={handleChange} required />
      <button type="submit">Apply Leave</button>
    </form>
  );
};

export default ApplyLeave;
