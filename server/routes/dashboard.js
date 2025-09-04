const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard");

// GET stats
router.get("/stats", async (req, res) => {
  try {
    let stats = await Dashboard.findOne();
    if (!stats) stats = await Dashboard.create({ employees: 0, interns: 0, projects: 0 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

// POST stats (update)
router.post("/stats", async (req, res) => {
  const { employees, interns, projects } = req.body;
  try {
    let stats = await Dashboard.findOne();
    if (!stats) stats = new Dashboard();
    stats.employees = employees;
    stats.interns = interns;
    stats.projects = projects;
    await stats.save();
    res.json({ message: "Stats updated successfully", stats });
  } catch (err) {
    res.status(500).json({ message: "Error updating stats" });
  }
});

module.exports = router;
