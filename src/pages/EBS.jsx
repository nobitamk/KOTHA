import React from "react";
import "./OracleEBS.css";
import oracleHero from '../assets/oracle-bg-hero.png';

const OracleEBSPage = ({ dark }) => {
  return (
    <div className={`ebs-page ${dark ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Optimize with Oracle EBS</h1>
            <p>
              Streamline your business operations with our expert Oracle Enterprise
              Business Suite solutions.
            </p>
            <a href="#services" className="cta-button">
              Explore EBS Solutions
            </a>
          </div>
          {/* Hero Image (optional, uncomment if needed)
          <div className="hero-image">
            <img
              src={oracleHero}
              alt="Oracle EBS Hero"
              style={{ width: "50%", maxWidth: "500px", height: "auto" }}
            />
          </div> */}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2>Comprehensive EBS Services</h2>
        <p className="section-subtitle">
          Unlock the full potential of Oracle EBS for your enterprise.
        </p>
        <div className="services-flow">
          <div className="service-item">
            <div className="service-icon">⚙️</div>
            <h3>EBS Implementation</h3>
            <p>Seamless deployment tailored to your business processes.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">🔄</div>
            <h3>Upgrades & Migration</h3>
            <p>Smooth transitions to the latest EBS versions or cloud.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">🛠️</div>
            <h3>Customization</h3>
            <p>Personalized configurations to meet unique business needs.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">🛡️</div>
            <h3>Support & Maintenance</h3>
            <p>24/7 support to ensure optimal EBS performance.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Choose Our EBS Expertise?</h2>
        <p className="section-subtitle">
          Partner with us to maximize your Oracle EBS investment.
        </p>
        <div className="benefits-container">
          <div className="benefit-card">
            <h3>Proven Expertise</h3>
            <p>Certified consultants with deep EBS knowledge.</p>
          </div>
          <div className="benefit-card">
            <h3>End-to-End Solutions</h3>
            <p>From planning to post-implementation support.</p>
          </div>
          <div className="benefit-card">
            <h3>Cost Efficiency</h3>
            <p>Optimized processes to reduce operational costs.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-visual">
        <div className="cta-container">
          <div className="cta-text">
            <h2>Let’s Revolutionize Your EBS Strategy</h2>
            <p>
              Whether you're looking to implement, upgrade, or maintain Oracle EBS,
              our expert team is here to help you succeed.
            </p>
            <a href="/contact" className="cta-button">Get in Touch</a>
          </div>
          <div className="cta-image">
            <img
              src={oracleHero}
              alt="Oracle EBS Hero"
              style={{ width: "50%", maxWidth: "500px", height: "auto" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OracleEBSPage;
