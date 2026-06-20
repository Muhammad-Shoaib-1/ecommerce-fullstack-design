const User    = require('../models/User')
const Product = require('../models/Product')
const Order   = require('../models/Order')
const Category = require('../models/Category')

// @route  GET /api/admin/stats
// @access Private/Admin
const getStats = async (req, res) => {
  try {
    const [totalOrders, totalProducts, totalUsers, totalCategories, orders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
      Category.countDocuments(),
      Order.find().select('totalPrice status createdAt'),
    ])

    const revenue       = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.totalPrice, 0)
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const delivered     = orders.filter(o => o.status === 'delivered').length

    // Last 7 days revenue
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentOrders = orders.filter(o => new Date(o.createdAt) >= sevenDaysAgo && o.status !== 'cancelled')
    const recentRevenue = recentOrders.reduce((s, o) => s + o.totalPrice, 0)

    // Revenue by day (last 7)
    const dailyRevenue = []
    for (let i = 6; i >= 0; i--) {
      const date  = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayOrders = orders.filter(o => {
        const d = new Date(o.createdAt).toISOString().split('T')[0]
        return d === dateStr && o.status !== 'cancelled'
      })
      dailyRevenue.push({ date: dateStr, revenue: dayOrders.reduce((s, o) => s + o.totalPrice, 0), orders: dayOrders.length })
    }

    res.json({
      success: true,
      stats: {
        totalOrders, totalProducts, totalUsers, totalCategories,
        revenue: parseFloat(revenue.toFixed(2)),
        pendingOrders, delivered,
        recentRevenue: parseFloat(recentRevenue.toFixed(2)),
        dailyRevenue,
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  GET /api/admin/users
// @access Private/Admin
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip  = (Number(page) - 1) * Number(limit)
    const total = await User.countDocuments()
    const users = await User.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
    res.json({ success: true, total, users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  PUT /api/admin/users/:id/role
// @access Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @route  DELETE /api/admin/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    res.json({ success: true, message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getStats, getUsers, updateUserRole, deleteUser }
