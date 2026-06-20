const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Coupon = require('../models/Coupon')
const { validateCouponForUser } = require('./couponController')

// ─── helpers ──────────────────────────────────────────────────
const calcPrices = (items, discount = 0) => {
  const itemsPrice     = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shippingPrice  = itemsPrice > 100 ? 0 : 10          // free shipping over $100
  const taxableAmount  = Math.max(itemsPrice - discount, 0)
  const taxRate        = 0.08                                 // 8% tax, applied after discount
  const taxPrice       = parseFloat((taxableAmount * taxRate).toFixed(2))
  const totalPrice     = parseFloat((taxableAmount + shippingPrice + taxPrice).toFixed(2))
  return {
    itemsPrice: parseFloat(itemsPrice.toFixed(2)),
    shippingPrice,
    taxPrice,
    discountPrice: parseFloat(discount.toFixed(2)),
    totalPrice,
  }
}

// @route  POST /api/orders
// @access Private
const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = 'cod', notes = '', couponCode = null } = req.body

    // Validate shipping address fields
    const required = ['fullName', 'phone', 'address', 'city', 'state', 'zipCode', 'country']
    for (const field of required) {
      if (!shippingAddress?.[field]) {
        return res.status(400).json({ success: false, message: `Shipping address: '${field}' is required` })
      }
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' })
    }

    const activeItems = cart.items.filter(i => !i.savedForLater)
    if (activeItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No active items in cart' })
    }

    // Build order items — snapshot product data so it never changes
    const orderItems = activeItems.map(item => {
      const product = item.product
      const mainImg = product.images?.find(i => i.isMain)?.url || product.images?.[0]?.url || ''
      return {
        product: product._id,
        name:    product.name,
        image:   mainImg,
        price:   product.price,
        qty:     item.qty,
      }
    })

    // Check stock for each item
    for (const item of orderItems) {
      const product = await Product.findById(item.product)
      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          message: `"${product.name}" only has ${product.stock} units in stock`,
        })
      }
    }

    const itemsPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)

    // Re-validate coupon server-side — never trust a discount amount sent from the client
    let discount = 0
    let appliedCouponDoc = null
    if (couponCode) {
      const result = await validateCouponForUser(couponCode, req.user._id, itemsPrice)
      if (!result.valid) {
        return res.status(400).json({ success: false, message: result.message })
      }
      discount = result.discount
      appliedCouponDoc = result.coupon
    }

    const { shippingPrice, taxPrice, discountPrice, totalPrice } = calcPrices(orderItems, discount)

    // Create the order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: parseFloat(itemsPrice.toFixed(2)),
      shippingPrice,
      taxPrice,
      discountPrice,
      couponCode: appliedCouponDoc ? appliedCouponDoc.code : null,
      totalPrice,
      notes,
    })

    // Increment coupon usage count
    if (appliedCouponDoc) {
      await Coupon.findByIdAndUpdate(appliedCouponDoc._id, { $inc: { usedCount: 1 } })
    }

    // Deduct stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty, orders: item.qty },
      })
    }

    // Clear active cart items (keep saved-for-later)
    cart.items = cart.items.filter(i => i.savedForLater)
    await cart.save()

    res.status(201).json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  GET /api/orders
// @access Private
const getMyOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip  = (Number(page) - 1) * Number(limit)
    const total = await Order.countDocuments({ user: req.user._id })

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v')

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      orders,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  GET /api/orders/:id
// @access Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Only owner or admin can view
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/orders/:id/cancel
// @access Private
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' })
    }

    if (['shipped', 'delivered'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel a shipped or delivered order' })
    }

    order.status = 'cancelled'
    await order.save()

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.qty, orders: -item.qty },
      })
    }

    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── ADMIN ONLY ───────────────────────────────────────────────

// @route  GET /api/orders/admin/all
// @access Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    const filter = status ? { status } : {}
    const skip   = (Number(page) - 1) * Number(limit)
    const total  = await Order.countDocuments(filter)

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('user', 'name email')

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / Number(limit)), orders })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/orders/:id/status
// @access Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    order.status = status
    if (trackingNumber) order.trackingNumber = trackingNumber
    if (status === 'delivered') {
      order.isDelivered  = true
      order.deliveredAt  = Date.now()
    }

    await order.save()
    res.json({ success: true, order })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { placeOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders, updateOrderStatus }
