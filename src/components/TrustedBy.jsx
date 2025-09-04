import React from "react";
import "./TrustedBy.css";

const companies = [
  "/assets/company1.jpg",
  "/assets/company2.jpg",
  "/assets/company3.jpg",
]
 

const TrustedBy = ({ dark }) => (
  <section
    className="trusted-by-bg"
    style={{
      padding: "40px 0",
      background: dark ? "#23272f" : "#f9f9f9",
      transition: "background 0.3s"
    }}
  >
    <h3
      style={{
        textAlign: "center",
        marginBottom: 20,
        color: dark ? "#fff" : "#222",
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: 1
      }}
    >
      Trusted By
    </h3>
    <div className="trusted-scroll">
      {[...companies, ...companies].map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="Trusted company"
          style={{
            height: 40,
            margin: "0 30px",
            filter: dark ? "brightness(0) invert(1)" : "none",
            transition: "filter 0.3s"
          }}
        />
      ))}
    </div>
  </section>
);

export default TrustedBy;