import React from 'react'
import { MessageCircle } from 'lucide-react'
import { BRAND } from '../lib/brand'

export default function Footer() {
  return (
    <footer className="bg-brand-burgundy-dark text-brand-pink/80 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <div className="font-serif text-2xl font-bold text-white">
          SOFT — سوفت
        </div>
        <p className="text-xs max-w-md mx-auto leading-relaxed">
          {BRAND.description}
        </p>
        <div className="text-xs border-t border-white/10 pt-6 text-brand-pink/50">
          &copy; {new Date().getFullYear()} SOFT. جميع الحقوق محفوظة لمتجر سوفت
          للألبسة الفاخرة.
        </div>
      </div>

      <a
        href={`https://wa.me/${BRAND.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Contact WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  )
}
