'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image';

type Offer = {
  title: string
  description: string
  code: string
  expiry: string
  terms: string
  orderLink: string
  media?: string
}

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const daysLeft = (expiryDate: string) => {
    const diff = new Date(expiryDate).getTime() - now.getTime()
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0
  }

  const offers: Offer[] = [
    {
      title: '🍔 Buy 1 get 1 free on Burgers!',
      description: 'Use the code below to get buy one get one on all burger orders.',
      code: 'BURGER20',
      expiry: '2025-07-01',
      terms: 'Valid on orders above Rs. 500 only.',
      orderLink: '/menu#burgers',
      media: '/beef.jpg',
    },
    {
      title: '🍕 Buy 1 Get 1 Free Pizza',
      description: 'Order any medium pizza and get another free!',
      code: 'PIZZADEAL',
      expiry: '2025-06-20',
      terms: 'Available only on medium pizzas.',
      orderLink: '/menu#pizzas',
      media: '/two-pizza.jpg',
    },
    {
  title: '🧀 Extra Cheese at No Extra Cost!',
  description: 'Cheese lovers, this one’s for you!',
  code: 'CHEESY',
  expiry: '2025-07-18',
  terms: 'Available on selected pizzas only.',
  orderLink: '/menu',
  media: '/cheesy.jpg',
},
    {
      title: '🥤 Free Drink with Every Meal',
      description: 'Get a free soft drink with any meal order.',
      code: 'FREEDRINK',
      expiry: '2025-08-15',
      terms: 'One free drink per order only.',
      orderLink: '/menu#drinks',
      media: '/drink.jpg',
    },
    {
      title: '🌟 15% Off for New Customers',
      description: 'Welcome! Use this code to get 15% off on your first order.',
      code: 'WELCOME15',
      expiry: '2025-12-31',
      terms: 'Only for first-time customers.',
      orderLink: '/menu',
      media: '/discount.jpeg',
    },
    {
      title: '🍟 Free Fries on Orders Above Rs. 800',
      description: 'Enjoy free fries when you spend more than Rs. 800.',
      code: 'FRIES800',
      expiry: '2025-09-30',
      terms: 'Valid on orders above Rs. 800.',
      orderLink: '/menu#sides',
      media: '/free-fries.jpeg',
    },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-16">
        {/* Catchy Animated Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-center mb-4 text-black"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          Grab These Exclusive Offers Now!
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-center text-gray-600 mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Deals this good won’t last forever — grab yours today!
        </motion.p>

        {/* Grid with 2 columns */}
        <div className="grid gap-8 sm:grid-cols-2">
          {offers.map((offer, i) => {
            const left = daysLeft(offer.expiry)
            const expired = left === 0

            return (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-white flex flex-col"
                style={{ minHeight: '500px', color: 'black' }}
              >
                {/* Large Image */}
                <Image
                  src={offer.media || '/assets/default.jpg'}
                  alt={offer.title}
                  width={600}
                  height={400}
                  className="w-full object-cover rounded-t-xl"
                />

                {/* Content */}
                <motion.div
                  className="p-6 flex flex-col justify-between flex-grow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{offer.title}</h2>
                    <p className="mb-6 text-lg">{offer.description}</p>

                    <div className="mb-4 flex items-center">
                      <span className="inline-block bg-gray-200 text-black px-4 py-2 rounded font-mono text-xl select-all">
                        {offer.code}
                      </span>
                      <button
                        onClick={() => handleCopy(offer.code)}
                        className="ml-4 text-[#233714] hover:text-[#6B591D] underline text-lg"
                      >
                        {copiedCode === offer.code ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>

                    <p className="text-md">
                      <strong>Expires:</strong>{' '}
                      {expired ? (
                        <span className="text-red-500 font-semibold">Expired</span>
                      ) : (
                        new Date(offer.expiry).toLocaleDateString()
                      )}
                    </p>

                    {!expired && (
                      <p className="text-sm italic text-gray-600">
                        {left} day{left > 1 ? 's' : ''} left
                      </p>
                    )}

                    <p className="text-sm italic text-gray-600 mt-3">{offer.terms}</p>
                  </div>

                  <a
                    href={offer.orderLink}
                    className={`mt-8 inline-block text-center bg-[#A94A4A] hover:bg-[#C5705D] text-white font-semibold py-3 rounded-lg transition duration-200 ${
                      expired ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    Order Now →
                  </a>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}

