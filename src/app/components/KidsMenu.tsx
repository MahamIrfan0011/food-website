'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

const kidsItems = [
  {
    name: 'Mini Burger',
    image: '/mini.jpg',
    price: '$4.99',
    label: "NEW"
  },
  {
    name: 'Chicken Nuggets',
    image: '/nuggets.jpg',
    price: '$3.99',
    label: null
  },
  {
    name: 'Cheesy Fries',
    image: '/fries1.jpg',
    price: '$2.99',
    label: "10% OFF"
  },
   {
    name: 'Spring Rolls',
    image: '/springroll.jpg',
    price: '$2.99',
    label: "NEW"
  },
   
]

export default function KidsMenu() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-12 px-6"
    >
      <h2
        className="text-3xl font-bold mb-6 text-center text-black tracking-wide drop-shadow-lg"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Kids Menu 
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {kidsItems.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="
              w-64 bg-white rounded-3xl shadow-lg
              overflow-hidden transition-all duration-300 group relative
            "
          >
            <div className="relative w-full h-44 overflow-hidden rounded-t-3xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* 🔖 Badge */}
{item.label && (
  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10">
    {item.label}
  </div>
)}
              {/* Name text at bottom-left */}
              <p className="absolute bottom-2 left-2 text-white text-lg font-semibold drop-shadow-md">
                {item.name}
              </p>
            </div>

            <div className="p-4 text-center">
              <p className="text-gray-600 mt-1 mb-3">{item.price}</p>
              <button className="bg-[#A94A4A] hover:bg-[#C5705D] text-white px-4 py-2 rounded-full transition font-medium shadow-md">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
