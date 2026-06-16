import React from 'react'
import { ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react'
import { BRAND } from '../lib/brand'

const features = [
  {
    Icon: ShieldCheck,
    title: 'خامات أصلية فاخرة',
    desc: 'نعتمد على القطن المصري والحرير والدانتيل الفاخر لنمنح بشرتك الراحة.',
  },
  {
    Icon: Sparkles,
    title: 'تشكيلة كاملة متكاملة',
    desc: 'أكثر من 500 منتج يغطي كافة احتياجاتك اليومية والخاصة للعرائس.',
  },
  {
    Icon: Truck,
    title: 'شحن وتوصيل متاح',
    desc: 'نوفر لكِ خدمة شحن آمنة وسريعة لجميع المحافظات مع الحفاظ التام على الخصوصية.',
  },
  {
    Icon: HeartHandshake,
    title: 'استشارات وخدمة راقية',
    desc: 'فريقنا المتخصص متواجد لمساعدتك في اختيار المقاسات المناسبة عبر واتساب.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-brand-pink-soft/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-start">
            <span className="text-xs tracking-wider text-brand-burgundy/70 font-semibold">
              — من نحن
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-burgundy mt-2 mb-6">
              متجر سوفت للتميز والأناقة
            </h2>
            <p className="text-base text-neutral-700 leading-loose mb-6">
              في متجر <strong>سوفت (SOFT)</strong> نؤمن بأن الثقة والجمال يبدآن
              من الملابس الأكثر قرباً لجسدك، لذا ننتقي لكِ أفضل الماركات
              العالمية والمحلية بخامات ناعمة ومريحة تليق بكِ وبأسعار تنافسية
              ومناسبة جداً.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-burgundy/10 flex items-center justify-center mb-4 text-brand-burgundy">
                  <f.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-burgundy mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
