const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },        // snapshot at time of purchase
  image: { type: String, required: true },
  price: { type: Number, required: true },        // price at purchase time
  qty: { type: Number, required: true, min: 1 },
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],

    shippingAddress: {
      fullName:  { type: String, required: true },
      phone:     { type: String, required: true },
      address:   { type: String, required: true },
      city:      { type: String, required: true },
      state:     { type: String, required: true },
      zipCode:   { type: String, required: true },
      country:   { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ['cod', 'card', 'paypal'],
      default: 'cod',
    },

    // Price breakdown
    itemsPrice:    { type: Number, required: true },  // subtotal
    shippingPrice: { type: Number, default: 0 },
    taxPrice:      { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 },
    couponCode:    { type: String, default: null },
    totalPrice:    { type: Number, required: true },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    isPaid:     { type: Boolean, default: false },
    paidAt:     { type: Date },
    isDelivered:{ type: Boolean, default: false },
    deliveredAt:{ type: Date },

    trackingNumber: { type: String, default: null },
    notes:          { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
