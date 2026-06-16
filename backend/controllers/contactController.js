const Contact = require('../models/Contact')

exports.getAll = async (req, res) => {
  try {
    const { read } = req.query
    const filter = {}
    if (read !== undefined) filter.read = read === 'true'
    const messages = await Contact.find(filter).sort({ createdAt: -1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في جلب الرسائل', error: error.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { name, phone, msg } = req.body
    if (!name || !phone || !msg) {
      return res.status(400).json({ message: 'جميع الحقول مطلوبة' })
    }
    const contact = await Contact.create({ name, phone, msg })
    res.status(201).json({ message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً', contact })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ message: messages.join('، ') })
    }
    res.status(500).json({ message: 'خطأ في إرسال الرسالة', error: error.message })
  }
}

exports.markRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    if (!contact) {
      return res.status(404).json({ message: 'الرسالة غير موجودة' })
    }
    res.json(contact)
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تحديث الرسالة', error: error.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: 'الرسالة غير موجودة' })
    }
    res.json({ message: 'تم حذف الرسالة بنجاح' })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في حذف الرسالة', error: error.message })
  }
}
