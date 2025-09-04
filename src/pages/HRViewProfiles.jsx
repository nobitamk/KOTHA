import React, { useEffect, useState } from "react";
import axios from "axios";
// ✅ use your HR sidebar

const HRViewProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employee-profiles");
        setProfiles(res.data);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div style={{ display: "flex" }}>
    
      <div style={{ flex: 1, padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Submitted Employee Profiles</h2>

        {profiles.length === 0 ? (
          <p>No profiles submitted yet.</p>
        ) : (
          profiles.map((profile) => (
            <div key={profile._id} style={cardStyle}>
              <h3>{profile.name}</h3>
              <p><b>Email:</b> {profile.email}</p>
              <p><b>Mobile:</b> {profile.mobile}</p>
              <p><b>Date of Birth:</b> {profile.dob}</p>
              <p><b>Education:</b> {profile.education}</p>
              <p><b>Experience:</b> {profile.experience || "N/A"}</p>
              <p><b>Last Company:</b> {profile.lastCompany || "N/A"}</p>
              <p><b>Parent Name:</b> {profile.parentName}</p>

              <div style={{ marginTop: "10px" }}>
                <p><b>Certificates:</b></p>
             <ul>
  {profile.certificates?.tenth && (
    <li><a href={`http://localhost:5000/Uploads/${profile.certificates.tenth}`} target="_blank" rel="noreferrer">10th Certificate</a></li>
  )}
  {profile.certificates?.inter && (
    <li><a href={`http://localhost:5000/Uploads/${profile.certificates.inter}`} target="_blank" rel="noreferrer">Intermediate Certificate</a></li>
  )}
  {profile.certificates?.graduation && (
    <li><a href={`http://localhost:5000/Uploads/${profile.certificates.graduation}`} target="_blank" rel="noreferrer">Graduation Certificate</a></li>
  )}
</ul>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
};

export default HRViewProfiles;
