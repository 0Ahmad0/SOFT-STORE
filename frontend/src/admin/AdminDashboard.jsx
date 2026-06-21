import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Package, Tags, MessageSquare, TrendingUp, ArrowLeft } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, messages: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken')
      const headers = { Authorization: `Bearer ${token}` }
      try {
        const [prodRes, catRes, msgRes] = await Promise.all([
          axios.get('/api/products?active=all', { headers }),
          axios.get('/api/categories?active=all', { headers }),
          axios.get('/api/contact', { headers }),
        ])
        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          messages: msgRes.data.length,
        })
      } catch {
        // use defaults
      }
    }
    fetchStats()
  }, [])

  const cards = [
    {
      label: 'المنتجات',
      value: stats.products,
      icon: Package,
      color: 'bg-rose-50 text-rose-600',
      link: '/admin/products',
    },
    {
      label: 'التصنيفات',
      value: stats.categories,
      icon: Tags,
      color: 'bg-amber-50 text-amber-600',
      link: '/admin/categories',
    },
    {
      label: 'الرسائل',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600',
      link: '/admin/messages',
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-6 h-6 text-brand-burgundy" />
        <h1 className="text-2xl font-bold text-neutral-900">لوحة التحكم</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowLeft className="w-4 h-4 text-neutral-300" />
            </div>
            <p className="text-3xl font-bold text-neutral-900">{card.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
        <h2 className="font-semibold text-neutral-900 mb-2">مرحباً بك 👋</h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          من هنا تقدر تضيف وتعدل وتحذف المنتجات والتصنيفات، وتشوف رسائل الزبائن،
          وتحديث معلومات المتجر.
        </p>
      </div>
    </div>
  )
}
