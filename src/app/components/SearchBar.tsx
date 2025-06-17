'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaShoppingCart } from 'react-icons/fa'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/menu?search=${encodeURIComponent(query.trim())}`)
  }

  const handleCartClick = () => {
    router.push('/cart')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center gap-2 px-4 my-4 w-full max-w-[90%] md:max-w-[600px] mx-auto"
    >
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search menu..."
        className="border border-gray-300 rounded px-3 py-2 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-[#E5D0AC]"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-[#D7B26D] text-white px-4 py-2 rounded-md hover:bg-[#E5D0AC] transition text-sm md:text-base"
      >
        Search
      </button>

      {/* Cart Icon */}
      <FaShoppingCart
        onClick={handleCartClick}
        className="text-gray-700 ml-0 cursor-pointer transition text-5xl md:text-4xl ml-9"
        title="View Cart"
      />
    </form>
  )
}
