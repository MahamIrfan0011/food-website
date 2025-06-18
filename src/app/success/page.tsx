'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart();
    const timer = setTimeout(() => {
      router.push('/'); // Auto navigate to home
    }, 2000); // ⏱ wait 2 seconds

    return () => clearTimeout(timer);
  }, [clearCart, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white p-6"
    >
      <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
      <h1 className="text-4xl font-extrabold text-green-600 mt-6">🎉 Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-md text-center">
        Thank you for your purchase. You’ll be redirected to home shortly.
      </p>
      <div className="mt-8">
        <button
          onClick={() => router.push('/')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
}
