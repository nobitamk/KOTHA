const express = require("express");
const router = express.Router();
const CmsContent = require("../models/CmsContent");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "Uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get("/:page", async (req, res) => {
  try {
    const contents = await CmsContent.find({ page: req.params.page });
    res.status(200).json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { page, section, type } = req.body;
    let value = req.body.value;
    if (type === "json" && typeof value === "string") {
      value = JSON.parse(value);
    }
    if (req.file) {
      value = Array.isArray(value) ? value : [value || {}];
      value = value.map((item) => ({ ...item, image: `/Uploads/${req.file.filename}` }));
    }
    const existing = await CmsContent.findOne({ page, section });

    if (existing) {
      if (type === "json" && Array.isArray(value)) {
        existing.value = Array.isArray(existing.value)
          ? [...existing.value, ...value].filter(
              (item, index, self) => index === self.findIndex((t) => t.id === item.id || t.title === item.title)
            )
          : value;
      } else {
        existing.value = value;
      }
      existing.updatedAt = new Date();
      await existing.save();
      res.status(200).json(existing);
    } else {
      const content = new CmsContent({ page, section, type, value });
      await content.save();
      res.status(201).json(content);
    }
  } catch (err) {
    console.error("Error saving CMS entry:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CmsContent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Content deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;