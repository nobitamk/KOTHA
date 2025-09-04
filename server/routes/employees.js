// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create employee
router.post('/', async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
