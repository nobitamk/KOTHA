import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeSidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Employee Panel</h2>
      <nav>
        <ul style={styles.ul}>
          <li><Link to="/employee/dashboard" style={styles.link}>🏠 Dashboard</Link></li>
          <li><Link to="/employee/profile" style={styles.link}>👤 Profile</Link></li>
          <li><Link to="/employee/leaves" style={styles.link}>🗓️ Leaves</Link></li>
          <li><Link to="/employee/apply-leave">✍️ Apply Leave</Link></li>
<li><Link to="/employee/my-leaves">📋 My Leave Status</Link></li>

          <li><Link to="/" style={styles.link}>🚪 Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    background: '#1e1e2f',
    color: '#fff',
    height: '100vh',
    padding: '20px',
  },
  title: {
    color: '#00c6ff',
    fontSize: '20px',
    marginBottom: '20px',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    margin: '15px 0',
    fontSize: '16px',
  },
};

export default EmployeeSidebar;
