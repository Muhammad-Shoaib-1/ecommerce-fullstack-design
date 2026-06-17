const Product = require('../models/Product')

// @route  GET /api/products
// @access Public
// Query params: category, minPrice, maxPrice, condition, search, page, limit, featured, deals
const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      condition,
      search,
      featured,
      deals,
      page = 1,
      limit = 12,
    } = req.query

    const filter = {}

    if (category) filter.category = category
    if (condition) filter.condition = condition
    if (featured === 'true') filter.isFeatured = true
    if (deals === 'true') filter.isDeals = true

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    if (search) {
      filter.$text = { $search: search }
    }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Product.countDocuments(filter)

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug')

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, product })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
