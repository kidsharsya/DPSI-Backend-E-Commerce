// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new employee
router.post('/', async (req, res) => {
  try {
    const { lastName, firstName, birthDate, photo, notes } = req.body;
    const newEmployee = await Employee.create({ lastName, firstName, birthDate, photo, notes });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing employee
router.put('/:id', async (req, res) => {
  try {
    const { lastName, firstName, birthDate, photo, notes } = req.body;
    const [updated] = await Employee.update(
      { lastName, firstName, birthDate, photo, notes },
      {
        where: { employeeID: req.params.id },
      }
    );

    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { employeeID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
