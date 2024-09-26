'use client';
import Link from "next/link";
import { FinalCheckout } from "@/app/action";
import { useCart } from './cartContext';
import QuantityAdjuster from "./cartItemModify";
import React, { useRef, useState } from 'react';

const Cart: React.FC = () => {
    const { cartOpen, setCartOpen, setCartUpdated, cartItems, cartItemsLoading, setCartItemsLoading } = useCart();
    const cartContainerRef = useRef<HTMLDivElement>(null);

    function formHandle(title: string) {
        const handle = title.split(' ').join('-');
        return handle;
    }

    const openCart = () => {
        setCartItemsLoading(true);
        setCartOpen(true);
        // Fetch cart items when the cart is opened
        setCartUpdated(true);
        setCartItemsLoading(false);
    }

    const closeCart = () => {
        if (cartContainerRef.current) {
            setCartOpen(false);
        }
    }

    const checkout = async () => {
        const checkoutUrl = await FinalCheckout();
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        } else {
            console.log("Cart, not cart. Noodles, not noodles...")
            return;
        }
    }


    return (
        <>
            {/* Button to Open Cart */}
            <button onClick={openCart} className={`cart_btn flex items-center justify-center text-xl pe-4`}>
                {'[cart]'}
            </button>

            {/* Cart Modal (Always Rendered) */}
            <div
                className={`fixed inset-0 z-[1100] flex justify-end items-center transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            >
                <div
                    className={`cart-container rounded-sm transition-transform duration-300 ease-in-out ${cartOpen ? 'open-cart' : 'close-cart'}`}
                    onClick={(e) => e.stopPropagation()}
                    ref={cartContainerRef}
                >
                    <h2 className="relative text-lg font-medium m-4 mb-8">Nice Cart</h2>
                    {/* Cart content */}
                        {cartItems.length > 0 ? (
                        <div className="cart-items gap-2">
                            {cartItems.map((item: any) => {
                                const handle = formHandle(item.title)
                                return (
                                <div key={item.cartItemID} className="cart-item p-4 hover:bg-stone-200 transition duration-300 flex items-center">
                                    
                                    <Link href={`/collections/${handle}`} passHref>
                                        <img
                                        src={item.image}
                                        alt={item.variantTitle}
                                        className="w-24 h-24 object-cover rounded-md mr-4"
                                        />
                                    </Link>
                                    <div>
                                    <h3 className="text-lg font-thin mb-2">{item.title}</h3>
                                    {item.size && item.size !== 'Default Title' && item.color && item.color !== 'N/A' && (
                                        <p className="text-md font-thin">{item.size} \ {item.color}</p>
                                    )}
                                    {/* Quantity adjuster component */}
                                    <QuantityAdjuster
                                        lineItemID={item.cartItemID}
                                        initialQuantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            console.log('Quantity changed to:', newQuantity);
                                        }}
                                    />
                                    </div>
                                </div>
                            )})}
                        </div>
                        ) : !cartItemsLoading ? (
                            <div className="w-full h-24 flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                          ) : (
                            <p className="text-sm font-thin text-gray-500 p-3">Your cart is empty.</p>
                          )}
                    
                    <button onClick={closeCart} className="absolute top-8 right-4 p-2 bg-stone-500 text-white font-thin rounded-md">
                        Close
                    </button>
                    {/* Centered Checkout Button */}
                    <div className="flex justify-center items-center mt-12">
                        <button onClick={checkout} className="px-4 py-2 bg-black text-white font-thin rounded-md w-80">Checkout</button>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
}

export default Cart;
