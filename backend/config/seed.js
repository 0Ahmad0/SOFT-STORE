require('dotenv').config()
const connectDB = require('./db')
const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')

const seedData = async () => {
  await connectDB()

  await Category.deleteMany({})
  await Product.deleteMany({})
  await Brand.deleteMany({})

  const categories = await Category.insertMany([
    { name: 'لانجري', order: 1 },
    { name: 'ألبسة داخلية', order: 2 },
    { name: 'حجابات', order: 3 },
    { name: 'أطقم صلاة', order: 4 },
    { name: 'جوارب', order: 5 },
    { name: 'بشاكير ومناشف', order: 6 },
    { name: 'تجهيز عرائس', order: 7 },
  ])

  await Product.insertMany([
    {
      name: 'طقم لانجري حرير فاخر',
      category: 'لانجري',
      price: 'حسب القياس',
      description: 'طقم لانجري من الحرير الطبيعي عالي الجودة، مريح وأنيق.',
      image: 'https://images.unsplash.com/photo-1770294758971-44fa1eae61a3?auto=format&fit=crop&q=85&w=600',
      badge: 'أكثر مبيعاً',
      featured: true,
    },
    {
      name: 'حجاب شيفون كويتي أنيق',
      category: 'حجابات',
      price: 'متوفر بألوان متعددة',
      description: 'حجاب شيفون كويتي ناعم وشفاف بتصاميم عصرية.',
      image: 'https://images.unsplash.com/photo-1550546094-9835463f9f71?auto=format&fit=crop&q=85&w=600',
      badge: 'جديد',
      featured: true,
    },
    {
      name: 'روب عروس مطرز بالدانتيل',
      category: 'تجهيز عرائس',
      price: 'تشكيلة خاصة',
      description: 'روب عروس فاخر مطرز يدوياً بأجمل رسومات الدانتيل.',
      image: 'https://images.unsplash.com/photo-1521467752200-3bccf80f16ed?auto=format&fit=crop&q=85&w=600',
      badge: 'طقم العروس',
      featured: true,
    },
    {
      name: 'منشفة وبشكير قطن مصري 100%',
      category: 'بشاكير ومناشف',
      price: 'نعومة فائقة',
      description: 'مناشف قطن مصري 100% ناعمة وماصة للماء.',
      image: 'https://images.unsplash.com/photo-1638232928539-6e91c47ddec5?auto=format&fit=crop&q=85&w=600',
      featured: false,
    },
    {
      name: 'أطقم صلاة مريحة ومطرزة',
      category: 'أطقم صلاة',
      price: 'قماش بارد',
      description: 'أطقم صلاة بقماش بارد ومريح مع تطريز أنيق.',
      image: 'https://images.unsplash.com/photo-1550546094-9835463f9f71?auto=format&fit=crop&q=85&w=600',
      featured: false,
    },
    {
      name: 'جوارب قطنية مريحة ناعمة',
      category: 'جوارب',
      price: 'أعلى جودة',
      description: 'جوارب قطنية مريحة وناعمة تدوم طويلاً.',
      image: 'https://images.unsplash.com/photo-1615486364462-ef6363adbc18?auto=format&fit=crop&q=85&w=600',
      featured: false,
    },
  ])

  await Brand.create({
    name: 'SOFT',
    nameAr: 'سوفت',
    description: 'متجر سوفت للألبسة الداخلية، اللانجري، الحجابات، أطقم الصلاة، البشاكير، وتجهيز العرائس بأرقى الخامات وأفضل الأسعار.',
    phone: '0962226361',
    phoneDisplay: '0962 226 361',
    whatsapp: '963962226361',
    instagram: 'https://instagram.com/soft.boutique',
    facebook: 'https://facebook.com/soft.boutique',
    address: 'سوريا — متجر سوفت الفاخر',
    hours: 'السبت – الخميس | 10:00 صباحاً – 10:00 مساءً',
    heroTitle: 'أناقتكِ وراحتكِ تبدأ من سوفت.',
    stats: [
      { label: 'منتج فاخر', value: '+500' },
      { label: 'أقسام متكاملة', value: '8' },
      { label: 'خامات أصلية', value: '100%' },
    ],
  })

  console.log('Seed data inserted successfully!')
  process.exit(0)
}

seedData()
