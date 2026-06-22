import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MessageSquare, Trash2, Phone, Clock } from 'lucide-react'
import { API } from '../lib/brand'
import AdminNotice from './AdminNotice'

const token = () => localStorage.getItem('adminToken')
const headers = () => ({ Authorization: `Bearer ${token()}` })

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState(null)

  useEffect(() => { fetchMessages() }, [])

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API.contact, { headers: headers() })
      setMessages(res.data)
    } catch {
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('حذف الرسالة؟')) return
    try {
      await axios.delete(`${API.contact}/${id}`, { headers: headers() })
      setNotice({ type: 'success', message: 'تم حذف الرسالة بنجاح.' })
      fetchMessages()
    } catch (err) {
      setNotice({ type: 'error', message: err.response?.data?.message || 'تعذر حذف الرسالة.' })
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ar-IQ', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-brand-burgundy" />
        <h1 className="text-2xl font-bold text-neutral-900">الرسائل</h1>
      </div>

      <AdminNotice notice={notice} onClose={() => setNotice(null)} />

      {loading ? (
        <div className="text-center py-20 text-neutral-400">جاري التحميل...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>لا توجد رسائل</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-neutral-900">{msg.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-neutral-500">
                    {msg.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {msg.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(msg.createdAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center text-red-400 hover:border-red-400 hover:text-red-500 transition shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">{msg.msg}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
