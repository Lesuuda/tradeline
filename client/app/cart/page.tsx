'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
  product: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCart: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (productId: string, quantity: number) => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });

    setCart([...cart, { product: productId, quantity }]);
  };

  const removeFromCart = async (productId: string) => {
    await fetch('/api/cart', {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' },
    });

    setCart(cart.filter((item) => item.product !== productId));
  };

  const updateCart = async (productId: string, quantity: number) => {
    await fetch('/api/cart', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });

    setCart(cart.map((item) => (item.product === productId ? { ...item, quantity } : item)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
