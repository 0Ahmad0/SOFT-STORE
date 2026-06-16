const Brand = require('../models/Brand')

exports.get = async (req, res) => {
  try {
    let brand = await Brand.findOne()
    if (!brand) {
      brand = await Brand.create({})
    }
    res.json(brand)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب بيانات المتجر', error: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    let brand = await Brand.findOne()
    if (!brand) {
      brand = await Brand.create(req.body)
    } else {
      Object.assign(brand, req.body)
      await brand.save()
    }
    res.json(brand)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تحديث بيانات المتجر', error: error.message })
  }
}
