// ✅ AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={sidebarStyle}>
        <h2 style={titleStyle}>kotha</h2>
        <ul style={ulStyle}>
          <li><Link to="/admin/dashboard" style={linkStyle}>📊 Dashboard</Link></li>
          <li><Link to="/admin/edit-stats" style={linkStyle}>✏️ Edit Stats</Link></li>
          <li><Link to="/admin/add-employee" style={linkStyle}>➕ Add Employee</Link></li>
          <li><Link to="/admin/view-employees" style={linkStyle}>📋 View Employees</Link></li>
          <li><Link to="/admin/view-contacts" style={linkStyle}>📧 View Messages</Link></li>
          <li><Link to="/admin/applications" style={linkStyle}>📄 View Applications</Link></li>
          <li><Link to="/admin/cms" style={linkStyle}>📝 CMS Editor</Link></li>
          <li><Link to="/" style={linkStyle}>🚪 Logout</Link></li>
        </ul>
      </div>
      <div style={mainStyle}>
        <h1>👑 Welcome, Admin</h1>
        <div style={cardGrid}>
          <DashboardCard title="Projects" value="12 Ongoing" />
          <DashboardCard title="Employee Count" value="36" />
          <DashboardCard title="Pending Approvals" value="4" />
        </div>
        <section style={sectionStyle}>
          <h2>CMS Editor Quick Access</h2>
          <p>You can manage all homepage, blog, and about page content dynamically from the CMS section.</p>
        </section>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div style={cardStyle}>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const sidebarStyle = {
  width: '220px', background: '#1e1e2f', color: '#fff', padding: '20px'
};
const titleStyle = { color: '#00c6ff' };
const ulStyle = { listStyle: 'none', padding: 0 };
const linkStyle = {
  color: '#fff', textDecoration: 'none', display: 'block', margin: '15px 0', fontSize: '16px'
};
const mainStyle = { padding: '30px', flex: 1 };
const cardGrid = { display: 'flex', gap: '20px', marginTop: '20px' };
const cardStyle = {
  background: '#f5f5f5', borderRadius: '10px', padding: '20px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};
const sectionStyle = { marginTop: '40px' };

export default AdminDashboard;
