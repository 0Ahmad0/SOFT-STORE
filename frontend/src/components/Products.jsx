import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, MessageCircle, X } from 'lucide-react'
import { BRAND, API, SAMPLE_PRODUCTS } from '../lib/brand'
import axios from 'axios'

export default function Products() {
  const [activeTab, setActiveTab] = useState('الكل')
  const [selectedProduct, setSelectedProduct] = useState(null)
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy mb-4">
            تشكيلة منتجاتنا الفاخرة
          </h2>
          <p className="text-sm text-neutral-500">
            تصفحي المنتجات حسب الأقسام واضغطي على أي قطعة لمشاهدة التفاصيل
            الكاملة والطلب مباشرة.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-medium transition ${
                activeTab === cat
                  ? 'bg-brand-burgundy text-white shadow-md'
                  : 'bg-brand-pink-soft text-neutral-700 hover:bg-brand-pink/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-neutral-400">
            جاري تحميل المنتجات...
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={prod._id || prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="group cursor-pointer text-start"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-pink-soft mb-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-burgundy/10 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                      <span className="bg-white/95 text-brand-burgundy text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow">
                        <Eye className="w-4 h-4" /> تفاصيل القطعة
                      </span>
                    </div>
                    {prod.badge && (
                      <span className="absolute top-3 right-3 bg-brand-burgundy text-white text-[10px] font-bold px-3 py-1 rounded-full">
                        {prod.badge}
                      </span>
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full relative z-10 grid md:grid-cols-2 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-brand-burgundy"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="aspect-[4/5] bg-neutral-100">
                  <img
                    src={selectedProduct.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between">
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
                    <div className="text-xl font-bold text-brand-burgundy mt-4">
                      {selectedProduct.price}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                      `مرحباً سوفت، أود الاستفسار عن قطعة: ${selectedProduct.name}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-brand-burgundy text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-burgundy-dark transition mt-6"
                  >
                    <MessageCircle className="w-5 h-5" /> اطلب الآن عبر واتساب
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
