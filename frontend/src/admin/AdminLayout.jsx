import React, { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Tags,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Store,
} from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'الرئيسية', end: true },
  { to: '/admin/products', icon: Package, label: 'المنتجات' },
  { to: '/admin/categories', icon: Tags, label: 'التصنيفات' },
  { to: '/admin/messages', icon: MessageSquare, label: 'الرسائل' },
  { to: '/admin/brand', icon: Settings, label: 'المتجر' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const adminName = localStorage.getItem('adminName') || 'المدير'

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminName')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex" dir="rtl">
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-neutral-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-burgundy" />
            <span className="font-bold text-neutral-900">سوفت</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-neutral-500 hover:text-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-burgundy text-white shadow-md'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">{adminName}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-neutral-500 hover:text-neutral-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <NavLink
            to="/"
            className="text-xs text-neutral-500 hover:text-brand-burgundy transition"
            target="_blank"
          >
            عرض الموقع ←
          </NavLink>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
