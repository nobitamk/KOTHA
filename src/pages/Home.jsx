import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimatedTitle from "../components/AnimatedTitle";
import AnimatedHero from "../components/AnimatedHero";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";
import TrustedBy from "../components/TrustedBy";
import Footer from "../components/Footer";

const Home = ({ dark }) => {
  const [cms, setCms] = useState({});

  useEffect(() => {
    const fetchCms = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/cms/home");
        const mapped = {};
        data.forEach((item) => {
          mapped[item.section] = item.value;
        });
        setCms(mapped);
      } catch (error) {
        console.error("CMS Fetch Error:", error);
      }
    };

    fetchCms();
  }, []);

  return (
    <>
      <div className="home-bg">
        <section className="home-container">
          {dark ? <AnimatedHero /> : <AnimatedTitle />}
          <WhatWeDo dark={dark} />
          <HowWeWork dark={dark} />
          <TrustedBy dark={dark} />

          <h2 className="home-metrics-header">{cms.metricsHeader || "Live Metrics"}</h2>
          <div className="home-stats-row">
            <div className="home-stat-card">
              <div className="home-stat-icon">✅</div>
              <div className="home-stat-title">Projects Completed</div>
              <div className="home-stat-value">{cms.projectsCompleted || 37}</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-icon">💼</div>
              <div className="home-stat-title">Clients Onboarded</div>
              <div className="home-stat-value">{cms.clientsOnboarded || 12}</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-icon">👨‍💻</div>
              <div className="home-stat-title">Interns Promoted</div>
              <div className="home-stat-value">{cms.internsPromoted || 5}</div>
            </div>
            <div className="home-stat-card">
              <div className="home-stat-icon">🕒</div>
              <div className="home-stat-title">Uptime</div>
              <div className="home-stat-value">{cms.uptime || "99.98%"}</div>
            </div>
          </div>

          <div className="home-last-updated">{cms.lastUpdated || "Last updated: Today"}</div>

          <div className="home-intern-desk">
            <h3 className="home-intern-title">
              {cms.internTitle || "“From the Intern’s Desk” — Honest Diaries"}
            </h3>
            <div className="home-intern-row">
              <div className="home-intern-card">
                {cms.internQuote1 || "“I joined thinking I’d just shadow someone. But on Day 3, I was building the client dashboard alone. Terrified? Yes. Grateful? Absolutely.”"}<br />
                <span className="home-intern-name">{cms.internName1 || "— Rohan, Intern Dev"}</span>
              </div>
              <div className="home-intern-card">
                {cms.internQuote2 || "“My first bug fix went live in production. I was so nervous, but the team cheered me on!”"}<br />
                <span className="home-intern-name">{cms.internName2 || "— Nikhil, Intern QA"}</span>
              </div>
              <div className="home-intern-card">
                {cms.internQuote3 || "“I never thought I’d demo to a client as an intern. But here, everyone gets a chance.”"}<br />
                <span className="home-intern-name">{cms.internName3 || "— Priya, Intern Analyst"}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

    


<style>{`
  .home-metrics-header {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 0;
    color: #00c6ff;
    letter-spacing: 1px;
  }

  .home-bg {
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .home-container {
    max-width: 1200px;
    margin: 48px auto;
    border-radius: 32px;
    box-shadow: 0 8px 48px rgba(0,198,255,0.13);
    overflow: hidden;
    background: #fff;
    padding: 40px 0 0 0;
  }

  .home-stats-row {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin: 48px 0 0 0;
    flex-wrap: wrap;
  }

  .home-stat-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,198,255,0.08);
    padding: 32px 40px;
    min-width: 220px;
    text-align: center;
  }

  .home-stat-icon {
    font-size: 32px;
    font-weight: 700;
    color: #00c6ff;
  }

  .home-stat-title {
    font-size: 22px;
    font-weight: 600;
    color: #222;
  }

  .home-stat-value {
    font-size: 28px;
    margin: 8px 0;
    color: #222;
  }

  .home-last-updated {
    text-align: center;
    color: #888;
    margin-top: 12px;
    font-size: 15px;
  }

  .home-intern-desk {
    background: #fff;
    border-radius: 16px;
    margin: 48px auto 32px auto;
    max-width: 900px;
    padding: 32px 24px;
  }

  .home-intern-title {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: #0072ff;
    margin-bottom: 24px;
  }

  .home-intern-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  .home-intern-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,198,255,0.07);
    padding: 20px 24px;
    max-width: 320px;
    font-size: 17px;
    color: #222;
  }

  .home-intern-name {
    color: #00c6ff;
    font-weight: 600;
  }

  /* --- DARK MODE OVERRIDES --- */
  body.dark-theme .home-bg {
    background: #23272f !important;
  }

  body.dark-theme .home-container,
  body.dark-theme .home-intern-desk,
  body.dark-theme .home-stat-card,
  body.dark-theme .home-intern-card {
    background: transparent !important;
    box-shadow: none !important;
  }

  body.dark-theme .home-stat-title,
  body.dark-theme .home-stat-value,
  body.dark-theme .home-intern-card,
  body.dark-theme .home-intern-title {
    color: #fff !important;
  }

  body.dark-theme .home-last-updated {
    color: #bbb !important;
  }

  /* --- RESPONSIVE MEDIA QUERIES --- */
  @media (max-width: 900px) {
    .home-container {
      border-radius: 0;
      margin: 0;
    }
    .home-stats-row {
      gap: 16px;
    }
    .home-intern-desk {
      padding: 18px 8px;
    }
  }

  @media (max-width: 600px) {
    .home-metrics-header {
      font-size: 20px;
    }
    .home-stat-title {
      font-size: 16px;
    }
    .home-stat-value {
      font-size: 20px;
    }
    .home-stat-card {
      padding: 18px 12px;
    }
    .home-intern-title {
      font-size: 18px;
    }
    .home-intern-card {
      font-size: 15px;
      padding: 14px 10px;
    }
  }
`}</style>
...

...
    </>
  );
};

export default Home;