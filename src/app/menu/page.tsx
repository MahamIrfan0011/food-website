'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

const menuItems = [
  {
    name: 'Cheese Burger',
    category: 'burger',
    price: '$5.99',
    image: '/cheeseburger.jpg',
    badge: 'Hot',
  },
  {
    name: 'Chicken Fajita Pizza',
    category: 'pizza',
    price: '$9.99',
    image: '/pizza1.jpg',
    badge: 'New',
  },
  {
    name: 'Veggie Pizza',
    category: 'pizza',
    price: '$8.99',
    image: '/vigge.jpg',
    badge: '',
  },
  {
    name: 'Spring Roll',
    category: 'snacks',
    price: '$3.99',
    image: '/springroll.jpg',
    badge: '',
  },
  {
    name: 'Beef Burger',
    category: 'burger',
    price: '$6.99',
    image: '/beef.jpg',
    badge: 'Best Seller',
  },
  {
    name: 'Chicken Tikka Pizza',
    category: 'pizza',
    price: '$7',
    image: '/pizza.jpg',
    badge: "New",
  },
   {
    name: 'Cheesy Melt Burger',
    category: 'burger',
    price: '$6.99',
    image: '/cheeseburger1.jpg',
    badge: "Best Seller",
  },
  {
    name: 'Double Decker Burger',
    category: 'burger',
    price: '$6.99',
    image: '/double.jpg',
    badge: "",
  },
  {
    name: 'Crunchy Chicken Fillet',
    category: 'burger',
    price: '$7.99',
    image: '/chicken.jpg',
    badge: "New",
  },
  {
    name: 'Mushroom Swiss Burger',
    category: 'burger',
    price: '$5.99',
    image: '/mushroom.jpg',
    badge: "Best Seller",
  },
   {
    name: 'Veggie Supreme Burger',
    category: 'burger',
    price: '$6.99',
    image: '/viggeburger.jpg',
    badge: "Best Seller",
  },
  {
    name: 'BBQ Chicken Pizza',
    category: 'pizza',
    price: '$12',
    image: '/BBQ.jpg',
    badge: "Best Seller",
  },
  {
    name: 'Four Cheese Pizza',
    category: 'pizza',
    price: '$12',
    image: '/spicy.jpg',
    badge: "",
  },
   {
    name: 'Hot & Spicy Pizza',
    category: 'pizza',
    price: '$15',
    image: '/hot.jpg',
    badge: "New",
  },
  {
    name: 'Loaded Fries',
    category: 'snack',
    price: '$10',
    image: '/fries1.jpg',
    badge: "New",
  },
  {
    name: 'French Fries',
    category: 'snack',
    price: '$8',
    image: '/fries.jpg',
    badge: "",
  },
  {
    name: 'Chicken Nuggets',
    category: 'snack',
    price: '$12',
    image: '/nuggets.jpg',
    badge: "Popular",
  },
  {
    name: 'Lasagna',
    category: 'snack',
    price: '$12',
    image: '/lasagna.jpg',
    badge: "",
  },
  {
    name: 'Nachos',
    category: 'snack',
    price: '$6',
    image: '/nachos.jpg',
    badge: "",
  },
  {
    name: 'Pasta',
    category: 'snack',
    price: '$15',
    image: '/pasta.jpg',
    badge: "Best Seller",
  },
  {
    name: 'Garlic Bread',
    category: 'snack',
    price: '$10',
    image: '/bread.jpg',
    badge: "New",
  },
  {
    name: 'strawberry Shake',
    category: 'beverages',
    price: '$10',
    image: '/shake.jpg',
    badge: "New",
  },
  {
    name: 'Lemonade',
    category: 'beverages',
    price: '$10',
    image: '/lemon.jpg',
    badge: "New",
  },
  {
    name: 'Orange Juice',
    category: 'beverages',
    price: '$10',
    image: '/orange.jpg',
    badge: "",
  },
  {
    name: 'Cold Coffee',
    category: 'beverages',
    price: '$10',
    image: '/coffee.jpg',
    badge: "New",
  },
  {
    name: 'Strawberry Cheesecake',
    category: 'desserts',
    price: '$15',
    image: '/cheese.jpg',
    badge: "Best Seller",
  },
  {
    name: 'Icecream Sandwich',
    category: 'desserts',
    price: '$13',
    image: '/icesand.jpg',
    badge: "New",
  },
  {
    name: 'Chocolate Cake',
    category: 'desserts',
    price: '$25',
    image: '/cake.jpg',
    badge: "",
  },
  {
    name: 'Donut',
    category: 'desserts',
    price: '$15',
    image: '/donut.jpg',
    badge: "Popular",
  },
  {
    name: 'Macaroons',
    category: 'desserts',
    price: '$20',
    image: '/macarons.jpg',
    badge: "New",
  },
  {
    name: 'Sandwich',
    category: 'snack',
    price: '$20',
    image: '/sandwich.jpg',
    badge: "",
  },
  {
    name: 'Spaghetti',
    category: 'snack',
    price: '$60',
    image: '/spaghetti.jpg',
    badge: "New",
  },
  {
    name: 'Beef Spaghetti',
    category: 'snack',
    price: '$90',
    image: '/spaghetti1.jpg',
    badge: "New",
  },
  {
    name: 'Oyster Fish',
    category: 'seafood',
    price: '$120',
    image: '/seafood.jpg',
    badge: "New",
  },
]

export default function MenuPage() {
 const searchParams = useSearchParams()
const [searchQuery, setSearchQuery] = useState('')

useEffect(() => {
  const query = searchParams.get('search')?.toLowerCase() || ''
  setSearchQuery(query)
}, [searchParams])
  const [filteredItems, setFilteredItems] = useState(menuItems)

  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(
        menuItems.filter(item =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.category.toLowerCase().includes(searchQuery)
        )
      )
    } else {
      setFilteredItems(menuItems)
    }
  }, [searchQuery])

  return (
    <>
    <Navbar />
     <div style={{ paddingTop: '64px' }}className='mt-3'>
  <SearchBar />
    <div className="px-4 py-12 max-w-6xl mx-auto mt-4">
      {/* Catchy Animated Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-center mb-4 text-black"style={{ fontFamily: 'Poppins, sans-serif' }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        One Click, Endless Flavors!
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-center text-gray-600 mb-10 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Satisfy your hunger with mouthwatering burgers, cheesy pizzas, crispy snacks & sweet treats!
      </motion.p>

      {/* Search query info */}
      {searchQuery && (
        <p className="mb-6 text-center text-gray-500">
          Showing results for: <strong className="text-black">{searchQuery}</strong>
        </p>
      )}

      {/* Menu grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.length ? (
          filteredItems.map((item, i) => (
            <motion.div
              key={i}
              className="border rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Image with Badge */}
              <div className="relative w-full h-64 transform transition-transform duration-300 hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
                {item.badge && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold  px-3 py-1 rounded-md shadow z-10">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm capitalize">Category: {item.category}</p>
                <p className="text-pink-600 font-bold text-lg mt-1">{item.price}</p>
                <button
                  className="mt-3 bg-[#A94A4A] hover:bg-[#C5705D] text-white px-4 py-2 rounded-full transition font-medium shadow animate-bounce"
                  onClick={() => alert(`Added ${item.name} to cart!`)}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No menu items found.</p>
        )}
      </div>
    </div>
    <Footer />
    </div>
    </>

  )
}