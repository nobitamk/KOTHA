import React, { useState } from "react";

// import Header from "../components/Header";
import Footer from "../components/Footer";
import teamImg from "../assets/logo.png";



const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    urgent: false,
    nda: false,
    zoom: false,
    projectType: "",
    budget: "",
    file: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [fakePreview, setFakePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    formData.append(key, form[key]);
  });

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      alert("Submission failed.");
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("Something went wrong.");
  }

  setForm({
    name: "",
    email: "",
    message: "",
    urgent: false,
    nda: false,
    zoom: false,
    projectType: "",
    budget: "",
    file: null
  });
};

//   setTimeout(() => setFakePreview(null), 4000);
// };

  return (
    <>
      {/* <Header /> */}
      <div className="contact-bg">
        <section className="contact-container">
          {/* Left Panel */}
          <div className="contact-left">
            <div>
              <h2 className="contact-heading">
                Let’s Create Something Timeless.
              </h2>
              <div className="contact-subheading">
                Start the conversation.
                <span className="contact-quote">
                  “We don’t just build software. We craft experiences.”
                </span>
              </div>
              <div className="contact-info">
                <span>📞</span>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="contact-info">
                <span>📧</span>
                <a href="mailto:hello@infoyieldx.com">hello@kotha.com</a>
              </div>
              <div className="contact-support">
                <span>Live Support Hours:</span> Mon–Fri: 10AM – 7PM IST
                <br />
                <span className="contact-support-time">
                  Avg. reply time: 2 hours
                </span>
              </div>
              <div className="contact-socials">
                <a
                  href="https://linkedin.com/company/infoyieldx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.6v5.596z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/infoyieldx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482c-4.083-.205-7.697-2.162-10.125-5.138a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact-team">
              <img src={teamImg} alt="Team at work" />
              <div className="contact-team-label"></div>
            </div>
            <div className="contact-location">
              <div>
                <span>📍</span>
                <span>Erode,Tamilnadu,India</span>
              </div>
              <div className="contact-map">
                {/* <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  alt="Map"
                /> */}
                <span className="contact-map-dot">📍</span>
              </div>
            </div>
          </div>
          {/* Right Panel: Contact Form */}
          <div className="contact-right">
            <div className="contact-form-title">
              Tell us everything — we’re listening.
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  autoComplete="off"
                />
              </div>
              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  autoComplete="off"
                />
              </div>
              <div className="form-row">
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Project Type
                  </option>
                  <option value="Web">Web</option>
                  <option value="App">App</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div className="form-row">
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Budget
                  </option>
                  <option value="Under $5k">Under $5k</option>
                  <option value="$5k–$20k">$5k–$20k</option>
                  <option value="$20k–$50k">$20k–$50k</option>
                  <option value="Above $50k">Above $50k</option>
                </select>
              </div>
              <div className="form-row">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Message"
                />
              </div>
              <div className="form-toggles">
                <label>
                  <input
                    type="checkbox"
                    name="nda"
                    checked={form.nda}
                    onChange={handleChange}
                  />
                  NDA Required
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={form.urgent}
                    onChange={handleChange}
                  />
                  Urgent Project {form.urgent && <span role="img" aria-label="urgent">🔥</span>}
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="zoom"
                    checked={form.zoom}
                    onChange={handleChange}
                  />
                  Want a Zoom Call?
                </label>
              </div>
              <div className="form-row file-upload">
                <label>
                  Attach file:
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    accept=".pdf,.png,.jpg,.jpeg,.gif"
                  />
                </label>
              </div>
              <button type="submit" className="contact-submit">
                {submitted ? (
                  <>
                    <span className="plane-fly">✅</span> Delivered.
                  </>
                ) : (
                  <>
                    📨 Send Message →
                  </>
                )}
              </button>
              {/* Removed the contact-preview message as requested */}
              {submitted && (
                <div className="contact-confirm">
                  <span>✅</span> Thanks, {form.name || "there"}. Your message is flying our way.<br />
                  We typically respond within <b>2–4 business hours</b>.
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
      
      <style>{`
        .contact-bg {
          min-height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-container {
          display: flex;
          max-width: 1200px;
          margin: 48px auto;
          border-radius: 32px;
          box-shadow: 0 8px 48px rgba(0,198,255,0.13);
          overflow: hidden;
          background: #fff;
        }
        .contact-left, .contact-right {
          flex: 1 1 50%;
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-left {
          background: linear-gradient(120deg, #e0eafc 0%, #f7f9fa 100%);
          border-right: 1.5px solid #e0eafc;
          min-width: 320px;
        }
        .contact-heading {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: #222;
          font-family: 'Playfair Display', serif;
        }
        .contact-subheading {
          font-size: 1.1rem;
          color: #444;
          margin-bottom: 28px;
          font-family: 'Inter', sans-serif;
        }
        .contact-quote {
          display: block;
          font-style: italic;
          color: #0072ff;
          margin-top: 12px;
        }
        .contact-info {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 1.1rem;
        }
        .contact-info a {
          color: #0072ff;
          font-weight: 600;
          text-decoration: none;
        }
        .contact-support {
          background: #e6f7ff;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 15px;
          color: #0072ff;
          margin-bottom: 18px;
          display: inline-block;
          font-weight: 600;
        }
        .contact-support-time {
          color: #00c6ff;
          font-weight: 400;
        }
        .contact-socials {
          display: flex;
          gap: 18px;
          margin: 18px 0 0 0;
        }
        .contact-socials a {
          color: #0072ff;
          font-size: 22px;
          border-radius: 50%;
          border: 1.5px solid #e0eafc;
          padding: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .contact-socials a:hover {
          background: #e0eafc;
        }
        .contact-team {
          margin: 38px 0 18px 0;
          text-align: center;
        }
        .contact-team img {
          width: 120px;
          border-radius: 50%;
          box-shadow: 0 2px 12px rgba(0,198,255,0.12);
          margin-bottom: 8px;
        }
        .contact-team-label {
          color: #888;
          font-size: 15px;
          margin-top: 4px;
        }
        .contact-location {
          margin-top: 16px;
          background: linear-gradient(90deg, #e0eafc 60%, #f7f9fa 100%);
          border-radius: 12px;
          padding: 18px 18px 12px 18px;
        }
        .contact-location > div:first-child {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .contact-map {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 6px;
          box-shadow: 0 2px 12px rgba(0,198,255,0.09);
        }
        .contact-map img {
          width: 100%;
          height: 90px;
          object-fit: cover;
          filter: blur(2px) brightness(0.95);
        }
        .contact-map-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 32px;
          color: #0072ff;
          text-shadow: 0 2px 8px #fff;
        }
        .contact-right {
          background: #fff;
          min-width: 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-form-title {
          font-size: 1.7rem;
          font-weight: 700;
          margin-bottom: 22px;
          color: #222;
          font-family: 'Playfair Display', serif;
          text-align: center;
        }
        .contact-form {
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(44,183,255,0.10);
          padding: 32px 20px;
          border: 1.5px solid #e0eafc;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-row {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
        }
        .form-row input,
        .form-row textarea,
        .form-row select {
          width: 100%;
          padding: 14px 12px;
          border: 1.5px solid #e0eafc;
          background: #f7f9fa;
          font-size: 16px;
          outline: none;
          border-radius: 8px;
          margin-bottom: 0;
          color: #222;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-row input:focus,
        .form-row textarea:focus,
        .form-row select:focus {
          border-color: #1ca9c9;
          box-shadow: 0 2px 12px #1ca9c950;
        }
        .form-row textarea {
          resize: vertical;
          min-height: 80px;
        }
        .form-toggles {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          font-size: 15px;
          color: #1ca9c9;
          font-weight: 600;
          margin-bottom: 0;
        }
        .form-toggles label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .file-upload label {
          font-size: 15px;
          color: #1ca9c9;
          font-weight: 600;
        }
        .file-upload input[type="file"] {
          display: block;
          margin-top: 8px;
        }
        .contact-submit {
          background: #fff;
          color: #1ca9c9;
          border: 2px solid #1ca9c9;
          border-radius: 24px;
          padding: 14px 0;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: none;
          width: 100%;
          margin-top: 8px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .contact-submit:hover {
          background: #f7f9fa;
          color: #0072ff;
          border-color: #0072ff;
          box-shadow: none;
        }
        .plane-fly {
          display: inline-block;
          animation: planeFly 0.8s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes planeFly {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          60% { transform: translateX(30px) scale(1.2); opacity: 1; }
          100% { transform: translateX(60px) scale(0.7); opacity: 0; }
        }
        .contact-preview {
          margin-top: 22px;
          background: #fffbe9;
          border-radius: 8px;
          padding: 12px 18px;
          color: #1ca9c9;
          font-weight: 500;
          font-size: 16px;
          box-shadow: 0 2px 8px #ffe29f70;
        }
        .contact-confirm {
          margin-top: 16px;
          color: #1ca9c9;
          font-weight: 600;
          font-size: 17px;
          background: #fffbe9;
          border-radius: 8px;
          padding: 16px 18px;
        }
        /* Responsive styles */
        @media (max-width: 900px) {
          .contact-container {
            flex-direction: column;
            border-radius: 0;
            margin: 0;
          }
          .contact-left, .contact-right {
            padding: 32px 8px;
            min-width: 0;
          }
          .contact-form {
            padding: 18px 4px;
          }
        }
        @media (max-width: 600px) {
          .contact-form {
            padding: 10px 2px;
            max-width: 100vw;
          }
          .contact-form-title {
            font-size: 1.2rem;
          }
          .contact-heading {
            font-size: 1.3rem;
          }
          .form-row input,
          .form-row textarea,
          .form-row select {
            font-size: 15px;
            padding: 10px 6px;
          }
          .contact-submit {
            font-size: 16px;
            padding: 12px 0;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;