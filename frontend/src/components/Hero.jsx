import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { BRAND, PLACEHOLDER_IMAGES } from '../lib/brand'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-28 lg:pt-36 pb-12 lg:pb-24 overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-pink-soft blur-3xl opacity-80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 text-start">
            <div className="inline-flex items-center gap-2 bg-brand-pink-soft border border-brand-burgundy/10 rounded-full px-4 py-1.5 text-xs text-brand-burgundy font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />{' '}
              <span>تشكيلة الأناقة والجمال</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-brand-burgundy leading-tight mb-6">
              أناقتكِ وراحتكِ تبدأ{' '}
              <span className="block italic text-brand-burgundy-light">
                من سوفت.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-10 max-w-xl">
              {BRAND.description} نفتخر بتقديم تجربة استثنائية لكل زبائننا مع
              ضمان السرية التامة والجودة العالية.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById('products')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-3 bg-brand-burgundy text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-brand-burgundy-dark transition-all shadow-xl shadow-brand-burgundy/10"
              >
                <span>اكتشفي المجموعة</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-brand-pink pt-8 max-w-md">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy">
                  +500
                </div>
                <div className="text-xs text-neutral-500 mt-1">منتج فاخر</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy">
                  8
                </div>
                <div className="text-xs text-neutral-500 mt-1">أقسام متكاملة</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy">
                  100%
                </div>
                <div className="text-xs text-neutral-500 mt-1">خامات أصلية</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 relative">
            <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto">
              <div className="absolute inset-0 rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl">
                <img
                  src={PLACEHOLDER_IMAGES.hero}
                  alt="SOFT Boutique Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
