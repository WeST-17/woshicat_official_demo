'use client';
import React, { useState, useEffect } from 'react';
import { updateCartQuantity } from '@/app/server_actions/action';
import { useCart } from './cartContext';
import Image from 'next/image';

interface QuantityAdjusterProps {
  variantId: string;
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ variantId, initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [itemQuantLoad, setItemQuantLoad] = useState<boolean>(false);
  const { setCartUpdated, setCartItemsLoading, cartItems } = useCart();

  useEffect(() => {
    setItemQuantLoad(true);
    const updateQuantity = async () => {
      const newQuantity = initialQuantity;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setCartUpdated(true);
    }
    
    if (initialQuantity != quantity) {
      console.log("old: ", initialQuantity);
      console.log('new: ', quantity);
      updateQuantity();
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
        return
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
    <div className="flex items-center justify-start w-full gap-2">
      <p className='text-sm'>Quantity</p>
      <button
        onClick={handleDecrement}
        className={`px-2 text-black transition duration-300 rounded-md ${itemQuantLoad === false ? 'opacity-100 hover:bg-black/25' : 'opacity-10 pointer-events-none'}`}
        disabled={itemQuantLoad === true}
      >
        -
      </button>
      <span className="text-sm w-6 flex justify-center">{itemQuantLoad === false ? quantity : <div className='loader-item-change'/>}</span>
      <button
        onClick={handleIncrement}
        className={`px-1 transition duration-300 rounded-md ${!checkInventory() && itemQuantLoad === false ? 'text-black opacity-100 hover:bg-black/25' : 'opacity-40 pointer-events-none'}`}
        disabled={itemQuantLoad === true || checkInventory()}
      >
        +
      </button>
      <button
        onClick={handleDeleteItem}
        className={`ms-auto flex flex-col justify-center items-center text-black hover:bg-stone-400/25 transition duration-300 text-xs px-2 py-1 rounded-md ${itemQuantLoad === false ? 'opacity-100' : 'opacity-50'}`}
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