import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Products from './components/Products'
import About from './components/About'
import Storefront from './components/Storefront'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
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

export default App
