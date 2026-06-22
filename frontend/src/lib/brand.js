const API_ORIGIN = import.meta.env.VITE_API_URL || 'https://soft-store.onrender.com'
const API_BASE = `${API_ORIGIN}/api`

export const API = {
  products: `${API_BASE}/products`,
  categories: `${API_BASE}/categories`,
  contact: `${API_BASE}/contact`,
  brand: `${API_BASE}/brand`,
  upload: `${API_BASE}/upload`,
  auth: `${API_BASE}/auth`,
}

export const assetUrl = (url) => {
  if (!url || /^(https?:|data:|blob:)/.test(url)) return url
  return `${API_ORIGIN}${url}`
}

export const imageUrl = (url, width = 900) => {
  const src = assetUrl(url)
  if (!src?.includes('res.cloudinary.com') || src.includes('/f_auto,')) return src
  return src.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`)
}

export const cleanPhone = (value) => String(value || '').replace(/\D/g, '')
export const socialUrl = (value, fallback, host = '') => {
  if (!value) return fallback
  if (/^https?:\/\//i.test(value)) return value
  const clean = value.replace(/^@/, '')
  if (clean.includes('.')) return `https://${clean}`
  return host ? `https://${host}/${clean}` : `https://${clean}`
}

export const BRAND = {
  name: 'SOFT',
  nameAr: 'سوفت',
  description:
    'متجر سوفت للألبسة الداخلية، اللانجري، الحجابات، أطقم الصلاة، البشاكير، وتجهيز العرائس بأرقى الخامات وأفضل الأسعار.',
  phone: '0962226361',
  phoneDisplay: '0962 226 361',
  whatsapp: '963962226361',
  instagram: 'https://instagram.com/soft.boutique',
  facebook: 'https://facebook.com/soft.boutique',
  managerName: 'السيد أسامة النقاوة',
  managerTitle: 'بإدارة',
  managerImage: '',
  address: 'ميسلون، درعا، سوريا',
  mapQuery: '32.628474,36.103253',
  mapLabel: 'SOFT - سوفت',
  hours: 'السبت – الخميس | 10:00 صباحاً – 10:00 مساءً',
}

export const PLACEHOLDER_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1750064144361-bc7d12be7a98?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
  product:
    'https://images.unsplash.com/photo-1770294758971-44fa1eae61a3?auto=format&fit=crop&q=85&w=600',
}

export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'طقم لانجري حرير فاخر',
    category: 'لانجري',
    price: 'حسب القياس',
    image:
      'https://images.unsplash.com/photo-1770294758971-44fa1eae61a3?auto=format&fit=crop&q=85&w=600',
    badge: 'أكثر مبيعاً',
  },
  {
    id: 2,
    name: 'حجاب شيفون كويتي أنيق',
    category: 'حجابات',
    price: 'متوفر بألوان متعددة',
    image:
      'https://images.unsplash.com/photo-1550546094-9835463f9f71?auto=format&fit=crop&q=85&w=600',
    badge: 'جديد',
  },
  {
    id: 3,
    name: 'روب عروس مطرز بالدانتيل',
    category: 'تجهيز عرائس',
    price: 'تشكيلة خاصة',
    image:
      'https://images.unsplash.com/photo-1521467752200-3bccf80f16ed?auto=format&fit=crop&q=85&w=600',
    badge: 'طقم العروس',
  },
  {
    id: 4,
    name: 'منشفة وبشكير قطن مصري 100%',
    category: 'بشاكير ومناشف',
    price: 'نعومة فائقة',
    image:
      'https://images.unsplash.com/photo-1638232928539-6e91c47ddec5?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 5,
    name: 'أطقم صلاة مريحة ومطرزة',
    category: 'أطقم صلاة',
    price: 'قماش بارد',
    image:
      'https://images.unsplash.com/photo-1550546094-9835463f9f71?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 6,
    name: 'جوارب قطنية مريحة ناعمة',
    category: 'جوارب',
    price: 'أعلى جودة',
    image:
      'https://images.unsplash.com/photo-1615486364462-ef6363adbc18?auto=format&fit=crop&q=85&w=600',
  },
]
