// routes/orderDetails.js
const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail');

// GET all order details
router.get('/', async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single order detail by ID
router.get('/:id', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      res.json(orderDetail);
    } else {
      res.status(404).json({ error: 'OrderDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new order detail
router.post('/', async (req, res) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const newOrderDetail = await OrderDetail.create({ orderID, productID, quantity });
    res.status(201).json(newOrderDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing order detail
router.put('/:id', async (req, res) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const [updated] = await OrderDetail.update(
      { orderID, productID, quantity },
      {
        where: { orderDetailID: req.params.id },
      }
    );

    if (updated) {
      const updatedOrderDetail = await OrderDetail.findByPk(req.params.id);
      res.status(200).json(updatedOrderDetail);
    } else {
      res.status(404).json({ error: 'OrderDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an order detail
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await OrderDetail.destroy({
      where: { orderDetailID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'OrderDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
