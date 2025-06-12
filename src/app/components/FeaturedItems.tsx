'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const featured = [
  { name: 'Cheese Burger', image: '/cheeseburger.jpg', link: '/burgers', label: "NEW" },
  { name: 'Chicken Fajita Pizza', image: '/pizza1.jpg', link: '/pizza' , label: "LIMITED"},
  { name: 'Pasta', image: '/pasta.jpg', link: '/pasta' , label: "20% OFF"},
  { name: 'Spring Roll', image: '/springroll.jpg', link: '/springroll' , label: null},
]

export default function FeaturedItems() {
  const [current, setCurrent] = useState(0)

  // Auto slide every 2 seconds using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length)
    }, 2000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrent((current + 1) % featured.length)
  const prev = () => setCurrent((current - 1 + featured.length) % featured.length)

  return (
    <div className="relative w-full max-w-xl mx-auto select-none mt-8">
      <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl ring-2 ring-yellow-400 transition-transform duration-700 ease-in-out hover:scale-[1.03]">
        <Image
          src={featured[current].image}
          alt={featured[current].name}
          fill
          className="object-cover"
          priority={true}
        />
        {/* Badge */}
  {featured[current].label && (
    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
      {featured[current].label}
    </div>
  )}
      </div>

      <div className="text-center mt-5 font-extrabold text-2xl text-black tracking-wide drop-shadow-lg">
        {featured[current].name}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-transform active:scale-95"
          aria-label="Previous featured item"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-transform active:scale-95"
          aria-label="Next featured item"
        >
          ›
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-4 mt-6">
        {featured.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-5 h-5 rounded-full transition-transform duration-300 ${
              idx === current
                ? 'bg-yellow-400 scale-125 shadow-lg'
                : 'bg-gray-300 hover:bg-yellow-400'
            }`}
            aria-label={`Go to featured item ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
