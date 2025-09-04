const mongoose = require("mongoose");

const cmsContentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["text", "html", "image", "video", "link", "file", "tags", "json"],
    default: "text",
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v) {
        if (this.page === "blog") {
          return (
            v &&
            typeof v === "object" &&
            !Array.isArray(v) &&
            v.title &&
            typeof v.title === "string" &&
            v.author &&
            typeof v.author === "string"
          );
        }
        if (this.page === "career" && this.section === "jobList") {
          return (
            v &&
            Array.isArray(v) &&
            v.every(
              (job) =>
                job &&
                typeof job === "object" &&
                job.title &&
                typeof job.title === "string" &&
                job.location &&
                typeof job.location === "string" &&
                job.type &&
                typeof job.type === "string"
            )
          );
        }
        if (this.page === "portfolio" && this.type === "json") {
          return (
            v &&
            typeof v === "object" &&
            !Array.isArray(v) &&
            v.title &&
            typeof v.title === "string"
          );
        }
        return v !== undefined && v !== null;
      },
      message: (props) =>
        props.path === "blog"
          ? "Value for blog must be an object with title and author"
          : props.path === "career"
          ? "Value for career jobList must be an array of jobs with title, location, and type"
          : props.path === "portfolio"
          ? "Value for portfolio must be an object with title"
          : "Value is required",
    },
  },
  altText: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
  createdBy: { type: String },
  updatedBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cmsContentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

cmsContentSchema.index({ section: "text", description: "text", "value.title": "text" });

module.exports = mongoose.model("CmsContent", cmsContentSchema);