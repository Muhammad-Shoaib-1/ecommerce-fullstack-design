const express = require('express')
const router  = express.Router()
const { getStats, getUsers, updateUserRole, deleteUser } = require('../controllers/adminController')
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController')
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController')
const { getCoupons, createCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.use(protect, adminOnly)

// Stats
router.get('/stats', getStats)

// Users
router.get('/users',              getUsers)
router.put('/users/:id/role',     updateUserRole)
router.delete('/users/:id',       deleteUser)

// Products (reuse existing controllers)
router.get('/products',           getProducts)
router.post('/products',          createProduct)
router.put('/products/:id',       updateProduct)
router.delete('/products/:id',    deleteProduct)

// Categories
router.get('/categories',         getCategories)
router.post('/categories',        createCategory)
router.delete('/categories/:id',  deleteCategory)

// Orders
router.get('/orders',             getAllOrders)
router.put('/orders/:id/status',  updateOrderStatus)

// Coupons
router.get('/coupons',            getCoupons)
router.post('/coupons',           createCoupon)
router.put('/coupons/:id',        updateCoupon)
router.delete('/coupons/:id',     deleteCoupon)

module.exports = router
