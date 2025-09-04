// src/pages/ViewContacts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Failed to load contacts:", err));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: '20px' }}>
          <h2>📧 Submitted Contact Inquiries</h2>
          {contacts.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Message</th>
                  <th style={thStyle}>Project</th>
                  <th style={thStyle}>Budget</th>
                  <th style={thStyle}>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{c.name}</td>
                    <td style={tdStyle}>{c.email}</td>
                    <td style={tdStyle}>{c.message}</td>
                    <td style={tdStyle}>{c.projectType}</td>
                    <td style={tdStyle}>{c.budget}</td>
                    <td style={tdStyle}>{new Date(c.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "10px",
  background: "#f4f4f4"
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "10px"
};

export default ViewContacts;
