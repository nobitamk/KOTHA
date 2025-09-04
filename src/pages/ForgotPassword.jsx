// src/pages/ForgotPassword.jsx

import React, { useState } from "react";
import { auth, sendPasswordResetEmail } from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Reset link sent! Check your email.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f9fa"
    }}>
      <div style={{
        padding: 32,
        maxWidth: 360,
        width: "100%",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        textAlign: "center"
      }}>
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 12
          }}
        />
        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            background: "#1ca9c9",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send Reset Link
        </button>
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
