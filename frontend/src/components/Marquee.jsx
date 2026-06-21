import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const defaultItems = [
  'خامات قطنية 100%',
  'تجهيز عرائس كامل',
  'لانجري فاخر',
  'أطقم صلاة باردة',
  'تشكيلة حجابات مميزة',
  'سرية تامة في التعامل',
]

export default function Marquee({ items = defaultItems }) {
  return (
    <div className="bg-brand-burgundy text-brand-pink py-4 overflow-hidden border-y border-brand-burgundy-dark">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={{ animationPlayState: 'paused' }}
        className="flex whitespace-nowrap gap-12"
        style={{ width: 'fit-content' }}
      >
        {[...items, ...items, ...items].map((text, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-3 shrink-0"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4 text-brand-pink/60" />
            </motion.span>
            <span className="font-serif text-lg tracking-wide">{text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
