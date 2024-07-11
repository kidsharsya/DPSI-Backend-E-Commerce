// routes/customers.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new customer
router.post('/', async (req, res) => {
  try {
    const { customerName, contactName, address, city, postalCode, country } = req.body;
    const newCustomer = await Customer.create({ customerName, contactName, address, city, postalCode, country });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing customer
router.put('/:id', async (req, res) => {
  try {
    const { customerName, contactName, address, city, postalCode, country } = req.body;
    const [updated] = await Customer.update(
      { customerName, contactName, address, city, postalCode, country },
      {
        where: { customerID: req.params.id },
      }
    );

    if (updated) {
      const updatedCustomer = await Customer.findByPk(req.params.id);
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a customer
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { customerID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
