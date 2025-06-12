'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 bg-black shadow-lg transition-colors duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'}`}>
      <div className="h-16 px-6 flex justify-between items-center">
        
        {/* LOGO: big and clear without increasing navbar height */}
        <Link href="/" className="relative h-full w-[180px] flex items-center overflow-hidden">
          <Image
            src="/logo1.png"         // ✅ Ensure this image is big, clear (e.g. 500x200 px PNG)
            alt="YumOnGo Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-[#F1E3D3] font-semibold text-lg font-poppins select-none">
          {['Home', 'Menu', 'Offers', 'Contact'].map((item) => (
          <Link
  key={item}
  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
  className="relative px-3 py-1 rounded-md transition-all duration-300 hover:bg-[#E5D0AC] hover:text-black hover:uppercase"
>
  {item}
</Link>


          ))}
        </div>
      </div>
    </nav>
  )
}
