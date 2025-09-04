import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee({ onAdded }) {
  const [form, setForm] = useState({ name: "", role: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");

      const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Employee added successfully!");

        // ✅ Trigger dashboard refresh
        if (typeof onAdded === "function") {
          onAdded();
        }

        navigate("/admin/dashboard");
      } else {
        setError(result.message || "❌ Failed to add employee.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Employee</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    maxWidth: 400,
    margin: "auto",
    background: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 15,
    textAlign: "center",
  },
};

export default AddEmployee;
