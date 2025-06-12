'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function DealSlider() {
  const images = [
    '/deal.jpg',
    '/deal1.jpg',
    '/deal2.jpg',
    '/deal3.jpg',
    '/deal4.jpg',
  ]

  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1)
  }

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1)
  }

  // Auto slide effect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 2000)

    // Cleanup on component unmount or when current changes
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full mx-auto mt-6">
      {/* Image container full width, height 500px */}
      <div className="w-full h-[500px] relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={images[current]}
          alt={`Deal ${current + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black"
      >
        &#8250;
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-2 gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-yellow-400' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div>
    </div>
  )
}
