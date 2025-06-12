// app/contact/page.tsx
'use client'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all fields')
      setStatus('idle')
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // simulate API call
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 bg-white rounded-lg shadow-md mt-24">
      
      {/* Left side: Contact info */}
      <div className="md:w-1/3 p-6 bg-gray-50 rounded-lg shadow-sm flex flex-col justify-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
        <p className="mb-4 text-gray-600">We'd love to hear from you! Reach out with any questions or feedback.</p>

        <div className="space-y-4 text-gray-700 text-base">
          <div>
            <strong>📞 Phone:</strong> <a href="tel:+923001234567" className="underline hover:text-gray-900">+92 300 1234567</a>
          </div>
          <div>
            <strong>✉️ Email:</strong> <a href="mailto:info@yumongo.com" className="underline hover:text-gray-900">info@yumongo.com</a>
          </div>
          <div>
            <strong>📍 Address:</strong> <p>Karachi, Pakistan</p>
          </div>
        </div>
      </div>

      {/* Right side: Contact form */}
      <form
        onSubmit={handleSubmit}
        className="md:w-2/3 bg-gray-50 p-8 rounded-lg shadow-sm space-y-6"
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="w-full px-4 py-3 rounded border border-gray-300 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:scale-105 focus:shadow-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="w-full px-4 py-3 rounded border border-gray-300 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:scale-105 focus:shadow-lg"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Write your message here..."
            required
            className="w-full px-4 py-3 rounded border border-gray-300 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:scale-105 focus:shadow-lg"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-gray-800 text-white font-semibold py-3 rounded hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="mt-4 text-green-600 font-semibold">Thank you! Your message has been sent.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 font-semibold">Oops! Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
    <Footer />
    </>
  )
}
