'use client';
// import Link from "next/link";
import { FinalCheckout } from "@/app/action";
import { useCart } from './cartContext';
import QuantityAdjuster from "./cartItemModify";
import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";


const Cart: React.FC = () => {
    const { cartOpen, setCartOpen, setCartUpdated, cartItemsLoading, setCartItemsLoading, cartItems, cartTotal, setCartTotal } = useCart();
    const cartContainerRef = useRef<HTMLDivElement>(null);

    // function formHandle(title: string) {
    //     const handle = title.split(' ').join('-');
    //     return handle;
    // }

    const currFormat = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const calcTotal = async () => {
            let subtotal: number = 0;
            for (const item of cartItems) {
              subtotal += Number(item.price)*Number(item.quantity);
            }
            setCartTotal(subtotal);
        }

        calcTotal();
    }, [cartItems])

    const openCart = async () => {
        setCartOpen(true);
    }

    const closeCart = () => {
        if (cartContainerRef.current) {
            setCartOpen(false);
        }
    }

    
    const checkout = async () => {
        const checkoutUrl = await FinalCheckout();
        if (checkoutUrl && cartItems.length > 0) {
            window.location.href = checkoutUrl;
        } else {
            console.log("Cart, not cart. Noodles, not noodles...")
            return;
        }
    }


    return (
        <>
            {/* Button to Open Cart */}
            <button onClick={openCart} className={`relative cart_btn flex items-center justify-end text-xl`}>
                <Image
                    src={'/icons/Shopping_Cart_Yoyo.png'}
                    alt={'Yoyo pushing a shoppping cart'}
                    width={110}
                    height={1}
                    className={`relative hover:translate-x-2 border-b-2 border-transparent hover:border-stone-400 transition-all duration-300 ease-in-out ${cartItems.length > 0 ? '' : 'hidden'}`}
                />
                <Image
                    src={'/icons/Shopping_Cart_Empty.png'}
                    alt={'Yoyo pushing a shoppping cart'}
                    width={110}
                    height={1}
                    className={`hover:translate-x-2 border-b-2 border-transparent hover:border-stone-400 transition-all duration-300 ease-in-out ${cartItems.length > 0 ? 'hidden' : ''}`}
                />
            </button>

            {/* Cart Modal (Always Rendered) */}
            <div
                className={`fixed inset-0 z-[1100] flex justify-end items-center transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            >
                <div
                    className={`cart-container rounded-sm transition-transform duration-300 ease-in-out overscroll-none disable-scrollbars ${cartOpen ? 'open-cart' : 'close-cart'}`}
                    onClick={(e) => e.stopPropagation()}
                    ref={cartContainerRef}
                >
                    <button onClick={closeCart} className="absolute top-8 right-4 py-1 px-2 text-stone-400 font-thin">
                        <div className="w-8 h-8 flex justify-center items-center relative hover:bg-black/25 transition duration-300">
                            <span className="absolute top-0 flex bg-stone-500 w-8 h-[1px] rotate-45 translate-y-4"></span>
                            <span className="absolute top-0 flex bg-stone-500 w-8 h-[1px] -rotate-45 translate-y-4"></span>
                        </div>
                    </button>
                    <h2 className="sticky text-2xl font-medium m-10 mb-8">
                        Nice Cart
                    </h2>
                    {/* Cart content */}
                    {cartItems.length > 0 ? (
                    <div className="cart-items gap-2 overflow-none">
                        {cartItems.map((item: any) => {
                            
                            return (
                            <div key={item.cartItemID} className="relative cart-item p-4 hover:bg-stone-200 transition duration-300 flex items-center">
                                
                                <Link href={`https://woshicat.com/collections/${item.collection}/${item.handle}`} className="">
                                    <img
                                    src={item.image}
                                    alt={item.variantTitle}
                                    className="w-24 h-24 object-cover object-bottom rounded-md mr-4"
                                    />
                                </Link>
                                <div>
                                <h3 className="text-md font-thin mb-2">{item.title}</h3>
                                {item.size && item.size !== 'Default Title' && item.color && item.color !== 'N/A' && (
                                    <p className="text-sm font-thin">{item.size} \ {item.color}</p>
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
                    ) : !cartItemsLoading && cartItems.length > 0 ? (
                        <div className="w-full h-24 flex justify-center items-center">
                            <div className="loader"></div>
                        </div>
                        ) : (
                        <p className="text-sm font-thin text-gray-500 text-start ms-10">Your cart is empty.</p>
                        )}
                    
                    {/* Centered Checkout Button */}
                    <div className="w-full sticky bottom-8 flex flex-col items-center justify-end p-4 mt-8 gap-4">
                        <button onClick={checkout} disabled={cartItems.length <= 0} className={`px-4 py-2 text-white font-thin rounded-md w-3/4 mx-auto ${cartItems.length <= 0 ? 'bg-black/10' : 'bg-black/60 hover:bg-black transition duration-200'}`}>Checkout</button>
                        
                    </div>
                    <div className="flex sticky w-full justify-end bottom-0">
                        <div className="w-4/5 flex justify-end items-center text-xl me-2 mb-2">
                            <p className="text-2xl">Subtotal:</p>
                        </div>
                        <div className="flex w-1/5 justify-center items-center text-xl me-4 mb-2">
                            {/* <div className={`text-2xl ${cartItemsLoading ? 'loader': 'hidden'}`} /> */}
                            <p className={`text-2xl ${!cartItemsLoading ? '': 'text-loader'}`}>{currFormat.format(Number(cartTotal))}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Cart;