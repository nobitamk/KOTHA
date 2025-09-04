import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{
      width: '220px',
      background: '#1e1e2f',
      color: '#fff',
      height: '100vh',
      padding: '20px',
    }}>
      <h2 style={{ color: '#00c6ff' }}>Kotha</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin/dashboard" style={linkStyle}>📊 Dashboard</Link></li>
          <li><Link to="/admin/edit-stats" style={linkStyle}>✏️ Edit Stats</Link></li>
          <li><Link to="/admin/add-employee" style={linkStyle}>➕ Add Employee</Link></li>
          <li><Link to="/admin/view-employees" style={linkStyle}>📋 View Employees</Link></li>
          <li><Link to="/admin/view-contacts" style={linkStyle}>📧 View Messages</Link></li>
           <li><Link to="/admin/applications" style={linkStyle}>📄 View Applications</Link></li>
          <li><Link to="/admin/cms" style={linkStyle}>✏️ CMS Editor</Link></li>
          <li><Link to="/" style={linkStyle}>🚪 Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  margin: '15px 0',
  fontSize: '16px'
};

export default Sidebar;
