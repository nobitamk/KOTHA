import React, { useEffect, useState } from "react";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/career/applications")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }
        return res.json();
      })
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🗂️ Submitted Applications</h2>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontFamily: "Arial",
          }}
        >
          <thead>
            <tr style={{ background: "#1e1e2f", color: "#fff" }}>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Job</th>
              <th style={cellStyle}>Message</th>
              <th style={cellStyle}>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td style={cellStyle}>{app.name}</td>
                <td style={cellStyle}>{app.email}</td>
                <td style={cellStyle}>{app.job}</td>
                <td style={cellStyle}>{app.message}</td>
                <td style={cellStyle}>
                  <a
                    href={`http://localhost:5000/${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📎 View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewApplications;
