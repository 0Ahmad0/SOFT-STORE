require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const rateLimit = require('express-rate-limit')
const multer = require('multer')
const connectDB = require('./config/db')
const Admin = require('./models/Admin')

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req) => req.headers.authorization?.startsWith('Bearer '),
  message: { message: 'طلبات كثيرة جداً، الرجاء المحاولة لاحقاً' },
})
app.use('/api/', limiter)

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/categories', require('./routes/categories'))
app.use('/api/contact', require('./routes/contacts'))
app.use('/api/brand', require('./routes/brand'))
app.use('/api/upload', require('./routes/upload'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Seed default admin on first run
const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments()
    if (count === 0) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@softstore.com',
        password: process.env.ADMIN_PASSWORD || 'admin123456',
        name: 'مدير المتجر',
      })
      console.log('Default admin created successfully')
    }
  } catch (error) {
    console.error('Error seeding admin:', error.message)
  }
}

seedAdmin()

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `خطأ في رفع الملف: ${err.message}` })
  }
  if (err.message && err.message.includes('يُسمح فقط')) {
    return res.status(400).json({ message: err.message })
  }
  console.error(err.stack)
  res.status(500).json({ message: 'خطأ داخلي في الخادم' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
