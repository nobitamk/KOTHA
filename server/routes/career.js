const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const Application = require("../models/Application");

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST /api/career/apply
router.post("/apply", upload.single("resume"), async (req, res) => {
  const { name, email, message, job } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required." });
  }

  const resumePath = req.file.path;

  try {
    // Save to DB
    const newApp = new Application({
      name,
      email,
      job,
      message,
      resume: resumePath,
    });
    await newApp.save();

    // Mail setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Mail to Admin
    const adminMail = {
      from: process.env.MAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Application for ${job}`,
      text: `${name} (${email}) applied for ${job}.\n\nMessage:\n${message}`,
      attachments: [{ path: resumePath }],
    };

    // Mail to User
    const userMail = {
  from: process.env.MAIL_USER,
  to: email,
  subject: `✅ Application Received - ${job} at InfoYieldX`,
  html: `
    <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); padding: 30px;">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px;">
        <h2 style="color: #10b981; margin: 0;">InfoYieldX Careers</h2>
        <p style="color: #6b7280; margin: 5px 0;">Building Teams That Build the Future</p>
      </div>

      <!-- Body -->
      <div style="margin-top: 30px;">
        <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 15px;">Thank you for applying for the position of <strong>${job}</strong> at InfoYieldX. We have successfully received your application.</p>

        <div style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px;"><strong>Application Summary:</strong></p>
          <ul style="margin: 10px 0 0 20px; font-size: 14px; color: #111827;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Position:</strong> ${job}</li>
          </ul>
        </div>

        <p style="font-size: 14px;">Our HR team will review your resume and reach out to you if your profile matches our requirements. We truly appreciate your interest in joining our team.</p>
      </div>

      <!-- Footer -->
      <div style="margin-top: 30px; font-size: 13px; color: #6b7280; border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
        Regards,<br />
        <strong>InfoYieldX HR Team</strong><br />
        📧 <a href="mailto:hr@infoyieldx.com" style="color: #2563eb;">hr@infoyieldx.com</a><br />
        🌐 <a href="https://infoyieldx.com" style="color: #2563eb;">infoyieldx.com</a>
      </div>
    </div>
  `,
};

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("🔥 Error while applying:", err);
    res.status(500).json({ message: "Server error while applying" });
  }
});

// ✅ NEW: GET /api/career/applications — for Admin Panel
// GET /api/career/applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error("❌ Error fetching applications:", err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});


module.exports = router;
