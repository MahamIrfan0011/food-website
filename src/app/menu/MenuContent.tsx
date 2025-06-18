'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { useCart } from '../context/CartContext'

const menuItems = [
  { id: 1, name: 'Cheese Burger', category: 'burger', price: '$5.99', image: '/cheeseburger.jpg', badge: 'Hot' },
  { id: 2, name: 'Chicken Fajita Pizza', category: 'pizza', price: '$9.99', image: '/pizza1.jpg', badge: 'New' },
  { id: 3, name: 'Veggie Pizza', category: 'pizza', price: '$8.99', image: '/vigge.jpg', badge: '' },
  { id: 4, name: 'Spring Roll', category: 'snack', price: '$3.99', image: '/springroll.jpg', badge: '' },
  { id: 5, name: 'Beef Burger', category: 'burger', price: '$6.99', image: '/beef.jpg', badge: 'Best Seller' },
  { id: 6, name: 'Chicken Tikka Pizza', category: 'pizza', price: '$7', image: '/pizza.jpg', badge: 'New' },
  { id: 7, name: 'Cheesy Melt Burger', category: 'burger', price: '$6.99', image: '/cheeseburger1.jpg', badge: 'Best Seller' },
  { id: 8, name: 'Double Decker Burger', category: 'burger', price: '$6.99', image: '/double.jpg', badge: '' },
  { id: 9, name: 'Crunchy Chicken Fillet', category: 'burger', price: '$7.99', image: '/chicken.jpg', badge: 'New' },
  { id: 10, name: 'Mushroom Swiss Burger', category: 'burger', price: '$5.99', image: '/mushroom.jpg', badge: 'Best Seller' },
  { id: 11, name: 'Veggie Supreme Burger', category: 'burger', price: '$6.99', image: '/viggeburger.jpg', badge: 'Best Seller' },
  { id: 12, name: 'BBQ Chicken Pizza', category: 'pizza', price: '$12', image: '/BBQ.jpg', badge: 'Best Seller' },
  { id: 13, name: 'Four Cheese Pizza', category: 'pizza', price: '$12', image: '/spicy.jpg', badge: '' },
  { id: 14, name: 'Hot & Spicy Pizza', category: 'pizza', price: '$15', image: '/hot.jpg', badge: 'New' },
  { id: 15, name: 'Loaded Fries', category: 'snack', price: '$10', image: '/fries1.jpg', badge: 'New' },
  { id: 16, name: 'French Fries', category: 'snack', price: '$8', image: '/fries.jpg', badge: '' },
  { id: 17, name: 'Chicken Nuggets', category: 'snack', price: '$12', image: '/nuggets.jpg', badge: 'Popular' },
  { id: 18, name: 'Lasagna', category: 'snack', price: '$12', image: '/lasagna.jpg', badge: '' },
  { id: 19, name: 'Nachos', category: 'snack', price: '$6', image: '/nachos.jpg', badge: '' },
  { id: 20, name: 'Pasta', category: 'snack', price: '$15', image: '/pasta.jpg', badge: 'Best Seller' },
  { id: 21, name: 'Garlic Bread', category: 'snack', price: '$10', image: '/bread.jpg', badge: 'New' },
  { id: 22, name: 'Strawberry Shake', category: 'beverage', price: '$10', image: '/shake.jpg', badge: 'New' },
  { id: 23, name: 'Lemonade', category: 'beverage', price: '$10', image: '/lemon.jpg', badge: 'New' },
  { id: 24, name: 'Orange Juice', category: 'beverage', price: '$10', image: '/orange.jpg', badge: '' },
  { id: 25, name: 'Cold Coffee', category: 'beverage', price: '$10', image: '/coffee.jpg', badge: 'New' },
  { id: 26, name: 'Strawberry Cheesecake', category: 'dessert', price: '$15', image: '/cheese.jpg', badge: 'Best Seller' },
  { id: 27, name: 'Icecream Sandwich', category: 'dessert', price: '$13', image: '/icesand.jpg', badge: 'New' },
  { id: 28, name: 'Chocolate Cake', category: 'dessert', price: '$25', image: '/cake.jpg', badge: '' },
  { id: 29, name: 'Donut', category: 'dessert', price: '$15', image: '/donut.jpg', badge: 'Popular' },
  { id: 30, name: 'Macaroons', category: 'dessert', price: '$20', image: '/macarons.jpg', badge: 'New' },
  { id: 31, name: 'Sandwich', category: 'snack', price: '$20', image: '/sandwich.jpg', badge: '' },
  { id: 32, name: 'Spaghetti', category: 'snack', price: '$60', image: '/spaghetti.jpg', badge: 'New' },
  { id: 33, name: 'Beef Spaghetti', category: 'snack', price: '$90', image: '/spaghetti1.jpg', badge: 'New' },
  { id: 34, name: 'Oyster Fish', category: 'seafood', price: '$120', image: '/seafood.jpg', badge: 'New' },
]

export default function MenuContent() {
  const { addToCart } = useCart()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState(menuItems)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted) {
      const q = searchParams.get('search')?.toLowerCase() || ''
      setSearchQuery(q)
    }
  }, [searchParams, hasMounted])

  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(
        menuItems.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery)
        )
      )
    } else {
      setFilteredItems(menuItems)
    }
  }, [searchQuery])

  if (!hasMounted) return null

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '64px' }} className="mt-3">
        <SearchBar />
        <div className="px-4 py-12 max-w-6xl mx-auto mt-4">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-black"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            One Click, Endless Flavors!
          </motion.h1>

          <motion.p
            className="text-center text-gray-600 mb-10 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Satisfy your hunger with mouthwatering burgers, cheesy pizzas,
            crispy snacks & sweet treats!
          </motion.p>

          {searchQuery && (
            <p className="mb-6 text-center text-gray-500">
              Showing results for:{' '}
              <strong className="text-black">{searchQuery}</strong>
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="border rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  <div className="relative w-full h-64 transform transition-transform duration-300 hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {item.badge && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow z-10">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-500 text-sm capitalize">
                      Category: {item.category}
                    </p>
                    <p className="text-gray-600 font-bold text-lg mt-1">
                      {item.price}
                    </p>
                    <button
                      className="mt-3 bg-[#A94A4A] hover:bg-[#C5705D] text-white px-4 py-2 rounded-full transition font-medium shadow animate-bounce"
                      onClick={() =>
                        addToCart({
                          id: String(item.id),
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
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No menu items found.
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
