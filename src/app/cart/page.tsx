'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const handleCheckout = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ Stripe checkout redirect
    } else {
      console.error("Checkout session creation failed", data.error);
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          padding: 30,
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          color: '#555',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '2.5rem', marginBottom: 10, color: '#333' }}
          className='mt-12 '
        >
          Ready to Dig In?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: '1.2rem' }}
          className="text-center text-gray-600 mb-10 text-2xl text-bold"
        >
          Your cart is empty
        </motion.p>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 700,
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: '2.5rem',
          marginBottom: 30,
          textAlign: 'center',
          color: '#2c3e50',
          fontWeight: '700',
          fontFamily: 'Poppins, sans-serif',
        }}
        className="mt-12"
      >
        Ready to Dig In?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-gray-600 mb-10 text-2xl text-bold"
      >
        Almost There – Let’s Checkout!
      </motion.p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(item => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f9f9f9',
              borderRadius: 10,
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              padding: 20,
              marginBottom: 20,
              transition: 'transform 0.2s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              style={{ borderRadius: '12px', objectFit: 'cover' }}
            />
            <div style={{ marginLeft: 25, flexGrow: 1 }}>
              <h2 style={{ margin: '0 0 8px', color: '#34495e' }}>{item.name}</h2>
              <p style={{ margin: '4px 0', color: '#7f8c8d', fontWeight: '600' }}>
                Price: <span style={{ color: '#27ae60' }}>${item.price.toFixed(2)}</span>
              </p>
              <p style={{ margin: '4px 0', color: '#7f8c8d', fontWeight: '600' }}>
                Quantity: <span>{item.quantity}</span>
              </p>
              <p style={{ margin: '4px 0', fontWeight: '700', fontSize: '1.1rem', color: '#2c3e50' }}>
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                backgroundColor: '#A94A4A',
                border: 'none',
                color: 'white',
                padding: '10px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C5705D')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#A94A4A')}
              aria-label={`Remove ${item.name} from cart`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3
        style={{
          textAlign: 'right',
          fontSize: '1.6rem',
          fontWeight: '700',
          color: '#34495e',
          marginTop: 20,
          borderTop: '2px solid #ddd',
          paddingTop: 15,
        }}
      >
        Total Price: ${totalPrice.toFixed(2)}
      </h3>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: '#2ecc71',
            border: 'none',
            color: 'white',
            padding: '12px 20px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2ecc71')}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
