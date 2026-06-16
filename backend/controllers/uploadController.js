exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'الرجاء اختيار صورة للرفع' })
    }
    const url = `/uploads/${req.file.filename}`
    res.json({ url, filename: req.file.filename })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في رفع الصورة', error: error.message })
  }
}
