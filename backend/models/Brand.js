const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'SOFT' },
    nameAr: { type: String, default: 'سوفت' },
    description: { type: String, default: '' },
    phone: { type: String, default: '' },
    phoneDisplay: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    address: { type: String, default: '' },
    hours: { type: String, default: '' },
    logo: { type: String, default: '' },
    storefront: { type: String, default: '' },
    heroTitle: { type: String, default: '' },
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    marqueeItems: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Brand', brandSchema)
