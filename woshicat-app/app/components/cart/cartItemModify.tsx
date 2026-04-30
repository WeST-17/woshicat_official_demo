'use client';
import React, { useState, useEffect } from 'react';
import { updateCartQuantity } from '@/app/server_actions/action';
import { useCart } from './cartContext';
import Image from 'next/image';
import { DarkMode } from '../toggles/Dark_Mode/darkModeContext';

interface QuantityAdjusterProps {
  variantId: string;
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ variantId, initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [itemQuantLoad, setItemQuantLoad] = useState<boolean>(false);
  const { setCartUpdated, setCartItemsLoading, cartItems } = useCart();
  const { darkMode } = DarkMode();

  useEffect(() => {
    setItemQuantLoad(true);
    const updateQuantity = async () => {
      const newQuantity = initialQuantity;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setCartUpdated(true);
    }
    
    if (initialQuantity != quantity) {
      console.log("previous item quantity - ", quantity);
      updateQuantity();
      console.log('new - ', variantId, ": ",initialQuantity);
    }
    setTimeout(() => {
      setItemQuantLoad(false); // Delay resetting to false
    }, 500);
  }, [initialQuantity]);

  const handleIncrement = async () => {
    try {
      setCartItemsLoading(true);
      setItemQuantLoad(true);
      const newQuantity = quantity + 1;
      await updateCartQuantity(variantId, newQuantity);
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setCartUpdated(true);
      setItemQuantLoad(false);
      setCartItemsLoading(false);
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      setItemQuantLoad(true);
      setCartItemsLoading(true)
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        await updateCartQuantity(variantId, newQuantity);
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
      } else {
        console.log("Item removed from your cart!")
        await updateCartQuantity(variantId, 0);
      }
      setCartUpdated(true);
      setItemQuantLoad(false);
      setCartItemsLoading(false);
    } catch (error) {
      console.error('Error decrementing quantity or removing item:', error);
    }
  };

  const handleDeleteItem = async () => {
    setItemQuantLoad(true);
    try {
      if (quantity >= 1) {
        console.log("Item removed from your cart!")
        await updateCartQuantity(variantId, 0);
        // Handle cart update logic here if needed
      
      } else {
        return;
      }
      setCartUpdated(true);
      setItemQuantLoad(false);
      
    } catch (error) {
      console.error('Error decrementing quantity or removing item:', error);
    }
  }

  const checkInventory = () => {
    const itemQuantity = cartItems.filter((item: any) => item.variantId === variantId);
    return itemQuantity[0].inventoryAvailable <= quantity;
  }
  
  return (
    <div className="flex max-md:flex-col items-center justify-center w-fit h-full">
      <div className={`gap-1 flex justify-center ${darkMode ? 'text-stone-200' : 'text-black'}`}>
        <button
          onClick={handleDecrement}
          className={`flex justify-center items-center h-8 w-8 transition duration-300 rounded-l-md ${itemQuantLoad === false ? `'opacity-100' ${darkMode ? 'hover:bg-white/25' : ' hover:bg-black/25'}` : 'opacity-10 pointer-events-none'}`}
          disabled={itemQuantLoad === true}
        >
          -
        </button>
        <span className="text-sm w-8 h-8 p-1 flex justify-center items-center border-[0.5px] rounded-sm">
          {itemQuantLoad === false ? quantity : <div className='loader-item-change'/>}
        </span>
        <button
          onClick={handleIncrement}
          className={`flex justify-center items-center h-8 w-8 transition duration-300 rounded-r-md ${!checkInventory() && itemQuantLoad === false ? `'opacity-100' ${darkMode ? 'hover:bg-white/25' : ' hover:bg-black/25'}` : 'opacity-40 pointer-events-none'}`}
          disabled={itemQuantLoad === true || checkInventory()}
        >
          +
        </button>
      </div>
      <button
        onClick={handleDeleteItem}
        className={`flex flex-col justify-center items-center hover:bg-stone-200/35 transition duration-300 text-[0.5rem] h-10 w-10 lg:h-12 lg:w-12 max-lg:mt-2 rounded-md ${itemQuantLoad === false ? `'opacity-100' ${darkMode ? 'hover:bg-white/25' : ' hover:bg-black/25'}` : 'opacity-40'} ${darkMode ? 'text-stone-200' : 'text-black'}`}
        disabled={itemQuantLoad === true}
      >
        <Image
          src={'/icons/Woshi Trash.png'}
          alt={'trashcan icon, yoyo trash'}
          width={25}
          height={1}
          className=''
        />
        Remove
      </button>
    </div>
  );
};

export default QuantityAdjuster;