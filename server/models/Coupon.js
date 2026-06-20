const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['percent', 'flat'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      default: 0,        // order subtotal must be >= this to use the coupon
    },
    maxDiscount: {
      type: Number,
      default: null,      // cap for percent-type discounts, null = uncapped
    },
    usageLimit: {
      type: Number,
      default: null,       // total times this code can be used, null = unlimited
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    perUserLimit: {
      type: Number,
      default: 1,           // how many times a single user can use this code
    },
    expiresAt: {
      type: Date,
      default: null,        // null = never expires
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

// Helper: is this coupon currently usable at all (ignoring per-user/order checks)
couponSchema.methods.isCurrentlyValid = function () {
  if (!this.isActive) return { valid: false, message: 'This coupon is no longer active' }
  if (this.expiresAt && new Date() > this.expiresAt) return { valid: false, message: 'This coupon has expired' }
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) return { valid: false, message: 'This coupon has reached its usage limit' }
  return { valid: true }
}

module.exports = mongoose.model('Coupon', couponSchema)
