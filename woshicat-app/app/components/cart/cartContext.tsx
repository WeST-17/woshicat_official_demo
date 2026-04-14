'use client';

// cartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart } from '@/app/server_actions/action';
import colors from '../colors';

interface CartContextType {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartUpdated: boolean;
  setCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItems[];
  setCart: React.Dispatch<React.SetStateAction<CartItems[]>>;
  cartItemsLoading: boolean;
  setCartItemsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  colorList: Map<any, string>;
  itemAdded: boolean;
  setItemAdded: React.Dispatch<React.SetStateAction<boolean>>;
  currentItem: {'name': string, 'quantity': number} | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<{'name': string, 'quantity': number} | null>>;
}

interface CartItems {
  cartLineId: string,
  quantity: number,
  variantId: string,
  variantTitle: string,
  inventoryAvailable: number,
  imageUrl: string,
  imageAlt: string,
  price: number
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [cartItems, setCart] = useState<CartItems[]>([]);
  const [cartItemsLoading, setCartItemsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [itemAdded, setItemAdded] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<{'name': string, 'quantity': number} | null>(null);
  const colorList = colors;
  
  
  useEffect(() => {
    const fetchCartItems = async () => {
        setCartItemsLoading(true);
        const items: CartItems[] = await getCart();
        setCart(items);
        setCartItemsLoading(false);
        setCartUpdated(false); // Reset cartUpdated after fetching
    };

    fetchCartItems(); 

    return () => { console.log("unmount / cleanup") };
  }, [cartUpdated]);

  useEffect(() => {
    const setBodyOverflow = () => {
      document.body.classList.toggle('overflow-hidden');
    };
    setBodyOverflow();

    return () => { console.log("unmount / cleanup") };
  }, [cartOpen]);

  

  return (
    <CartContext.Provider value={{ cartOpen, setCartOpen, cartUpdated, setCartUpdated, cartItems, setCart, cartItemsLoading, setCartItemsLoading, cartTotal, setCartTotal, progress, setProgress, colorList, itemAdded, setItemAdded, currentItem, setCurrentItem }}>
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
