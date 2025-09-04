import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewEmployees({ onDataFetched }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("admin_token");

        const res = await fetch("http://localhost:5000/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await res.json();
        setEmployees(data);

        // ✅ Notify parent (App.jsx) with fresh data
        if (typeof onDataFetched === "function") {
          onDataFetched(data);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Employees List</h2>

      <button onClick={() => navigate("/admin/dashboard")} style={{ marginBottom: 20 }}>
        ← Back to Dashboard
      </button>

      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && employees.length === 0 && <p>No employees found.</p>}

      {!loading && !error && employees.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ddd" }}>
              <th style={{ padding: 8, border: "1px solid #ccc" }}>Name</th>
              <th style={{ padding: 8, border: "1px solid #ccc" }}>Role</th>
              <th style={{ padding: 8, border: "1px solid #ccc" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td style={{ padding: 8, border: "1px solid #ccc" }}>{emp.name}</td>
                <td style={{ padding: 8, border: "1px solid #ccc" }}>{emp.role}</td>
                <td style={{ padding: 8, border: "1px solid #ccc" }}>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewEmployees;
