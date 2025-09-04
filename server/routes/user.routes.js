const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all users (admin/hr only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Update employee's own profile (employee panel)
router.put("/profile/:id", async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      profile: updates
    }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Profile update failed" });
  }
});

module.exports = router;
