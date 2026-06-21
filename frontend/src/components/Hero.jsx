import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import axios from 'axios'
import { API, BRAND, PLACEHOLDER_IMAGES, assetUrl } from '../lib/brand'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const statVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.8 + i * 0.15, type: 'spring', stiffness: 200 },
  }),
}

export default function Hero() {
  const [heroImage, setHeroImage] = useState('')
  const [stats, setStats] = useState([
    { value: '0', label: 'منتج متوفر' },
    { value: '0', label: 'تصنيف' },
    { value: 'واتساب', label: 'طلب مباشر' },
  ])

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const [brandRes, productsRes, categoriesRes] = await Promise.all([
          axios.get(API.brand),
          axios.get(API.products),
          axios.get(API.categories),
        ])
        setHeroImage(brandRes.data?.heroImage || '')
        setStats([
          { value: String(productsRes.data?.length || 0), label: 'منتج متوفر' },
          { value: String(categoriesRes.data?.length || 0), label: 'تصنيف' },
          { value: 'واتساب', label: 'طلب مباشر' },
        ])
      } catch {
        // use fallback
      }
    }
    fetchHeroData()
  }, [])

  return (
    <section
      id="hero"
      className="relative pt-28 lg:pt-36 pb-12 lg:pb-24 overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-pink-soft blur-3xl opacity-80 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 lg:order-2 text-start"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-brand-pink-soft border border-brand-burgundy/10 rounded-full px-4 py-1.5 text-xs text-brand-burgundy font-medium mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.span>
              <span>تشكيلة الأناقة والجمال</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-6xl font-bold text-brand-burgundy leading-tight mb-6"
            >
              أناقتكِ وراحتكِ تبدأ{' '}
              <motion.span
                animate={{ color: ['#5E1224', '#8A1D36', '#E91E63', '#5E1224'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="block italic"
              >
                من سوفت.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-10 max-w-xl"
            >
              {BRAND.description} نفتخر بتقديم تجربة استثنائية لكل زبائننا مع
              ضمان السرية التامة والجودة العالية.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById('products')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-3 bg-brand-burgundy text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-brand-burgundy-dark transition-all shadow-xl shadow-brand-burgundy/10"
              >
                <span>اكتشفي المجموعة</span>
                <motion.span
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-3 gap-4 border-t border-brand-pink pt-8 max-w-md text-center"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 lg:order-1 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl"
              >
                <img
                  src={assetUrl(heroImage) || PLACEHOLDER_IMAGES.hero}
                  alt="SOFT Boutique Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
