// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const { productName, supplierID, categoryID, unit, price } = req.body;
    const newProduct = await Product.create({ productName, supplierID, categoryID, unit, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing product
router.put('/:id', async (req, res) => {
  try {
    const { productName, supplierID, categoryID, unit, price } = req.body;
    const [updated] = await Product.update(
      { productName, supplierID, categoryID, unit, price },
      {
        where: { productID: req.params.id },
      }
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { productID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
