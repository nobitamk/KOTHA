const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// POST - handle contact submission
router.post("/", async (req, res) => {
  const contactData = req.body;

  try {
    const saved = await Contact.create(contactData);

    // Send admin email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // Send to admin
    await transporter.sendMail({
      from: `"InfoYieldX Contact" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📥 New Contact from ${contactData.name}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Message:</strong><br/>${contactData.message}</p>
        <p><strong>Budget:</strong> ${contactData.budget}</p>
        <p><strong>Project Type:</strong> ${contactData.projectType}</p>
        <p><strong>Urgent:</strong> ${contactData.urgent ? "Yes 🔥" : "No"}</p>
        <p><strong>NDA:</strong> ${contactData.nda ? "Yes" : "No"}</p>
        <p><strong>Zoom:</strong> ${contactData.zoom ? "Yes" : "No"}</p>
      `
    });

    // Confirmation to user
    await transporter.sendMail({
  from: `"InfoYieldX" <${process.env.MAIL_USER}>`,
  to: contactData.email,
  subject: "✅ We Received Your Message!",
  html: `
    <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); padding: 30px;">
      
      <!-- Header -->
      <div style="text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px;">
        <h2 style="color: #10b981; margin: 0;">Thank You for Contacting InfoYieldX!</h2>
        <p style="color: #6b7280; margin: 5px 0;">Your message is in safe hands.</p>
      </div>

      <!-- Body -->
      <div style="margin-top: 30px;">
        <p style="font-size: 16px;">Hi <strong>${contactData.name}</strong>,</p>
        <p style="font-size: 15px;">
          Thanks for reaching out to <strong>InfoYieldX</strong>! We’ve received your message and one of our team members will get back to you within <strong>2–4 business hours</strong>.
        </p>

        <p style="font-size: 14px;">
          In the meantime, feel free to explore our services and recent projects at 
          <a href="https://infoyieldx.com" style="color: #2563eb;">infoyieldx.com</a>.
        </p>
      </div>

      <!-- Footer -->
      <div style="margin-top: 30px; font-size: 13px; color: #6b7280; border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
        Regards,<br />
        <strong>InfoYieldX Team</strong><br />
        📧 <a href="mailto:support@infoyieldx.com" style="color: #2563eb;">support@infoyieldx.com</a><br />
        🌐 <a href="https://infoyieldx.com" style="color: #2563eb;">infoyieldx.com</a>
      </div>
    </div>
  `
});


    res.status(200).json({ message: "Submitted successfully" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET - fetch all contact submissions (for admin panel)
router.get("/", async (req, res) => {
  try {
    const allContacts = await Contact.find().sort({ createdAt: -1 }); // Show newest first
    res.status(200).json(allContacts);
  } catch (err) {
    console.error("❌ Failed to fetch contacts:", err);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

module.exports = router;
