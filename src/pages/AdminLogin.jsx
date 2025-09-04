import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./employee/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin-auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = res.data;
      login({ token, ...user });

      // Redirect based on role
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "hr") navigate("/hr");
      else navigate("/employee");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-box" onSubmit={handleSubmit}>
        <h2>Admin Panel Login</h2>
        {error && <p className="admin-error">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Embedded CSS */}
      <style>{`
        .admin-login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f2f2f2;
        }

        .admin-login-box {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          width: 320px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        .admin-login-box h2 {
          text-align: center;
          margin-bottom: 1rem;
        }

        .admin-login-box input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .admin-login-box button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .admin-login-box button:hover {
          background-color: #0056b3;
        }

        .admin-error {
          color: red;
          font-size: 0.9rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
