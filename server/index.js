console.log("starting server...");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const adminUser = {
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 8), // password = admin123
};

// In-memory employee list
const employees = [];

// (Optional) Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, "secret_key");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const match = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ username }, "secret_key", { expiresIn: "2h" });
  res.json({ token });
});

// Add employee route (protected)
app.post("/api/employees", authMiddleware, (req, res) => {
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
  employees.push(newEmployee);
  res.json({ message: "Employee added", employee: newEmployee });
});

// Get all employees (protected)
app.get("/api/employees", authMiddleware, (req, res) => {
  res.json(employees);
});

app.listen(5000, () => {
  console.log("✅ Server is running at http://localhost:5000");
});