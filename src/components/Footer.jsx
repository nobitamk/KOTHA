import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";

const socialLinks = [
  { name: "Email", icon: <FaEnvelope />, url: "mailto:info@infoyieldx.com" },
  { name: "Phone", icon: <FaPhoneAlt />, url: "tel:+91XXXXXXXXXX" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com/yourpage" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/company/infoyieldx" },
  { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/infoyieldx" },
  { name: "Website", icon: <FaGlobe />, url: "https://infoyieldx.com" }
];

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Blog", to: "/blog" }
];

const services = [
  { name: "Web Development", to: "/services/web-development" },
  { name: "App Development", to: "/services/app-development" },
  { name: "Accounting", to: "/services/accounting" },
  { name: "Oracle EBS", to: "/services/oracle-ebs" },
  { name: "Oracle Database", to: "/services/oracle-database" }
];

const Footer = ({ dark }) => (
  <footer
    style={{
      background: dark ? "#fff" : "#222",
      color: dark ? "#23272f" : "#fff",
      padding: "40px 0 20px 0",
      transition: "background 0.3s, color 0.3s"
    }}
  >
    <div
      className="footer-grid"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxWidth: 1400,
        margin: "0 auto",
        flexWrap: "wrap",
        gap: 40,
        padding: "0 20px"
      }}
    >
      {/* InfoYieldX title + mission/vision/passion */}
      <div className="show-always" style={{ minWidth: 180 }}>
        <div style={{ fontWeight: "bold", fontSize: 24, marginBottom: 10 }}>Kotha</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <span>Mission</span>
          <span>Vision</span>
          <span>Passion</span>
        </div>
      </div>

      {/* Hidden on mobile */}
      <div className="hide-on-mobile" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.to}
            style={{
              color: dark ? "#23272f" : "#fff",
              textDecoration: "none",
              fontSize: 16
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="hide-on-mobile" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {services.map(service => (
          <Link
            key={service.name}
            to={service.to}
            style={{
              color: dark ? "#23272f" : "#fff",
              textDecoration: "none",
              fontSize: 16
            }}
          >
            {service.name}
          </Link>
        ))}
      </div>

      <div className="hide-on-mobile" style={{ minWidth: 260 }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <FaEnvelope />
            <a
              href="mailto:muralikotha37@gmail.com"
              style={{ color: dark ? "#23272f" : "#fff", textDecoration: "none" }}
            >
              info@Kotha.com
            </a>
          </div>
          <div style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <FaPhoneAlt />
            <a
              href="tel:+91XXXXXXXXXX"
              style={{ color: dark ? "#23272f" : "#fff", textDecoration: "none" }}
            >
              +91-XXXXXXXXXX
            </a>
          </div>
          <div style={{ marginBottom: 10 }}>
            📍 
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 24,
                color: dark ? "#23272f" : "#00ffe1"
              }}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Show map on all devices */}
      <div className="show-always" style={{ width: 250, height: 250 }}>
        <iframe
          title="InfoYieldX Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5631290168924!2d77.71905441445736!3d11.343635191844353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96fcb7d4cc0e5%3A0x9b9bdcfbeac5e781!2sMGK%20Complex%2C%20No%3A267%2C%20VIP%20Garden%2C%20Solar%2C%20Erode%2C%20Tamil%20Nadu%20638002!5e0!3m2!1sen!2sin!4v1717990271892!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            borderRadius: 12
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>

    <div
      style={{
        fontSize: 14,
        color: dark ? "#888" : "#aaa",
        textAlign: "center",
        marginTop: 20
      }}
    >
      &copy; {new Date().getFullYear()} Kotha. All rights reserved.
    </div>

    {/* CSS to control visibility on mobile */}
    <style>{`
      @media (max-width: 768px) {
        .hide-on-mobile {
          display: none !important;
        }
        .footer-grid {
          flex-direction: column !important;
          align-items: center !important;
          text-align: center;
        }
        .footer-grid > div {
          width: 100% !important;
          max-width: 500px;
        }
        .footer-grid iframe {
          width: 100% !important;
          height: 200px !important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
