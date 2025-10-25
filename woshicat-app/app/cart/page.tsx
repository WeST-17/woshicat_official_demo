'use client';
import React from "react";
import MobileCart from "../components/cart/MobileCart";

const CartPage = () => {
  
  return (
    <>
    <main className="w-full relative h-fit overflow-y-scroll">
      <div className="relative overflow-y-scroll w-full h-fit lg:w-1/2 mx-auto flex flex-col items-start relative bg-white/95 rounded-lg mt-[80px]"> 
        <MobileCart />
      </div>
    </main>
    </>
  );
}

export default CartPage;