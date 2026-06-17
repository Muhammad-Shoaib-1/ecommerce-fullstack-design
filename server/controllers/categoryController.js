const Category = require('../models/Category')

// @route  GET /api/categories
// @access Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json({ success: true, categories })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  POST /api/categories
// @access Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, slug, image } = req.body
    const category = await Category.create({ name, slug, image })
    res.status(201).json({ success: true, category })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }
    res.json({ success: true, message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getCategories, createCategory, deleteCategory }
