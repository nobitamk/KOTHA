import React, { useState } from "react";
import axios from "axios";

const EmployeeProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    education: "",
    experience: "",
    parentName: "",
    lastCompany: "",
  });

  const [certificates, setCertificates] = useState({
    tenth: null,
    inter: null,
    graduation: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCertificates({ ...certificates, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificates.graduation) {
      alert("Graduation certificate is mandatory");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    if (certificates.tenth) data.append("tenth", certificates.tenth);
    if (certificates.inter) data.append("inter", certificates.inter);
    data.append("graduation", certificates.graduation);

    try {
      await axios.post("http://localhost:5000/api/employee-profile", data);

      alert("✅ Profile submitted successfully");
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to submit profile. Please check console.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "30px", background: "#f4f6f8", minHeight: "100vh" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Employee Profile</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
          {inputField("Full Name", "name", form.name, handleChange)}
          {inputField("Email", "email", form.email, handleChange)}
          {inputField("Mobile Number", "mobile", form.mobile, handleChange)}
          {inputField("Date of Birth", "dob", form.dob, handleChange, "date")}
          {inputField("Educational Background", "education", form.education, handleChange)}
          {inputField("Job Experience (Optional)", "experience", form.experience, handleChange)}
          {inputField("Last Company (Optional)", "lastCompany", form.lastCompany, handleChange)}
          {inputField("Parent's Name", "parentName", form.parentName, handleChange)}

          <label style={labelStyle}>10th Certificate (optional)</label>
          <input type="file" name="tenth" onChange={handleFileChange} style={fileInputStyle} />

          <label style={labelStyle}>Intermediate Certificate (optional)</label>
          <input type="file" name="inter" onChange={handleFileChange} style={fileInputStyle} />

          <label style={labelStyle}>Graduation Certificate (mandatory)</label>
          <input type="file" name="graduation" onChange={handleFileChange} required style={fileInputStyle} />

          <button type="submit" style={submitStyle}>Submit Profile</button>
        </form>
      </div>
    </div>
  );
};

// UI helpers
const formStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0,0,0,0.05)",
  maxWidth: "600px",
};

const inputField = (label, name, value, onChange, type = "text") => (
  <>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={type !== "file" && !label.includes("Optional")}
      style={inputStyle}
    />
  </>
);

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  color: "#333",
  fontWeight: "500",
};

const fileInputStyle = {
  marginBottom: "20px",
};

const submitStyle = {
  background: "#007bff",
  color: "#fff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
};

export default EmployeeProfile;
