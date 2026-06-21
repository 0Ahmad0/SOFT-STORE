import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { assetUrl } from '../lib/brand'
import AdminNotice from './AdminNotice'
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  Search,
  GripVertical,
} from 'lucide-react'

const token = () => localStorage.getItem('adminToken')
const headers = () => ({ Authorization: `Bearer ${token()}` })

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState(null)
  const [draggingId, setDraggingId] = useState(null)
  const fileRef = useRef()

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    badge: '',
    featured: false,
    active: true,
    order: 0,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products?active=all', { headers: headers() })
      setProducts(sortProducts(res.data || []))
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories?active=all')
      setCategories(res.data || [])
    } catch {
      setCategories([])
    }
  }

  const sortProducts = (items) =>
    [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name))

  const resetForm = () => {
    setForm({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      badge: '',
      featured: false,
      active: true,
      order: 0,
    })
    setEditing(null)
    setShowForm(false)
  }

  const openEdit = (product) => {
    setForm({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      description: product.description || '',
      image: product.image || '',
      badge: product.badge || '',
      featured: product.featured || false,
      active: product.active ?? true,
      order: product.order || 0,
    })
    setEditing(product._id)
    setShowForm(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      const res = await axios.post('/api/upload', fd, {
        headers: { ...headers(), 'Content-Type': 'multipart/form-data' },
      })
      setForm((prev) => ({ ...prev, image: res.data.url }))
      setNotice({ type: 'success', message: 'تم رفع الصورة بنجاح.' })
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر رفع الصورة. تأكد من نوع وحجم الملف.' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await axios.put(`/api/products/${editing}`, form, { headers: headers() })
        setNotice({ type: 'success', message: 'تم تحديث المنتج بنجاح.' })
      } else {
        const nextOrder = products.length
          ? Math.max(...products.map((product) => Number(product.order) || 0)) + 1
          : 1
        await axios.post('/api/products', { ...form, order: nextOrder }, { headers: headers() })
        setNotice({ type: 'success', message: 'تم إضافة المنتج وسيظهر في لوحة التحكم والموقع.' })
      }
      resetForm()
      fetchProducts()
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حفظ المنتج. تحقق من الحقول المطلوبة.' })
    }
  }

  const handleDragStart = (id) => {
    setDraggingId(id)
  }

  const handleDragOver = (e, targetId) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return

    setProducts((current) => {
      const from = current.findIndex((product) => product._id === draggingId)
      const to = current.findIndex((product) => product._id === targetId)
      if (from < 0 || to < 0) return current
      const next = [...current]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  const saveOrder = async () => {
    if (!draggingId) return
    const nextProducts = products.map((product, index) => ({ ...product, order: index + 1 }))
    setDraggingId(null)
    setProducts(nextProducts)

    try {
      await Promise.all(
        nextProducts.map((product) =>
          axios.put(`/api/products/${product._id}`, { order: product.order }, { headers: headers() })
        )
      )
      setNotice({ type: 'success', message: 'تم حفظ ترتيب المنتجات.' })
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حفظ ترتيب المنتجات.' })
      fetchProducts()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('متأكد من حذف هذا المنتج؟')) return
    try {
      await axios.delete(`/api/products/${id}`, { headers: headers() })
      setNotice({ type: 'success', message: 'تم حذف المنتج بنجاح.' })
      fetchProducts()
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حذف المنتج.' })
    }
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-brand-burgundy" />
          <h1 className="text-2xl font-bold text-neutral-900">المنتجات</h1>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="bg-brand-burgundy text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-brand-burgundy/90 transition"
        >
          <Plus className="w-4 h-4" /> إضافة منتج
        </button>
      </div>

      <AdminNotice notice={notice} onClose={() => setNotice(null)} />

      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث عن منتج..."
          className="w-full pr-10 pl-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={resetForm} />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-neutral-900">
                {editing ? 'تعديل منتج' : 'إضافة منتج جديد'}
              </h2>
              <button type="button" onClick={resetForm} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">الاسم *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">التصنيف *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                    required
                  >
                    <option value="">اختر تصنيف</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">السعر *</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">الوصف</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">الصورة *</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="px-4 py-2.5 border-2 border-dashed border-neutral-300 rounded-xl text-sm text-neutral-500 hover:border-brand-burgundy hover:text-brand-burgundy transition flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" /> رفع صورة
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {form.image && (
                    <img src={assetUrl(form.image)} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  )}
                </div>
                {form.image && (
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                    className="w-full mt-2 px-4 py-2 border border-neutral-200 rounded-xl text-xs text-neutral-500"
                    placeholder="أو أدخل رابط الصورة يدوياً"
                  />
                )}
              </div>

              <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">وسم (badge)</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
                    placeholder="مثال: جديد, أكثر مبيعاً"
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                  />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="rounded"
                  />
                  مميز
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-700">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                    className="rounded"
                  />
                  فعال
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-brand-burgundy text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-burgundy/90 transition"
              >
                {editing ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 border border-neutral-200 rounded-xl text-sm text-neutral-600 hover:bg-neutral-50 transition"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-neutral-400">جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>لا توجد منتجات</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((product, index) => (
            <div
              key={product._id}
              draggable={!search}
              onDragStart={() => handleDragStart(product._id)}
              onDragOver={(e) => handleDragOver(e, product._id)}
              onDragEnd={saveOrder}
              className={`bg-white rounded-2xl p-4 border shadow-sm flex items-center gap-4 transition ${
                draggingId === product._id ? 'border-brand-burgundy opacity-70' : 'border-neutral-100'
              } ${search ? '' : 'cursor-grab'}`}
            >
              {!search && <GripVertical className="w-5 h-5 text-neutral-300 shrink-0" />}
              <img
                src={assetUrl(product.image)}
                alt=""
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 truncate">{product.name}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {product.category} — {product.price}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">الترتيب: {index + 1}</p>
                {product.badge && (
                  <span className="inline-block mt-1 text-[10px] bg-brand-burgundy/10 text-brand-burgundy px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(product)}
                  className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-brand-burgundy hover:text-brand-burgundy transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-red-400 hover:border-red-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
