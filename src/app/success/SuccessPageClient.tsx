'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function SuccessPageClient() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white p-6"
      >
        <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-green-600 mt-6">🎉 Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-md text-center">
          Thank you for your purchase.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </>
  );
}
