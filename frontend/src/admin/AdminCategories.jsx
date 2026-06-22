import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tags, Plus, Pencil, Trash2, X, GripVertical } from 'lucide-react'
import { API } from '../lib/brand'
import AdminNotice from './AdminNotice'

const token = () => localStorage.getItem('adminToken')
const headers = () => ({ Authorization: `Bearer ${token()}` })

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [name, setName] = useState('')
  const [notice, setNotice] = useState(null)
  const [draggingId, setDraggingId] = useState(null)

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API.categories}?active=all`)
      setCategories(sortCategories(res.data || []))
    } catch {
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setName('')
    setEditing(null)
    setShowForm(false)
  }

  const openEdit = (cat) => {
    setName(cat.name)
    setEditing(cat._id)
    setShowForm(true)
  }

  const sortCategories = (items) =>
    [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const nextOrder = categories.length
        ? Math.max(...categories.map((cat) => Number(cat.order) || 0)) + 1
        : 1
      const body = editing ? { name } : { name, order: nextOrder }
      if (editing) {
        await axios.put(`${API.categories}/${editing}`, body, { headers: headers() })
        setNotice({ type: 'success', message: 'تم تحديث التصنيف بنجاح.' })
      } else {
        await axios.post(API.categories, body, { headers: headers() })
        setNotice({ type: 'success', message: 'تم إضافة التصنيف وسيظهر في لوحة التحكم والموقع.' })
      }
      resetForm()
      fetchCategories()
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حفظ التصنيف. تحقق من البيانات وحاول مرة أخرى.' })
    }
  }

  const handleDragStart = (id) => {
    setDraggingId(id)
  }

  const handleDragOver = (e, targetId) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return

    setCategories((current) => {
      const from = current.findIndex((cat) => cat._id === draggingId)
      const to = current.findIndex((cat) => cat._id === targetId)
      if (from < 0 || to < 0) return current
      const next = [...current]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  const saveOrder = async () => {
    if (!draggingId) return
    const nextCategories = categories.map((cat, index) => ({ ...cat, order: index + 1 }))
    setDraggingId(null)
    setCategories(nextCategories)

    try {
      await Promise.all(
        nextCategories.map((cat) =>
          axios.put(`${API.categories}/${cat._id}`, { order: cat.order }, { headers: headers() })
        )
      )
      setNotice({ type: 'success', message: 'تم حفظ ترتيب التصنيفات.' })
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حفظ الترتيب. أعد المحاولة.' })
      fetchCategories()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('متأكد من حذف هذا التصنيف؟')) return
    try {
      await axios.delete(`${API.categories}/${id}`, { headers: headers() })
      setNotice({ type: 'success', message: 'تم حذف التصنيف بنجاح.' })
      fetchCategories()
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حذف التصنيف.' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Tags className="w-6 h-6 text-brand-burgundy" />
          <h1 className="text-2xl font-bold text-neutral-900">التصنيفات</h1>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="bg-brand-burgundy text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-brand-burgundy/90 transition"
        >
          <Plus className="w-4 h-4" /> إضافة تصنيف
        </button>
      </div>

      <AdminNotice notice={notice} onClose={() => setNotice(null)} />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" onClick={resetForm} />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-neutral-900">
                {editing ? 'تعديل تصنيف' : 'إضافة تصنيف جديد'}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-brand-burgundy text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-burgundy/90 transition"
              >
                {editing ? 'حفظ التعديلات' : 'إضافة التصنيف'}
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
      ) : categories.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <Tags className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>لا توجد تصنيفات</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {categories.map((cat, index) => (
            <div
              key={cat._id}
              draggable
              onDragStart={() => handleDragStart(cat._id)}
              onDragOver={(e) => handleDragOver(e, cat._id)}
              onDragEnd={saveOrder}
              className={`bg-white rounded-2xl p-4 border shadow-sm flex items-center justify-between transition ${
                draggingId === cat._id ? 'border-brand-burgundy opacity-70' : 'border-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-neutral-300 cursor-grab" />
                <div>
                  <h3 className="font-semibold text-neutral-900">{cat.name}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">الترتيب: {index + 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(cat)}
                  className="w-9 h-9 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-brand-burgundy hover:text-brand-burgundy transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
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
