import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { API, BRAND as FALLBACK_BRAND, cleanPhone, imageUrl } from '../lib/brand'
import axios from 'axios'

const links = [
  { id: 'hero', label: 'الرئيسية' },
  { id: 'products', label: 'المنتجات' },
  { id: 'about', label: 'من نحن' },
  { id: 'storefront', label: 'معرضنا' },
  { id: 'contact', label: 'تواصل معنا' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [brand, setBrand] = useState(FALLBACK_BRAND)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(API.brand)
        if (res.data) {
          setBrand({
            name: res.data.name || 'SOFT',
            nameAr: res.data.nameAr || 'سوفت',
            logo: res.data.logo || '',
            phone: res.data.phone || '',
            phoneDisplay: res.data.phoneDisplay || '',
            whatsapp: res.data.whatsapp || '',
          })
        }
      } catch {
        // use fallback
      }
    }
    fetchBrand()
  }, [])

  const phone = cleanPhone(brand.phone)
  const whatsapp = cleanPhone(brand.whatsapp || phone)

  const goTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const offset = window.innerWidth < 1024 ? 72 : 88
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/90 border-b border-brand-pink shadow-sm'
          : 'bg-white/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-0'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 sm:gap-3 text-start min-w-0"
        >
          <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden ring-2 ring-brand-burgundy/20 shrink-0">
            <img
              src={imageUrl(brand.logo, 120) || 'https://via.placeholder.com/44/5E1224/ffffff?text=S'}
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-serif text-lg lg:text-xl font-bold leading-none text-brand-burgundy truncate">
              {brand.name}
            </div>
            <div className="text-[9px] lg:text-[10px] tracking-[0.16em] lg:tracking-[0.2em] text-brand-burgundy/70 mt-1 truncate">
              {brand.nameAr}
            </div>
          </div>
        </button>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => goTo(l.id)}
                className="text-sm font-medium text-neutral-700 hover:text-brand-burgundy transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phone}`}
            className="hidden md:inline-flex items-center gap-2 text-sm text-brand-burgundy font-medium"
            dir="ltr"
          >
            <Phone className="w-4 h-4" /> {brand.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex bg-brand-burgundy text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-brand-burgundy-dark transition"
          >
            تواصل واتساب
          </a>
          <button
            type="button"
            className="lg:hidden p-2 text-brand-burgundy shrink-0"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-brand-pink shadow-xl"
          >
            <ul className="px-4 py-3 flex flex-col">
              {links.map((l) => (
                <li key={l.id} className="border-b border-brand-pink/60 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => goTo(l.id)}
                    className="text-base font-medium text-neutral-800 w-full text-start py-4"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
