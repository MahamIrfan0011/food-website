'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...'); // ⬅️ Use your Stripe **Publishable Key**

export default function PaymentPage() {
  const { cart } = useCart();

  useEffect(() => {
    const redirectToCheckout = async () => {
      const stripe = await stripePromise;

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Stripe error: ' + data.error);
      }
    };

    if (cart.length > 0) {
      redirectToCheckout();
    }
  }, [cart]);

  return (
    <div className="text-center mt-20 text-xl">
      Redirecting to Stripe Checkout...
    </div>
  );
}
