'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

export default function AddToCartPopup() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [justAddedIds, setJustAddedIds] = useState<string[]>([]);
  const router = useRouter();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }

    if (cart.length === 0) return;

    const lastItem = cart[cart.length - 1];
    if (!lastItem || justAddedIds.includes(lastItem.id)) return;

    setJustAddedIds(prev => [...prev, lastItem.id]);
    setVisible(true);
  }, [cart]);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
      setJustAddedIds([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || justAddedIds.length === 0) return null;

  const handleContinueShopping = () => setVisible(false);

  const handleProceedToCheckout = () => {
    router.push('/cart');
    setVisible(false);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white shadow-xl p-4 rounded-lg w-[90%] max-w-sm"
    >
      <h2 className="text-lg font-bold mb-2">Added to Cart</h2>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {cart
          .filter(item => justAddedIds.includes(item.id))
          .map(item => (
            <div key={item.id} className="flex gap-3 items-center border-b pb-2">
              <Image src={item.image} alt={item.name} width={50} height={50} />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-sm">Price: ${item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Delete ${item.name}`}
                    className="text-black/50"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleContinueShopping}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </button>
        <button
          onClick={handleProceedToCheckout}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

