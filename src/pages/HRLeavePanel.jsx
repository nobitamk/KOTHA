import React, { useEffect, useState } from "react";
import axios from "axios";

const HRLeavePanel = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await axios.get("http://localhost:5000/api/leaves");
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/leaves/status/${id}`, { status });
    fetchLeaves();
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      {leaves.map((leave) => (
        <div key={leave._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <p><b>Name:</b> {leave.name}</p>
          <p><b>Reason:</b> {leave.reason}</p>
          <p><b>Dates:</b> {leave.startDate} to {leave.endDate}</p>
          <p><b>Status:</b> {leave.status}</p>
          {leave.status === "Pending" && (
            <>
              <button onClick={() => updateStatus(leave._id, "Approved")}>✅ Approve</button>
              <button onClick={() => updateStatus(leave._id, "Rejected")}>❌ Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HRLeavePanel;
