import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeaveStatus = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const email = localStorage.getItem("user_email"); // or however you're storing user info
        const res = await axios.get(`http://localhost:5000/api/leaves/user/${email}`);
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leave status:", err);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div style={{ padding: "30px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h2>📋 My Leave Status</h2>
      {leaves.length === 0 ? (
        <p>No leaves applied yet.</p>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} style={cardStyle}>
            <p><strong>From:</strong> {leave.startDate}</p>
            <p><strong>To:</strong> {leave.endDate}</p>
            <p><strong>Reason:</strong> {leave.reason}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: getStatusColor(leave.status) }}>{leave.status}</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  if (status === "Approved") return "green";
  if (status === "Rejected") return "red";
  return "orange"; // Pending
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "15px",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
};

export default MyLeaveStatus;
