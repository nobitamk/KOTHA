const express = require('express');
const cors = require('cors');
const employeesRouter = require('./routes/employees');
const contactRouter = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/employees', employeesRouter);
app.use('/api/contact', contactRouter);
app.use("/api/contact", require("./routes/contact"));


// --- Admin Login Route ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Simple hardcoded check (replace with real DB/auth in production)
  if (username === "admin" && password === "admin123") {
    // Example token (replace with JWT in production)
    res.json({ token: "example_admin_token" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// --- Admin Dashboard Route ---
app.get('/api/admin/dashboard', (req, res) => {
  // Example: return some dashboard stats or a welcome message
  res.json({
    message: "Welcome to the Admin Dashboard!",
    stats: {
      users: 120,
      employees: 15,
      messages: 8
    }
  });
});

// --- Add Employee (Admin) Route ---
app.post('/api/admin/employees', (req, res) => {
  // You can delegate to employeesRouter or handle here
  // For now, just a placeholder
  res.json({ message: "Add employee endpoint (implement logic)" });
});

// --- View Employees (Admin) Route ---
app.get('/api/admin/employees', (req, res) => {
  // You can delegate to employeesRouter or handle here
  // For now, just a placeholder
  res.json({ message: "View employees endpoint (implement logic)" });
});

app.get('/', (req, res) => {
  res.send('InfoYieldX Admin API Running');
});

module.exports = app;