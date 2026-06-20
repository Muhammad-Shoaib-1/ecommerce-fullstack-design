const Coupon = require('../models/Coupon')
const Order  = require('../models/Order')

// Shared validation logic used by both validate + order placement
const validateCouponForUser = async (code, userId, subtotal) => {
  const coupon = await Coupon.findOne({ code: code.trim().toUpperCase() })
  if (!coupon) return { valid: false, message: 'Invalid coupon code' }

  const baseCheck = coupon.isCurrentlyValid()
  if (!baseCheck.valid) return baseCheck

  if (subtotal < coupon.minOrderAmount) {
    return { valid: false, message: `Minimum order of $${coupon.minOrderAmount.toFixed(2)} required for this coupon` }
  }

  // Per-user usage check
  if (coupon.perUserLimit !== null) {
    const usedByUser = await Order.countDocuments({
      user: userId,
      couponCode: coupon.code,
      status: { $ne: 'cancelled' },
    })
    if (usedByUser >= coupon.perUserLimit) {
      return { valid: false, message: 'You have already used this coupon' }
    }
  }

  // Calculate discount
  let discount = coupon.type === 'percent'
    ? (subtotal * coupon.value) / 100
    : coupon.value

  if (coupon.type === 'percent' && coupon.maxDiscount !== null) {
    discount = Math.min(discount, coupon.maxDiscount)
  }
  discount = Math.min(discount, subtotal) // never discount more than the subtotal
  discount = parseFloat(discount.toFixed(2))

  return { valid: true, coupon, discount }
}

// @route  POST /api/coupons/validate
// @access Private
// Body: { code, subtotal }
const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body
    if (!code) return res.status(400).json({ success: false, message: 'Coupon code is required' })
    if (subtotal === undefined) return res.status(400).json({ success: false, message: 'Subtotal is required' })

    const result = await validateCouponForUser(code, req.user._id, Number(subtotal))

    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message })
    }

    res.json({
      success: true,
      coupon: {
        code: result.coupon.code,
        type: result.coupon.type,
        value: result.coupon.value,
        description: result.coupon.description,
      },
      discount: result.discount,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── ADMIN ──────────────────────────────────────────────────

// @route  GET /api/admin/coupons
// @access Private/Admin
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 })
    res.json({ success: true, coupons })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  POST /api/admin/coupons
// @access Private/Admin
const createCoupon = async (req, res) => {
  try {
    const { code, type, value, minOrderAmount, maxDiscount, usageLimit, perUserLimit, expiresAt, description } = req.body

    if (!code || !type || value === undefined) {
      return res.status(400).json({ success: false, message: 'code, type and value are required' })
    }
    if (!['percent', 'flat'].includes(type)) {
      return res.status(400).json({ success: false, message: 'type must be "percent" or "flat"' })
    }
    if (type === 'percent' && value > 100) {
      return res.status(400).json({ success: false, message: 'Percent discount cannot exceed 100' })
    }

    const exists = await Coupon.findOne({ code: code.trim().toUpperCase() })
    if (exists) return res.status(400).json({ success: false, message: 'A coupon with this code already exists' })

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      type,
      value,
      minOrderAmount: minOrderAmount || 0,
      maxDiscount: maxDiscount || null,
      usageLimit: usageLimit || null,
      perUserLimit: perUserLimit ?? 1,
      expiresAt: expiresAt || null,
      description: description || '',
    })

    res.status(201).json({ success: true, coupon })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/admin/coupons/:id
// @access Private/Admin
const updateCoupon = async (req, res) => {
  try {
    const updates = { ...req.body }
    if (updates.code) updates.code = updates.code.trim().toUpperCase()

    const coupon = await Coupon.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' })

    res.json({ success: true, coupon })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  DELETE /api/admin/coupons/:id
// @access Private/Admin
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id)
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' })
    res.json({ success: true, message: 'Coupon deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { validateCoupon, validateCouponForUser, getCoupons, createCoupon, updateCoupon, deleteCoupon }
