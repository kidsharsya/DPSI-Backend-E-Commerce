// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    const newCategory = await Category.create({ categoryName, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT to update an existing category
router.put('/:id', async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    const [updated] = await Category.update(
      { categoryName, description },
      {
        where: { categoryID: req.params.id },
      }
    );

    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { categoryID: req.params.id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
