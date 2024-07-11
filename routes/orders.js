// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  try {
    const { customerID, employeeID, orderDate, shipperID } = req.body;
    const newOrder = await Order.create({ customerID, employeeID, orderDate, shipperID });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing order
router.put('/:id', async (req, res) => {
  try {
    const { customerID, employeeID, orderDate, shipperID } = req.body;
    const [updated] = await Order.update(
      { customerID, employeeID, orderDate, shipperID },
      {
        where: { orderID: req.params.id },
      }
    );

    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { orderID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
