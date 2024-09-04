'use client';
import React, { useState } from 'react';
import { incrementQuantity, decrementQuantity, removeItemCart } from '@/app/action';
import { useCart } from './cartContext';

interface QuantityAdjusterProps {
  variantID: string;
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ variantID, initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { setCartUpdated } = useCart();

  const handleIncrement = async () => {
    try {
      await incrementQuantity(variantID);
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
      setCartUpdated(true);
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      if (quantity > 1) {
        await decrementQuantity(variantID);
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
      } else {
        alert("Item removed from your cart!")
        await removeItemCart(variantID);
        // Handle cart update logic here if needed
      }
      setCartUpdated(true);
    } catch (error) {
      console.error('Error decrementing quantity or removing item:', error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
      >
        -
      </button>
      <span className="px-4">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;
