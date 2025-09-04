import React from "react";
import { Link } from "react-router-dom";

const HRDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e1e2f",
          color: "#fff",
          height: "100vh",
          padding: "20px",
        }}
      >
        <h2 style={{ color: "#00c6ff" }}>Kotha</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/hr/dashboard" style={linkStyle}>📋 HR Dashboard</Link></li>
            <li><Link to="/admin/view-employees" style={linkStyle}>👥 All Employees</Link></li>
            <Link to="/hr/view-profiles" style={linkStyle}>👥 View Employee Profiles</Link>
            <li><Link to="/admin/applications" style={linkStyle}>📄 Applications</Link></li>
            <li><Link to="/admin/leave-panel">🧾 Leave Panel</Link></li>

            
            <li><Link to="/" style={linkStyle}>🚪 Logout</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", background: "#f4f6f9", minHeight: "100vh" }}>
        <h1 style={{ color: "#333" }}>HR Dashboard</h1>
        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <Card title="Total Employees" value="27" color="#00c6ff" />
          <Card title="Open Positions" value="4" color="#ff9800" />
          <Card title="Leave Requests" value="3" color="#e91e63" />
        </div>

        <div style={{ marginTop: "40px" }}>
          <h3 style={{ color: "#555" }}>Recent Leave Requests</h3>
          <ul style={{ background: "#fff", padding: "20px", borderRadius: "8px", marginTop: "10px" }}>
            <li>🔹 John (UI/UX) - 2 Days (Pending)</li>
            <li>🔹 Riya (Backend) - 1 Day (Approved)</li>
            <li>🔹 Karthik (Marketing) - 5 Days (Pending)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div style={{ flex: 1, background: color, padding: "25px", borderRadius: "12px", color: "#fff" }}>
    <h2>{value}</h2>
    <p>{title}</p>
  </div>
);

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  margin: "15px 0",
  fontSize: "16px",
};

export default HRDashboard;
