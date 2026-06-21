const Category = require('../models/Category')

exports.getAll = async (req, res) => {
  try {
    const { active } = req.query
    const filter = {}
    if (active === 'all') {
      // show all (admin)
    } else if (active !== undefined) {
      filter.active = active === 'true'
    } else {
      filter.active = true
    }
    const categories = await Category.find(filter).sort({ order: 1 })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب التصنيفات', error: error.message })
  }
}

exports.create = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json(category)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'هذا التصنيف موجود مسبقاً' })
    }
    res.status(500).json({ message: 'خطأ في إنشاء التصنيف', error: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!category) {
      return res.status(404).json({ message: 'التصنيف غير موجود' })
    }
    res.json(category)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'هذا التصنيف موجود مسبقاً' })
    }
    res.status(500).json({ message: 'خطأ في تحديث التصنيف', error: error.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'التصنيف غير موجود' })
    }
    res.json({ message: 'تم حذف التصنيف بنجاح' })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في حذف التصنيف', error: error.message })
  }
}
