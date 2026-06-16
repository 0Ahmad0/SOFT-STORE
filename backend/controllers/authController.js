const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان' })
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) {
      return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' })
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message })
  }
}

exports.verify = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    if (!admin) {
      return res.status(404).json({ message: 'المستخدم غير موجود' })
    }
    res.json({ admin })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم', error: error.message })
  }
}
