const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const sendEmailOTP = require("../utils/sendEmailOTP");
const User = require("../models/user");

let otpStore = {};
let tempUserStore = {}; // Temporarily store user data until OTP is verified

// Send OTP Route
router.post("/send-otp", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  tempUserStore[email] = { name, email, password }; // store unverified user data

  try {
    await sendEmailOTP(email, otp);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP Route and Save User to DB
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
    const userData = tempUserStore[email];
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    });

    try {
      await newUser.save();
      delete otpStore[email];
      delete tempUserStore[email];
      res.status(200).json({ success: true, message: "Account created successfully" });
    } catch (error) {
      console.error("Saving user failed:", error);
      res.status(500).json({ success: false, message: "Account creation failed" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
