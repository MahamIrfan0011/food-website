'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NewArrivalsSlider() {
  const items = [
    {
      id: 1,
      name: 'Spicy Chicken Wings',
      image: '/wings.jpg',
      link: '/newarrivals/spicy-chicken-wings',
      label: 'NEW',
    },
    {
      id: 2,
      name: 'Vegan Burger',
      image: '/burger.jpg',
      link: '/newarrivals/vegan-burger',
      label: '10% OFF',
    },
    {
      id: 3,
      name: 'Loaded Nachos',
      image: '/nachos.jpg',
      link: '/newarrivals/loaded-nachos',
      label: '20% OFF',
    },
    {
      id: 4,
      name: 'Cheesy Garlic Bread',
      image: '/bread.jpg',
      link: '/newarrivals/cheesy-garlic-bread',
      label: 'NEW',
    },
  ]

  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }, [items.length])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide()
    }, 2000)
    return () => clearTimeout(timer)
  }, [nextSlide])

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10 select-none">
      <h2
        className="text-3xl font-bold mb-6 text-center text-black tracking-wide drop-shadow-lg"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        New Arrivals
      </h2>

      <div className="w-full h-[360px] relative rounded-xl overflow-hidden shadow-2xl ring-2 ring-yellow-400">
        <Link href={items[current].link} className="relative block w-full h-full group">
          <Image
            src={items[current].image}
            alt={items[current].name}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          {items[current].label && (
            <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-3 py-1 rounded-md shadow-lg text-sm select-none">
              {items[current].label}
            </div>
          )}
        </Link>
      </div>

      <div className="mt-4 text-center font-semibold text-2xl text-black drop-shadow-lg select-none">
        {items[current].name}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 text-white px-5 py-2 rounded-full shadow-lg transition"
        aria-label="Previous"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 text-white px-5 py-2 rounded-full shadow-lg transition"
        aria-label="Next"
      >
        &#8250;
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-transform duration-300 ${
              index === current
                ? 'bg-gray-900 scale-125 shadow-lg'
                : 'bg-gray-400 hover:bg-yellow-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

