'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCart } from '../context/CartContext'

const dessertItems = [
  {
    id: 1,
    name: 'Unicorn Sprinkle Donut',
    image: '/donut.jpg',
    price: '$2.49',
    label: null
  },
  {
    id: 2,
    name: 'Ice Cream Sandwich',
    image: '/icesand.jpg',
    price: '$3.19',
    label: "NEW"
  },
  {
    id: 3,
    name: 'Strawberry Cheesecake',
    image: '/cheese.jpg',
    price: '$2.89',
    label: "NEW"
  },
  {
    id: 4,
    name: 'Macaroons',
    image: '/macarons.jpg',
    price: '$3.49',
    label: "NEW"
  },
]

export default function DessertsSection() {
  const { addToCart } = useCart()
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
        className="text-3xl font-bold mb-6 text-center tracking-wide drop-shadow-lg text-black"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
         Desserts 
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {dessertItems.map((item) => (
  <motion.div
    key={item.id}  // id se unique key dena best practice hai
    whileHover={{ scale: 1.05 }}
    className="w-64 rounded-3xl shadow-lg overflow-hidden transition-all duration-300 group"
  >
            <div className="relative w-full h-44">
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
              <div className="absolute bottom-2 left-2 text-white text-lg font-semibold drop-shadow-md">
                {item.name}
              </div>
            </div>
            <div className="p-4 text-center bg-white border-t border-pink-100">
              <p className="text-gray-600 mt-1 mb-3">{item.price}</p>
              <button
                className="bg-[#A94A4A] hover:bg-[#C5705D] text-white px-4 py-2 rounded-full transition font-medium shadow-md"
                onClick={() =>
                  addToCart({
                    id:  String(item.id),
                    name: item.name,
                    price: parseFloat(item.price.replace('$', '')),
                    image: item.image,
                    
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
