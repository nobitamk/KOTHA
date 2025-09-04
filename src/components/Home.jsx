import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle"; // Make sure this file exists

const Home = () => (
  <>
    <Header />
    {/* Animated Title Section */}
    <AnimatedTitle />
    {/* ...other sections... */}
    <Footer />
  </>
);

export default Home;