const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const CmsContent = require("./models/CmsContent");
const User = require("./models/user"); // Make sure the filename and case match exactly

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 MongoDB Connected. Seeding CMS + Users...");

    // 1. 🔁 Clear existing CMS content (optional)
    await CmsContent.deleteMany({});

    const seedData = [
      {
        page: "home",
        section: "heroTitle",
        type: "text",
        value: "Empowering Ideas with Impact",
        description: "Hero title on homepage",
        order: 1,
      },
      {
        page: "home",
        section: "heroSubtitle",
        type: "text",
        value: "We design, develop, and deliver digital excellence.",
        description: "Hero subtitle on homepage",
        order: 2,
      },
      {
        page: "home",
        section: "projectsCompleted",
        type: "text",
        value: "37",
        description: "Stats - projects completed",
      },
      {
        page: "home",
        section: "clientsOnboarded",
        type: "text",
        value: "12",
        description: "Stats - clients onboarded",
      },
      {
        page: "home",
        section: "internsPromoted",
        type: "text",
        value: "5",
        description: "Stats - interns promoted",
      },
      {
        page: "home",
        section: "uptime",
        type: "text",
        value: "99.98%",
        description: "Stats - uptime",
      },
    ];

    await CmsContent.insertMany(seedData);
    console.log("✅ CMS data seeded!");

    // 2. 🎯 Add Career page data
    await CmsContent.deleteMany({ page: "career" });

    await CmsContent.create({
      page: "career",
      section: "jobList",
      type: "json",
      value: [
        { id: 1, title: "React Developer", location: "Remote", type: "Full-time" },
        { id: 2, title: "UI/UX Designer", location: "Hyderabad", type: "Internship" },
        { id: 3, title: "Marketing Intern", location: "Bangalore", type: "Part-time" },
      ],
    });

    console.log("✅ Career page CMS seeded");

    // 3. 👤 Seed Admin Panel Users
    await User.deleteMany({}); // clear old users

    const users = [
      {
        name: "Admin User",
        email: "admin@infoyieldx.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
      {
        name: "HR Manager",
        email: "hr@infoyieldx.com",
        password: await bcrypt.hash("hr123", 10),
        role: "hr",
      },
      {
        name: "Employee One",
        email: "employee@infoyieldx.com",
        password: await bcrypt.hash("emp123", 10),
        role: "employee",
      },
    ];

    await User.insertMany(users);
    console.log("✅ Admin panel users seeded!");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Failed to seed:", err);
    mongoose.disconnect();
  });
