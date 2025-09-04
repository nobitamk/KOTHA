import React from 'react';
import './OracleDatabase.css';
// import heroImg from '../assets/oracle-db-hero.svg'; // Add your SVG here

const OracleDatabasePage = ({ dark }) => {
  return (
    <div className={`oracle-db-page ${dark ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Power Up with Oracle Database</h1>
            <p>Secure, scalable, and high-performance database solutions tailored to your business.</p>
            <a href="#services" className="cta-button">Explore Database Services</a>
          </div>
          {/* <div className="hero-image">
            <img src={heroImg} alt="Oracle Database" />
          </div> */}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2>Database Services We Offer</h2>
        <div className="services-grid">
          {[
            ['Database Design', 'Custom schema and architecture design for optimized data access.'],
            ['Performance Tuning', 'Identify and resolve performance bottlenecks in real-time.'],
            ['Backup & Recovery', 'Automated backups and disaster recovery solutions.'],
            ['Cloud Integration', 'Deploy Oracle databases in the cloud for greater scalability.'],
          ].map(([title, desc], idx) => (
            <div className="service-card" key={idx}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <h2>Why Choose Our Oracle Experts?</h2>
        <div className="benefits">
          {[
            ['Certified DBAs', 'Team of certified Oracle database administrators and architects.'],
            ['Real-Time Monitoring', 'Track performance and uptime 24/7 with proactive alerts.'],
            ['Cost Optimization', 'Efficient use of resources to reduce database management costs.'],
          ].map(([title, desc], idx) => (
            <div className="benefit" key={idx}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <h2>Let’s Build Something Powerful Together</h2>
        <p>Get in touch with our Oracle DB team to start optimizing your data stack today.</p>
        <a href="/contact" className="cta-button">Contact Us</a>
      </section>
    </div>
  );
};

export default OracleDatabasePage;
