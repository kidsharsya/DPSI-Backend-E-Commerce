// routes/shippers.js
const express = require('express');
const router = express.Router();
const Shipper = require('../models/shipper');

// GET all shippers
router.get('/', async (req, res) => {
  try {
    const shippers = await Shipper.findAll();
    res.json(shippers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single shipper by ID
router.get('/:id', async (req, res) => {
  try {
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      res.json(shipper);
    } else {
      res.status(404).json({ error: 'Shipper not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new shipper
router.post('/', async (req, res) => {
  try {
    const { shipperName, phone } = req.body;
    const newShipper = await Shipper.create({ shipperName, phone });
    res.status(201).json(newShipper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing shipper
router.put('/:id', async (req, res) => {
  try {
    const { shipperName, phone } = req.body;
    const [updated] = await Shipper.update(
      { shipperName, phone },
      {
        where: { shipperID: req.params.id },
      }
    );

    if (updated) {
      const updatedShipper = await Shipper.findByPk(req.params.id);
      res.status(200).json(updatedShipper);
    } else {
      res.status(404).json({ error: 'Shipper not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a shipper
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Shipper.destroy({
      where: { shipperID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Shipper not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
