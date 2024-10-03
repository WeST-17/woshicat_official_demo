'use client';
import React, { useState, useEffect } from 'react';
import { incrementQuantity, decrementQuantity, removeItemCart } from '@/app/action';
import { useCart } from './cartContext';
import Image from 'next/image';

interface QuantityAdjusterProps {
  lineItemID: string;
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ lineItemID, initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { setCartUpdated, setCartItemsLoading } = useCart();

  const handleIncrement = async () => {
    try {
      setCartItemsLoading(true);
      await incrementQuantity(lineItemID);
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setCartUpdated(true);
      setCartItemsLoading(false);
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      if (quantity > 1) {
        setCartItemsLoading(true)
        await decrementQuantity(lineItemID);
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
      } else {
        console.log("Item removed from your cart!")
        await removeItemCart(lineItemID);
        // Handle cart update logic here if needed
      }
      setCartUpdated(true);
      setCartItemsLoading(false);
    } catch (error) {
      console.error('Error decrementing quantity or removing item:', error);
    }
  };

  const handleDeleteItem = async () => {
    setCartItemsLoading(true);
    try {
      if (quantity >= 1) {
        console.log("Item removed from your cart!")
        await removeItemCart(lineItemID);
        // Handle cart update logic here if needed
      } else {
        return
      }
      setCartUpdated(true);
      setCartItemsLoading(false);
    } catch (error) {
      console.error('Error decrementing quantity or removing item:', error);
    }
  }

  return (
    <div className="flex items-center">
      <p className='text-sm mr-2'>Quantity:</p>
      <button
        onClick={handleDecrement}
        className="px-2 py-1 text-black hover:scale-[1.2] transition duration-300"
      >
        -
      </button>
      <span className="px-4 text-sm">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="px-2 py-1 text-black hover:scale-[1.2] transition duration-300"
      >
        +
      </button>
      <button
        onClick={handleDeleteItem}
        className="absolute flex flex-col justify-center items-center right-0 bottom-0 text-black hover:bg-stone-400/25 transition duration-300 text-xs px-2 py-1 m-5 rounded-md"
      >
        <Image
          src={'/icons/Woshi Trash.png'}
          alt={'trashcan icon, yoyo trash'}
          width={35}
          height={1}
          className=''
        />
        Remove
      </button>
    </div>
  );
};

export default QuantityAdjuster;