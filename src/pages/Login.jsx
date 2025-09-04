import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider, signInWithPopup } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Login = ({ dark, setDark }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google login successful:", user);
      localStorage.setItem("loggedInUser", user.displayName);
      navigate("/welcome");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user-auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        const userName = res.data.user?.name || "User";
        localStorage.setItem("loggedInUser", userName);
        navigate("/welcome");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="login-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: dark
          ? "linear-gradient(120deg, #23272f 0%, #23272f 100%)"
          : "linear-gradient(120deg, #e0eafc 0%, #f7f9fa 100%)",
      }}
    >
      <div
        className="login-card"
        style={{
          background: dark ? "#23272f" : "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(44,183,255,0.10)",
          padding: "40px 32px",
          maxWidth: 350,
          width: "100%",
          textAlign: "center",
          position: "relative",
          color: dark ? "#fff" : "#23272f",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
        <h2
          style={{
            fontFamily: "Playfair Display,serif",
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Welcome Back!
        </h2>
        <div
          style={{
            color: "#1ca9c9",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          Login to your Kotha's account
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

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
            gap: 10,
          }}
          onClick={handleGoogleLogin}
          type="button"
        >
          <FcGoogle size={20} />
          Login with Google
        </button>

        <div style={{ marginTop: 22, fontSize: 15 }}>
          No account?{" "}
          <Link
            to="/register"
            style={{
              color: "#0072ff",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Register now
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
  background: "#f7f9fa",
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
  transition: "background 0.2s",
};

export default Login;
