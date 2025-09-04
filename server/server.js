const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/employee-profile", require("./routes/employeeProfile.routes"));

app.use("/Uploads", express.static("Uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // For resume/static file access

// MongoDB Connection
console.log("🔍 Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });

// In-memory admin for testing login (Optional legacy fallback)
const adminUser = {
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 8),
};

// In-memory employee list (optional/testing purpose)
const inMemoryEmployees = [];

// JWT Auth Middleware (used for /api/employees-inmem)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Admin Login Endpoint (optional fallback for old login)
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const match = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// In-Memory Employee Management Routes (for testing)
app.post("/api/employees-inmem", authMiddleware, (req, res) => {
  const { name, role, email } = req.body;
  if (!name || !role || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEmployee = {
    id: Date.now(),
    name,
    role,
    email,
  };
  inMemoryEmployees.push(newEmployee);
  res.json({ message: "Employee added", employee: newEmployee });
});

app.get("/api/employees-inmem", authMiddleware, (req, res) => {
  res.json(inMemoryEmployees);
});

// ⬇️ Feature Route Imports
const dashboardRoutes = require("./routes/dashboard");
const contactRoutes = require("./routes/contact");
const userAuthRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/auth.routes");
const cmsRoutes = require("./routes/cms");
const employeeRoutes = require("./routes/employees");
const careerRoutes = require("./routes/career");
const employeeProfileRoutes = require("./routes/employeeProfile.routes");
const leaveRoutes = require("./routes/leave.routes");







// ⬇️ New Role-Based Admin Panel Routes
const userRoutes = require("./routes/user.routes");


// ⬇️ Use Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user-auth", userAuthRoutes);
app.use("/api/admin-auth", adminAuthRoutes); 
app.use("/api/cms", cmsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/employee-profile", employeeProfileRoutes);
app.use("/api/leave", leaveRoutes);





// ✅ New Additions
app.use("/api/users", userRoutes);


// Default Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Server is up and running!");
});
