const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const EmployeeProfile = require("../models/Employeeprofile");

// Ensure the certificate folder exists
const certDir = path.join(__dirname, "..", "Uploads", "Certificates");
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, certDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const upload = multer({ storage });

// POST route to upload profile
router.post(
  "/",
  upload.fields([
    { name: "tenth", maxCount: 1 },
    { name: "inter", maxCount: 1 },
    { name: "graduation", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files.graduation) {
        return res.status(400).json({ error: "Graduation certificate is mandatory." });
      }

      const profile = new EmployeeProfile({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        education: req.body.education,
        experience: req.body.experience || "",
        lastCompany: req.body.lastCompany || "",
        parentName: req.body.parentName,
        certificates: {
          tenth: req.files.tenth?.[0]?.filename || "",
          inter: req.files.inter?.[0]?.filename || "",
          graduation: req.files.graduation[0].filename,
        },
      });

      await profile.save();
      res.status(200).json({ message: "✅ Profile uploaded successfully" });
    } catch (err) {
      console.error("❌ Upload failed:", err);
      res.status(500).json({ error: "Failed to save profile." });
    }
  }
);

// GET single profile by email
router.get("/:email", async (req, res) => {
  try {
    const profile = await EmployeeProfile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// GET all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await EmployeeProfile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

module.exports = router;
