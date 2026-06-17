const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/cart', require('./routes/cart'))

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce API is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
