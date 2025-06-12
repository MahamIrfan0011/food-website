'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

const categories = [
  { name: 'Offers', image: '/offer.jpg', link: '/offers' , label: "HOT"},
  { name: 'Party Box', image: '/party.jpg', link: '/partybox', label: "NEW" },
  { name: 'Deals', image: '/dealpic.jpg', link: '/deals', label: null },
]

export default function CategorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-wrap justify-center gap-10 px-8 py-10"
    >
      {categories.map((cat, i) => (
        <Link
          key={i}
          href={cat.link}
          className="w-64 bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
          aria-label={`Go to ${cat.name} category`}
        >
          <div className="relative w-full h-74 overflow-hidden rounded-3xl">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              priority={i === 0}
            />
             {/* 🔖 Badge in top-left corner */}
  {cat.label && (
    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10">
      {cat.label}
    </div>
  )}
            {/* Name inside image div */}
            <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white text-lg font-semibold tracking-wide">
              {cat.name}
            </div>
          </div>
        </Link>
      ))}
    </motion.div>
  )
}

