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
    router.push('/cart') // Cart page pe redirect karwana
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4 items-center">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search menu..."
        className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#E5D0AC]"
      />
      <button
        type="submit"
        className="bg-[#D7B26D] text-white px-4 py-2 rounded-r-md hover:bg-[#E5D0AC] transition flex items-center justify-center"
      >
        Search
      </button>

      {/* Cart Icon */}
      <FaShoppingCart
        onClick={handleCartClick}
        className="ml-20 text-gray-700 cursor-pointer transition text-2xl"
        title="View Cart"
      />
    </form>
  )
}
 