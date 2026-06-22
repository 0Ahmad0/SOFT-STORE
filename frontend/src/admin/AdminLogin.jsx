import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { API } from '../lib/brand'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(`${API.auth}/login`, { email, password })
      localStorage.setItem('adminToken', res.data.token)
      localStorage.setItem('adminName', res.data.admin.name)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'خطأ في تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-burgundy to-brand-burgundy/80 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-burgundy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">لوحة التحكم</h1>
          <p className="text-sm text-neutral-500 mt-1">سجّل الدخول لإدارة المتجر</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@softstore.com"
                className="w-full pr-10 pl-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-sm"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-brand-burgundy text-white py-3 rounded-xl font-semibold hover:bg-brand-burgundy/90 transition disabled:opacity-50"
        >
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  )
}
