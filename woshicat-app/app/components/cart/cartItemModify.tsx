'use client';
import React, { useState, useEffect } from 'react';
import { incrementQuantity, decrementQuantity, removeItemCart, getItemQuantityCart } from '@/app/action';
import { useCart } from './cartContext';
import Image from 'next/image';

interface QuantityAdjusterProps {
  lineItemID: string;
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({ lineItemID, initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [itemQuantLoad, setItemQuantLoad] = useState<boolean>(false);
  const { setCartUpdated, setCartItemsLoading } = useCart();

  useEffect(() => {
    setItemQuantLoad(true);
    const updateQuantity = async () => {
      const newQuant = await getItemQuantityCart(lineItemID);
      console.log('new quant:', newQuant, 'old quantity: ', quantity)
      if (newQuant !== quantity) {
        setQuantity(newQuant);
        onQuantityChange(newQuant);
      }
      setCartUpdated(true);
    }
    
    if (initialQuantity != quantity) {
      updateQuantity();
    }
    setTimeout(() => {
      setItemQuantLoad(false); // Delay resetting to false
    }, 1000);
  }, [initialQuantity]);

  const handleIncrement = async () => {
    try {
      setCartItemsLoading(true);
      setItemQuantLoad(true);
      await incrementQuantity(lineItemID);
      const itemQuantity = quantity + 1;
      const newQuantity = itemQuantity;
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
        await removeItemCart(lineItemID);
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

  return (
    <div className="flex items-center">
      <p className='text-sm mr-2'>Quantity</p>
      <button
        onClick={handleDecrement}
        className={`px-2 py-1 text-black hover:scale-[1.2] transition duration-300 ${itemQuantLoad === false ? 'opacity-100' : 'opacity-50'}`}
        disabled={itemQuantLoad === true}
      >
        -
      </button>
      <span className="text-sm w-10 flex justify-center">{itemQuantLoad === false ? quantity : <div className='loader-item-change'/>}</span>
      <button
        onClick={handleIncrement}
        className={`px-2 py-1 text-black hover:scale-[1.2] transition duration-300 ${itemQuantLoad === false ? 'opacity-100' : 'opacity-50'}`}
        disabled={itemQuantLoad === true}
      >
        +
      </button>
      <button
        onClick={handleDeleteItem}
        className={`absolute flex flex-col justify-center items-center right-0 bottom-0 text-black hover:bg-stone-400/25 transition duration-300 text-xs px-2 py-1 m-5 rounded-md ${itemQuantLoad === false ? 'opacity-100' : 'opacity-50'}`}
        disabled={itemQuantLoad === true}
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