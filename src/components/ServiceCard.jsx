import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description, onClick, dimmed, dark }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: dark ? "0 4px 24px #00ffe1" : "0 4px 24px #00c6ff" }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    style={{
      background: dark ? "#181c24" : "#fff",
      borderRadius: 16,
      padding: 32,
      margin: 16,
      cursor: "pointer",
      border: dark ? "2px solid #23272f" : "2px solid #eee",
      transition: "box-shadow 0.2s, filter 0.2s, background 0.3s, border 0.3s, color 0.3s",
      filter: dimmed ? "blur(2px) brightness(0.8)" : "none",
      opacity: dimmed ? 0.5 : 1,
      pointerEvents: dimmed ? "none" : "auto",
      minWidth: 250,
      maxWidth: 300,
      boxShadow: dark
        ? "0 2px 8px rgba(0,198,255,0.10)"
        : "0 2px 8px rgba(0,0,0,0.05)",
      color: dark ? "#fff" : "#222"
    }}
  >
    <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
    <h3 style={{ color: dark ? "#fff" : "#222" }}>{title}</h3>
    <p style={{ color: dark ? "#bbb" : "#555" }}>{description}</p>
  </motion.div>
);

export default ServiceCard;