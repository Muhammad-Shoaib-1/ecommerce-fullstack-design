const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Helper: get or create user's cart
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product')
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] })
  }
  return cart
}

// @route  GET /api/cart
// @access Private
const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id)
    res.json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  POST /api/cart
// @access Private
// Body: { productId, qty }
const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    const cart = await getOrCreateCart(req.user._id)

    // Check if item already in cart (and not saved for later)
    const existingIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId && !item.savedForLater
    )

    if (existingIndex >= 0) {
      // Increase qty
      cart.items[existingIndex].qty += Number(qty)
    } else {
      cart.items.push({ product: productId, qty: Number(qty), savedForLater: false })
    }

    await cart.save()
    await cart.populate('items.product')

    res.json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/cart/:itemId
// @access Private
// Body: { qty }
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body
    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    const item = cart.items.id(req.params.itemId)
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' })
    }

    item.qty = Number(qty)
    await cart.save()
    await cart.populate('items.product')

    res.json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  DELETE /api/cart/:itemId
// @access Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId)
    await cart.save()
    await cart.populate('items.product')

    res.json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/cart/:itemId/save
// @access Private
// Toggles savedForLater flag
const saveForLater = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' })
    }

    const item = cart.items.id(req.params.itemId)
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' })
    }

    item.savedForLater = !item.savedForLater
    await cart.save()
    await cart.populate('items.product')

    res.json({ success: true, cart })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  DELETE /api/cart
// @access Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (cart) {
      cart.items = []
      await cart.save()
    }
    res.json({ success: true, message: 'Cart cleared' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, saveForLater, clearCart }
