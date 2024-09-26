'use client';
import React, { useState } from 'react';
import { incrementQuantity, decrementQuantity, removeItemCart } from '@/app/action';
import { useCart } from './cartContext';

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
        className="px-2 py-1 text-black hover:scale-[1.05] transition duration-300"
      >
        {'[trash]'}
      </button>
    </div>
  );
};

export default QuantityAdjuster;
