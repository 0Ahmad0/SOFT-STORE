import React, { useState, useEffect } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'
import { BRAND, API } from '../lib/brand'
import axios from 'axios'

export default function Storefront() {
  const [storeImage, setStoreImage] = useState(null)

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(API.brand)
        if (res.data && res.data.storefront) {
          setStoreImage(res.data.storefront)
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
          <div className="lg:col-span-7">
            <div className="aspect-[5/4] w-full rounded-3xl overflow-hidden shadow-xl">
              <img
                src={
                  storeImage ||
                  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=800'
                }
                alt="معرض سوفت للألبسة الداخلية"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 text-start">
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
            <ul className="space-y-4 text-sm text-neutral-700">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-burgundy" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-burgundy" />
                <span dir="ltr">{BRAND.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-burgundy" />
                <span>{BRAND.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
