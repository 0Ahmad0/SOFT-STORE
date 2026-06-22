import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Settings, Save, Image as ImageIcon } from 'lucide-react'
import { BRAND, assetUrl } from '../lib/brand'
import { uploadImage } from '../lib/cloudinaryUpload'
import AdminNotice from './AdminNotice'

const token = () => localStorage.getItem('adminToken')
const headers = () => ({ Authorization: `Bearer ${token()}` })

export default function AdminBrand() {
  const [form, setForm] = useState({
    name: '',
    nameAr: '',
    description: '',
    phone: '',
    phoneDisplay: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    address: BRAND.address,
    hours: '',
    mapQuery: BRAND.mapQuery,
    mapLabel: BRAND.mapLabel,
    logo: '',
    heroImage: '',
    storefront: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState(null)
  const logoRef = useRef()
  const heroRef = useRef()
  const storefrontRef = useRef()

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get('/api/brand')
        if (res.data) {
          setForm({
            name: res.data.name || '',
            nameAr: res.data.nameAr || '',
            description: res.data.description || '',
            phone: res.data.phone || '',
            phoneDisplay: res.data.phoneDisplay || '',
            whatsapp: res.data.whatsapp || '',
            instagram: res.data.instagram || '',
            facebook: res.data.facebook || '',
            address: res.data.address || BRAND.address,
            hours: res.data.hours || '',
            mapQuery: res.data.mapQuery || BRAND.mapQuery,
            mapLabel: res.data.mapLabel || BRAND.mapLabel,
            logo: res.data.logo || '',
            heroImage: res.data.heroImage || '',
            storefront: res.data.storefront || '',
          })
        }
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    fetchBrand()
  }, [])

  const handleChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const url = await uploadImage(file, 'settings')
      setForm((prev) => ({ ...prev, [field]: url }))
      setNotice({ type: 'success', message: 'تم رفع الصورة بنجاح.' })
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'تعذر رفع الصورة. تأكد من نوع وحجم الملف.' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await axios.put('/api/brand', form, { headers: headers() })
      setNotice({ type: 'success', message: 'تم حفظ معلومات المتجر بنجاح.' })
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حفظ معلومات المتجر.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-neutral-400">جاري التحميل...</div>
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-brand-burgundy" />
        <h1 className="text-2xl font-bold text-neutral-900">معلومات المتجر</h1>
      </div>

      <AdminNotice notice={notice} onClose={() => setNotice(null)} />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">اسم المتجر</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">الوصف</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              rows={3}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">رقم الهاتف</label>
              <input
                type="text"
                value={form.phone}
                onChange={handleChange('phone')}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">واتساب</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={handleChange('whatsapp')}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">انستغرام</label>
              <input
                type="text"
                value={form.instagram}
                onChange={handleChange('instagram')}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">فيس بوك</label>
              <input
                type="text"
                value={form.facebook}
                onChange={handleChange('facebook')}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">شعار المتجر (Logo)</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => logoRef.current.click()}
                className="px-4 py-2.5 border-2 border-dashed border-neutral-300 rounded-xl text-sm text-neutral-500 hover:border-brand-burgundy hover:text-brand-burgundy transition flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" /> رفع شعار
              </button>
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'logo')}
                className="hidden"
              />
              {form.logo && (
                <div className="relative">
                  <img src={assetUrl(form.logo)} alt="logo" className="w-16 h-16 rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, logo: '' }))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            {form.logo && (
              <input
                type="text"
                value={form.logo}
                onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))}
                className="w-full mt-2 px-4 py-2 border border-neutral-200 rounded-xl text-xs text-neutral-500"
                placeholder="أو أدخل رابط الشعار يدوياً"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">صورة الصفحة الرئيسية</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => heroRef.current.click()}
                className="px-4 py-2.5 border-2 border-dashed border-neutral-300 rounded-xl text-sm text-neutral-500 hover:border-brand-burgundy hover:text-brand-burgundy transition flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" /> رفع صورة الهيرو
              </button>
              <input
                ref={heroRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'heroImage')}
                className="hidden"
              />
              {form.heroImage && (
                <div className="relative">
                  <img src={assetUrl(form.heroImage)} alt="hero" className="w-16 h-16 rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, heroImage: '' }))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            {form.heroImage && (
              <input
                type="text"
                value={form.heroImage}
                onChange={(e) => setForm((p) => ({ ...p, heroImage: e.target.value }))}
                className="w-full mt-2 px-4 py-2 border border-neutral-200 rounded-xl text-xs text-neutral-500"
                placeholder="أو أدخل رابط الصورة يدوياً"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">صورة المعرض (Storefront)</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => storefrontRef.current.click()}
                className="px-4 py-2.5 border-2 border-dashed border-neutral-300 rounded-xl text-sm text-neutral-500 hover:border-brand-burgundy hover:text-brand-burgundy transition flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" /> رفع صورة المعرض
              </button>
              <input
                ref={storefrontRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'storefront')}
                className="hidden"
              />
              {form.storefront && (
                <div className="relative">
                  <img src={assetUrl(form.storefront)} alt="storefront" className="w-16 h-16 rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, storefront: '' }))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            {form.storefront && (
              <input
                type="text"
                value={form.storefront}
                onChange={(e) => setForm((p) => ({ ...p, storefront: e.target.value }))}
                className="w-full mt-2 px-4 py-2 border border-neutral-200 rounded-xl text-xs text-neutral-500"
                placeholder="أو أدخل رابط الصورة يدوياً"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">العنوان</label>
            <input
              type="text"
              value={form.address}
              onChange={handleChange('address')}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">موقع الخريطة</label>
              <input
                type="text"
                value={form.mapQuery}
                onChange={handleChange('mapQuery')}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                placeholder="مثال: 33.5138,36.2765"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">اسم العلامة على الخريطة</label>
              <input
                type="text"
                value={form.mapLabel}
                onChange={handleChange('mapLabel')}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                placeholder="سوفت"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">ساعات العمل</label>
            <input
              type="text"
              value={form.hours}
              onChange={handleChange('hours')}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 bg-brand-burgundy text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-brand-burgundy/90 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
      </form>
    </div>
  )
}
