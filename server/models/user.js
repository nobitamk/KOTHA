const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "hr", "employee"],
    default: "employee"
  },

  profile: {
    photo: { type: String, default: "" },        // Employee profile picture
    bio: { type: String, default: "" },
    skills: [{ type: String }],
    projects: [{ type: String }],
    resume: { type: String, default: "" }         // Resume file path
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

