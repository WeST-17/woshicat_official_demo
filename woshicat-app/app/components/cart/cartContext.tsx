'use client';

// cartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { displayCart } from '@/app/action';

interface CartContextType {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartUpdated: boolean;
  setCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItems[];
  setCart: React.Dispatch<React.SetStateAction<CartItems[]>>;
  cartItemsLoading: boolean;
  setCartItemsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CartItems {
  title: any;
  cartItemID: any;
  variantID: any;
  size: any;
  color: any;
  variantTitle: any;
  quantity: any;
  price: string;
  currency: any;
  image: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [cartItems, setCart] = useState<CartItems[]>([]);
  const [cartItemsLoading, setCartItemsLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
        setCartItemsLoading(true);
        const items = await displayCart();
        setCart(items);
        setCartUpdated(false); // Reset cartUpdated after fetching
        setCartItemsLoading(false);
    };
    
    fetchCartItems();
  }, [cartUpdated]);

  return (
    <CartContext.Provider value={{ cartOpen, setCartOpen, cartUpdated, setCartUpdated, cartItems, setCart, cartItemsLoading, setCartItemsLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
