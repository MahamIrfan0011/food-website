'use client'

import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const highlightItems = [
  {
    name: 'Special Offers',
    link: '/offers',
    image: '/offer.jpg',
    description: 'Check out amazing discounts and special deals just for you!',
    label: "30% OFF"
  },
  {
    name: 'Hot Deals',
    link: '/offers',
    image: '/dealpic.jpg',
    description: 'Grab these limited time hot deals before they vanish!',
    label: "20% OFF"
  },
]

export default function OffersDealsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
  {/* 🔹 Video Row Section */}
  <div className="flex flex-wrap justify-center gap-6 mt-20 px-4">
  {/* Video 1 linked */}
  <Link href="/offers" className="w-74 rounded-2xl overflow-hidden shadow-xl mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
      className="cursor-pointer"
    >
      <video
        src="/video.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover rounded-2xl"
      />
    </motion.div>
  </Link>

  {/* Video 2 linked */}
  <Link href="/menu" className="w-74 rounded-2xl overflow-hidden shadow-xl mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      className="cursor-pointer"
    >
      <video
        src="/video1.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover rounded-2xl"
      />
    </motion.div>
  </Link>

  {/* Video 3 linked */}
  <Link href="/menu" className="w-74 rounded-2xl overflow-hidden shadow-xl mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      viewport={{ once: true, amount: 0.5 }}
      className="cursor-pointer"
    >
      <video
        src="/video2.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover rounded-2xl"
      />
    </motion.div>
  </Link>
</div>

      {/* 👇 Your original offers section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="py-16 px-8 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-black mb-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Unlock Today’s Best Savings!
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {highlightItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="group perspective w-72 h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 cursor-pointer rounded-3xl shadow-lg overflow-hidden">
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {item.label && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10">
                      {item.label}
                    </div>
                  )}
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-3 text-xl font-semibold">
                    {item.name}
                  </div>
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white p-6 flex flex-col justify-center items-center rounded-3xl shadow-lg">
                  <p className="text-gray-800 text-center mb-4">{item.description}</p>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition">
                    Explore Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <style jsx>{`
          .perspective {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </motion.div>
    </>
  )
}
