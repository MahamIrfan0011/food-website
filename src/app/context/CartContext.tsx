'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface Product {
  id: string;       
  name: string;     
  price: number;
  image: string;
  quantity?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;         // name se remove karenge
  updateQuantity: (productName: string, quantity: number) => void; // name se quantity update karenge
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  lastAddedItem: Product | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: Product) => {
    const quantityToAdd = newItem.quantity || 1;
    setLastAddedItem(newItem);
    setCart((prevCart) => {
      // name se match kar rahe hain
      const existingItem = prevCart.find((item) => item.name === newItem.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prevCart, { ...newItem, quantity: quantityToAdd }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        isCartOpen,
        toggleCart,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
