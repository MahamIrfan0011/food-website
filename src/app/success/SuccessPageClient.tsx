'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessPageClient() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Run this effect safely
    const handleRedirect = async () => {
      try {
        // Await clearCart if it's async, or remove await if it's not
        await clearCart();
        console.log('Cart cleared successfully');

        const timer = setTimeout(() => {
          console.log('Redirecting to home...');
          router.replace('/'); // More reliable than push in some cases
        }, 3000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error clearing cart or redirecting:', error);
      }
    };

    handleRedirect();
  }, [clearCart, router]);

  return (
  <div className="pt-20"> {/* Add padding top to make space for fixed navbar */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[80vh] flex flex-col items-center justify-center bg-green-50 p-6"
    >
      <CheckCircle className="text-green-600 w-16 h-16 animate-bounce" />
      <h1 className="text-3xl font-bold text-green-700 mt-4">🎉 Payment Successful!</h1>
      <p className="mt-2 text-gray-600">You’ll be redirected to home shortly...</p>
    </motion.div>
  </div>
);
}
