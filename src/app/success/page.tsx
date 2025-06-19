'use client';

import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // clear cart only once on success
  }, [clearCart]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '64px' }} className="mt-3">
        <SearchBar />
        <div className="px-4 py-12 max-w-6xl mx-auto mt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6"
          >
            <CheckCircle className="text-green-600 w-16 h-16 animate-bounce" />
            <h1 className="text-3xl font-bold text-green-700 mt-4">🎉 Payment Successful!</h1>
            <p className="mt-2 text-gray-600">Thank you for your order.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
