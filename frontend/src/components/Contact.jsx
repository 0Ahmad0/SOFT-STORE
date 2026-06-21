import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Facebook, Send } from 'lucide-react'
import { BRAND, API } from '../lib/brand'
import axios from 'axios'

const socialLinks = [
  { Icon: MessageCircle, href: `https://wa.me/${BRAND.whatsapp}`, color: '#25D366' },
  { Icon: Instagram, href: BRAND.instagram, color: '#E1306C' },
  { Icon: Facebook, href: BRAND.facebook, color: '#1877F2' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', msg: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post(API.contact, form)
      setSubmitted(true)
      setForm({ name: '', phone: '', msg: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      alert('حدث خطأ أثناء الإرسال. حاولي مرة أخرى لاحقاً.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-brand-burgundy text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-start flex flex-col justify-center"
          >
            <span className="text-xs text-brand-pink font-semibold">
              — تواصل سريع
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-6">
              نحن هنا للإجابة على استفساراتكِ
            </h2>
            <p className="text-brand-pink/80 text-sm leading-relaxed mb-8">
              يمكنكِ الطلب مباشرة، أو الاستفسار عن المقاسات والألوان المتوفرة من
              خلال تعبئة النموذج أو الاتصال بنا عبر المنصات التالية:
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.15, backgroundColor: color }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white p-8 rounded-3xl text-neutral-900 space-y-4 shadow-xl"
          >
            <h3 className="font-serif text-xl font-bold text-brand-burgundy mb-2">
              أرسلي لنا طلبكِ
            </h3>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-50 text-green-700 text-sm p-3 rounded-xl border border-green-200"
              >
                تم إرسال رسالتك بنجاح! سنتواصل معكِ قريباً.
              </motion.div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-xs text-neutral-500 block mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full border rounded-xl p-3 bg-brand-pink-soft/50 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-sm transition-all"
                  placeholder="الاسم الكريم"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-xs text-neutral-500 block mb-1">
                  رقم الموبايل
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full border rounded-xl p-3 bg-brand-pink-soft/50 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-sm text-start transition-all"
                  dir="ltr"
                  placeholder="09xx xxx xxx"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-xs text-neutral-500 block mb-1">
                تفاصيل طلبكِ أو استفساركِ
              </label>
              <textarea
                rows={4}
                required
                value={form.msg}
                onChange={(e) =>
                  setForm({ ...form, msg: e.target.value })
                }
                className="w-full border rounded-xl p-3 bg-brand-pink-soft/50 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-sm resize-none transition-all"
                placeholder="اكتبي ما تحتاجينه هنا..."
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-brand-burgundy text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-brand-burgundy-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Send className="w-4 h-4" />
              </motion.span>
              {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
