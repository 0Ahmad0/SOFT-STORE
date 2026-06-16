const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'الاسم مطلوب'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'رقم الموبايل مطلوب'],
      trim: true,
    },
    msg: {
      type: String,
      required: [true, 'الرسالة مطلوبة'],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Contact', contactSchema)
