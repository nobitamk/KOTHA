import React, { useEffect } from "react";
import "./Accounting.css";

const Accounting = ({ dark }) => {
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`accounting-container ${dark ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="accounting-hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Next-Gen Accounting</h1>
            <p>
              Automated bookkeeping, tax insights, and financial clarity in one place.
            </p>
            <a href="/contact" className="cta-btn">Get Started</a>
          </div>
          <div className="hero-right">
            <img src="/assets/finance-hero.svg" alt="Finance Illustration" />
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="accounting-services">
        <h2>Our Expertise</h2>
        <div className="services">
          <div className="service">
            <img src="/assets/cloud-account.svg" alt="Cloud Accounting" />
            <h3>Cloud Accounting</h3>
            <p>Access reports and ledgers anywhere with bank-level security.</p>
          </div>
          <div className="service">
            <img src="/assets/tax-filing.svg" alt="Tax Filing" />
            <h3>Smart Tax Filing</h3>
            <p>Never miss deadlines with automatic GST, TDS, and income tax tools.</p>
          </div>
          <div className="service">
            <img src="/assets/insights.svg" alt="Insights" />
            <h3>Real-Time Insights</h3>
            <p>Stay on top of revenue, expenses, and profitability.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="accounting-cta">
        <h2>Let's Simplify Your Finances</h2>
        <p>Join hundreds of businesses that trust us with their numbers.</p>
        <a href="/contact" className="cta-btn">Connect Now</a>
      </section>
    </div>
  );
};

export default Accounting;
