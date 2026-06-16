import React from 'react'
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
      <div className="flex whitespace-nowrap gap-12 animate-marquee">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <Sparkles className="w-4 h-4 text-brand-pink/60" />
            <span className="font-serif text-lg tracking-wide">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
