import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import axios from 'axios'
import { API, BRAND, cleanPhone } from '../lib/brand'

export default function Footer() {
  const [brand, setBrand] = useState(BRAND)

  useEffect(() => {
    axios.get(API.brand).then((res) => setBrand({ ...BRAND, ...res.data })).catch(() => {})
  }, [])

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-brand-burgundy-dark text-brand-pink/80 py-12 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-2xl font-bold text-white"
        >
          SOFT — سوفت
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs max-w-md mx-auto leading-relaxed"
        >
          {brand.description || BRAND.description}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs border-t border-white/10 pt-6 text-brand-pink/50"
        >
          &copy; {new Date().getFullYear()} SOFT. جميع الحقوق محفوظة لمتجر سوفت
          للألبسة الفاخرة.
        </motion.div>
      </div>

      <motion.a
        href={`https://wa.me/${cleanPhone(brand.whatsapp || brand.phone)}`}
        target="_blank"
        rel="noreferrer"
        animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_28px_rgba(37,211,102,0.55)] hover:scale-110 transition-transform duration-300"
        aria-label="Contact WhatsApp"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]/35"
          animate={{ scale: [1, 1.9], opacity: [0.55, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-white/25"
          animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <MessageCircle className="relative z-10 w-6 h-6" />
      </motion.a>
    </motion.footer>
  )
}
