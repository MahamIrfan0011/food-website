'use client';

import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart(); // Clear cart when payment successful

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart, router]);

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
            <p className="mt-2 text-gray-600">
              Thank you for your order. You’ll be redirected to home shortly...
            </p>

            {/* Back to Home Button */}
            <button
              onClick={() => router.push('/')}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
