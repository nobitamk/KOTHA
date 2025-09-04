import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => (
  <>
    <Header />
    <section style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", background: "#eef2f7" }}>
      {/* Replace below with a real 3D model or animation */}
      <div>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Welcome to Kotha</h1>
        <p style={{ fontSize: "1.5rem" }}>Empowering Digital Solutions</p>
        {/* 3D/animated SVG or Canvas here */}
        <img src="/assets/3d-hero.png" alt="3D Visual" style={{ width: 400, marginTop: 32 }} />
      </div>
    </section>
    {/* ...other sections... */}
    <Footer />
  </>
);

export default Home;