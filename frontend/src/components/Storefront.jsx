import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'
import { BRAND, API, imageUrl } from '../lib/brand'
import axios from 'axios'

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const listItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Storefront() {
  const [brand, setBrand] = useState({
    address: BRAND.address,
    phoneDisplay: BRAND.phoneDisplay,
    hours: BRAND.hours,
    mapQuery: BRAND.mapQuery,
    mapLabel: BRAND.mapLabel,
    storefront: '',
  })

  const mapQuery = brand.mapQuery || brand.address || BRAND.address
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=18&output=embed`
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(API.brand)
        if (res.data) {
          setBrand((prev) => ({
            ...prev,
            address: res.data.address || BRAND.address,
            phoneDisplay: res.data.phoneDisplay || prev.phoneDisplay,
            hours: res.data.hours || prev.hours,
            mapQuery: res.data.mapQuery || BRAND.mapQuery,
            mapLabel: res.data.mapLabel || BRAND.mapLabel,
            storefront: res.data.storefront || '',
          }))
        }
      } catch {
        // use fallback
      }
    }
    fetchBrand()
  }, [])

  return (
    <section id="storefront" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="aspect-[5/4] w-full rounded-3xl overflow-hidden shadow-xl">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
                src={
                  imageUrl(brand.storefront, 1000) ||
                  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=800'
                }
                alt="معرض سوفت للألبسة الداخلية"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 text-start"
          >
            <span className="text-xs text-brand-burgundy/70 font-semibold">
              — زورونا في معرضنا
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy mt-2 mb-6">
              تشرّفنا زيارتكم الشخصية
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              ندعوكم لزيارة معرضنا الفعلي لمشاهدة التشكيلة الكاملة على أرض
              الواقع، حيث تتوفر الخصوصية والراحة التامة لاختيار وتجربة ما يناسبكم
              بمساعدة فريقنا المتواجد لخدمتكم.
            </p>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 text-sm text-neutral-700"
            >
              {[
                { Icon: MapPin, text: brand.address },
                { Icon: Phone, text: brand.phoneDisplay, dir: 'ltr' },
                { Icon: Clock, text: brand.hours },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={listItemVariants}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3"
                >
                  <motion.span
                    whileHover={{ rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.Icon className="w-5 h-5 text-brand-burgundy" />
                  </motion.span>
                  <span dir={item.dir || undefined}>{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 overflow-hidden rounded-3xl border border-brand-pink/70 shadow-xl bg-brand-pink-soft"
        >
          <div className="relative h-[360px] sm:h-[420px]">
            <iframe
              title="موقع متجر سوفت على الخريطة"
              src={mapSrc}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div className="relative flex flex-col items-center">
                <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-burgundy shadow-xl border border-brand-pink">
                  {brand.mapLabel || 'سوفت'}
                </div>
                <div className="relative mt-1 h-10 w-10 drop-shadow-lg">
                  <MapPin className="absolute inset-0 h-10 w-10 fill-brand-burgundy text-brand-burgundy" />
                  <span className="absolute left-1/2 top-[11px] h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 left-4 rounded-full bg-white/95 px-5 py-2.5 text-xs font-semibold text-brand-burgundy shadow-lg hover:bg-white transition"
            >
              فتح الموقع على الخريطة
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
