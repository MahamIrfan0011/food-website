'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'Menu', 'Offers', 'Contact']

  return (
    <nav className={`fixed top-0 w-full z-50 shadow-lg transition-colors duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'}`}>
      <div className="h-16 px-6 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="relative h-full w-[180px] flex items-center overflow-hidden">
          <Image
            src="/logo1.png"
            alt="YumOnGo Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[#F1E3D3] font-semibold text-lg font-poppins select-none">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="relative px-3 py-1 rounded-md transition-all duration-300 hover:bg-[#E5D0AC] hover:text-black hover:uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-[#F1E3D3] font-semibold text-lg font-poppins px-6 pb-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block py-2 border-b border-white/20 hover:text-black hover:bg-[#E5D0AC] rounded-md transition-all duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
