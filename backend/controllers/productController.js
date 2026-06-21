const Product = require('../models/Product')

exports.getAll = async (req, res) => {
  try {
    const { category, featured, active } = req.query
    const filter = {}
    if (category) filter.category = category
    if (featured) filter.featured = featured === 'true'
    if (active === 'all') {
      // show all (admin)
    } else if (active !== undefined) {
      filter.active = active === 'true'
    } else {
      filter.active = true
    }

    const products = await Product.find(filter).sort({ order: 1, createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب المنتجات', error: error.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب المنتج', error: error.message })
  }
}

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ message: messages.join('، ') })
    }
    res.status(500).json({ message: 'خطأ في إنشاء المنتج', error: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' })
    }
    res.json(product)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ message: messages.join('، ') })
    }
    res.status(500).json({ message: 'خطأ في تحديث المنتج', error: error.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' })
    }
    res.json({ message: 'تم حذف المنتج بنجاح' })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في حذف المنتج', error: error.message })
  }
}
