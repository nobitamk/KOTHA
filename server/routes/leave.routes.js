const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");

// Apply for leave
router.post("/apply", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(200).json({ message: "Leave request submitted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit leave." });
  }
});

// Get all leave requests (for HR)
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaves." });
  }
});

// Update leave status
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await Leave.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Leave status updated." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status." });
  }
});

module.exports = router;
