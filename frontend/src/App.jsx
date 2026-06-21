import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Products from './components/Products'
import About from './components/About'
import Storefront from './components/Storefront'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AdminCategories from './admin/AdminCategories'
import AdminMessages from './admin/AdminMessages'
import AdminBrand from './admin/AdminBrand'

function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <About />
      <Storefront />
      <Contact />
      <Footer />
    </div>
  )
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="brand" element={<AdminBrand />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
