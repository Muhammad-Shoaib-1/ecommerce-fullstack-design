const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        isMain: { type: Boolean, default: false },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    orders: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    condition: {
      type: String,
      enum: ['Brand new', 'Refurbished', 'Used'],
      default: 'Brand new',
    },
    shipping: {
      type: String,
      default: 'Free Shipping',
    },
    // For product details page
    specs: [
      {
        label: String,
        value: String,
      },
    ],
    features: [String],
    seller: {
      name: { type: String, default: 'Seller' },
      company: { type: String, default: '' },
      country: { type: String, default: '' },
      verified: { type: Boolean, default: false },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeals: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: String,
      default: null, // e.g. "-25%"
    },
  },
  { timestamps: true }
)

// Text index for search
productSchema.index({ name: 'text', description: 'text' })

module.exports = mongoose.model('Product', productSchema)
