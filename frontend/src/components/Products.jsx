import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, MessageCircle, X, PackageOpen } from 'lucide-react'
import { BRAND, API, SAMPLE_PRODUCTS, cleanPhone, imageUrl } from '../lib/brand'
import axios from 'axios'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('الكل')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [brand, setBrand] = useState(BRAND)
  const [products, setProducts] = useState(SAMPLE_PRODUCTS || [])
  const [categories, setCategories] = useState([
    'الكل',
    'لانجري',
    'ألبسة داخلية',
    'حجابات',
    'أطقم صلاة',
    'جوارب',
    'بشاكير ومناشف',
    'تجهيز عرائس',
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
    axios.get(API.brand).then((res) => setBrand({ ...BRAND, ...res.data })).catch(() => {})
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API.products)
      if (res.data && res.data.length > 0) {
        setProducts(res.data)
      }
    } catch {
      // fallback to sample products
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API.categories)
      if (res.data && res.data.length > 0) {
        setCategories(['الكل', ...res.data.map((c) => c.name)])
      }
    } catch {
      // fallback to default categories
    }
  }

  const filteredProducts =
    activeTab === 'الكل'
      ? products
      : products.filter((p) => p.category === activeTab)

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy mb-4">
            تشكيلة منتجاتنا الفاخرة
          </h2>
          <p className="text-sm text-neutral-500">
            تصفحي المنتجات حسب الأقسام واضغطي على أي قطعة لمشاهدة التفاصيل
            الكاملة والطلب مباشرة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar justify-start sm:justify-center"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-medium transition ${
                activeTab === cat
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'bg-brand-pink-soft text-neutral-700 hover:bg-brand-pink/50'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-neutral-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-brand-burgundy border-t-transparent rounded-full mx-auto mb-4"
            />
            جاري تحميل المنتجات...
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PackageOpen className="w-16 h-16 mx-auto text-brand-pink-deep/40 mb-4" />
            </motion.div>
            <p className="text-lg font-medium text-neutral-500">
              لا توجد منتجات في هذا القسم
            </p>
            <p className="text-sm text-neutral-400 mt-1">
              قريباً سنضيف تشكيلة جديدة لهذا القسم
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.div
                  layout
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  key={prod._id || prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group cursor-pointer text-start"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-pink-soft mb-4">
                    <motion.img
                      src={imageUrl(prod.image, 700)}
                      alt={prod.name}
                      className="w-full h-full object-cover transition duration-700"
                      whileHover={{ scale: 1.1 }}
                      loading="lazy"
                      decoding="async"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-brand-burgundy/10 flex items-center justify-center"
                    >
                      <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/95 text-brand-burgundy text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow"
                      >
                        <Eye className="w-4 h-4" /> تفاصيل القطعة
                      </motion.span>
                    </motion.div>
                    {prod.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="absolute top-3 right-3 bg-brand-burgundy text-white text-[10px] font-bold px-3 py-1 rounded-full"
                      >
                        {prod.badge}
                      </motion.span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-wider text-brand-burgundy font-medium uppercase">
                    {prod.category}
                  </span>
                  <h3 className="font-serif text-lg text-neutral-900 mt-1 font-bold group-hover:text-brand-burgundy transition">
                    {prod.name}
                  </h3>
                  <p className="text-sm font-semibold text-brand-burgundy-light mt-1">
                    {prod.price}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full relative z-10 grid md:grid-cols-2 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-brand-burgundy"
                >
                  <X className="w-5 h-5" />
                </button>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="aspect-[4/5] bg-neutral-100"
                >
                  <img
                    src={imageUrl(selectedProduct.image, 900)}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs text-brand-burgundy/70 font-medium">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-2 mb-4">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      القطعة مصنوعة من خامات عالية الجودة تضمن الراحة والأناقة
                      المستدامة ومتوفرة بمقاسات مختلفة لتناسب رغبتك.
                    </p>
                    <motion.div
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-xl font-bold text-brand-burgundy mt-4"
                    >
                      {selectedProduct.price}
                    </motion.div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/${cleanPhone(brand.whatsapp || brand.phone)}?text=${encodeURIComponent(
                      `مرحباً سوفت، أود الاستفسار عن قطعة: ${selectedProduct.name}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-brand-burgundy text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-burgundy-dark transition mt-6"
                  >
                    <MessageCircle className="w-5 h-5" /> اطلب الآن عبر واتساب
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
