const express = require('express')
const router = express.Router()
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  saveForLater,
  clearCart,
} = require('../controllers/cartController')
const { protect } = require('../middleware/authMiddleware')

// All cart routes are protected
router.use(protect)

router.get('/', getCart)
router.post('/', addToCart)
router.put('/:itemId', updateCartItem)
router.delete('/:itemId', removeFromCart)
router.put('/:itemId/save', saveForLater)
router.delete('/', clearCart)

module.exports = router
