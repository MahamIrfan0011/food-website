'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessPageClient() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart(); // Cart clear karo
  }, [clearCart]);

  const handleGoHome = () => {
    // Full page reload ke saath home pe jayega
    window.location.href = '/';
  };

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-[80vh] flex flex-col items-center justify-center bg-green-50 p-6 text-center"
      >
        <CheckCircle className="text-green-600 w-16 h-16 animate-bounce" />
        <h1 className="text-3xl font-bold text-green-700 mt-4">🎉 Payment Successful!</h1>
        <p className="mt-2 text-gray-600 mb-6">Thank you for your order!</p>
        
        {/* Working Home Button */}
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}