import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";
import { FcGoogle } from "react-icons/fc"; // ✅ Import Google icon

const Register = ({ dark, setDark }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showSendOtp, setShowSendOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "confirmPassword" && value.length > 0) {
      setShowSendOtp(true);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const response = await axios.post("http://localhost:5000/api/user-auth/send-otp", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      if (response.data.success) {
        setOtpSent(true);
        alert("OTP sent to your email");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user-auth/verify-otp", {
        email: formData.email,
        otp
      });
      if (response.data.success) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Failed to verify OTP");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="register-bg" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: dark
        ? "linear-gradient(120deg, #23272f 0%, #23272f 100%)"
        : "linear-gradient(120deg, #e0eafc 0%, #f7f9fa 100%)"
    }}>
      <div className="register-card" style={{
        background: dark ? "#23272f" : "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(44,183,255,0.10)",
        padding: "40px 32px",
        maxWidth: 350,
        width: "100%",
        textAlign: "center",
        position: "relative",
        color: dark ? "#fff" : "#23272f"
      }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>📝</div>
        <h2 style={{ fontFamily: "Playfair Display,serif", fontWeight: 800, marginBottom: 8 }}>Create Account</h2>
        <div style={{ color: "#1ca9c9", marginBottom: 24, fontWeight: 500 }}>Join Kotha's and start your journey!</div>

        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle} autoComplete="off" />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} autoComplete="off" />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} style={inputStyle} autoComplete="off" />
            <input name="confirmPassword" type="password" placeholder="Re-enter Password" value={formData.confirmPassword} onChange={handleChange} style={inputStyle} autoComplete="off" />
            {showSendOtp && <button type="submit" style={buttonStyle}>Send OTP</button>}
          </form>
        ) : (
          <>
            <input name="otp" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={inputStyle} autoComplete="off" />
            <button onClick={handleVerifyOTP} style={buttonStyle}>Verify OTP & Register</button>
          </>
        )}

        <div style={{ margin: "18px 0 10px 0", color: "#888" }}>or</div>

        <button
          style={{
            ...buttonStyle,
            background: "#fff",
            color: "#222",
            border: "2px solid #1ca9c9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
          onClick={handleGoogleRegister}
          type="button"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div style={{ marginTop: 22, fontSize: 15 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0072ff", fontWeight: 600, textDecoration: "underline" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 10px",
  borderRadius: 8,
  border: "1.5px solid #e0eafc",
  marginBottom: 14,
  fontSize: 16,
  outline: "none",
  background: "#f7f9fa"
};

const buttonStyle = {
  width: "100%",
  padding: "12px 0",
  borderRadius: 24,
  border: "none",
  background: "#1ca9c9",
  color: "#fff",
  fontWeight: 700,
  fontSize: 17,
  cursor: "pointer",
  marginBottom: 0,
  marginTop: 2,
  transition: "background 0.2s"
};

export default Register;
