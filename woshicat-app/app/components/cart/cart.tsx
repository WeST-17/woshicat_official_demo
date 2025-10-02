'use client';
import { FinalCheckout } from "@/app/server_actions/action";
import { useCart } from './cartContext';
import QuantityAdjuster from "./cartItemModify";
import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "./progressBar";
import Loader from "../transitions-navigation/LoadingScreen";


const Cart: React.FC = () => {
    const { cartOpen, setCartOpen, cartItemsLoading, cartItems, cartTotal, setCartTotal, progress } = useCart();
    const cartContainerRef = useRef<HTMLDivElement>(null);

    const currFormat = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const calcTotal = async () => {
            console.log("calculating subtotal")
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
            <button onClick={openCart} className={`relative cart_btn flex items-center justify-center text-xl`}>
                <Image
                    src={'/icons/Shopping_Cart_Yoyo.png'}
                    alt={'Yoyo pushing a shoppping cart'}
                    width={110}
                    height={1}
                    className={`relative hover:translate-x-5 transition-all duration-300 ease-in-out ${cartItems.length > 0 ? '' : 'hidden'}`}
                />
                <Image
                    src={'/icons/Shopping_Cart_Empty.png'}
                    alt={'Yoyo pushing a shoppping cart'}
                    width={110}
                    height={1}
                    className={`hover:translate-x-5 transition-all duration-300 ease-in-out ${cartItems.length > 0 ? 'hidden' : ''}`}
                />
            </button>

            {/* Cart Modal (Always Rendered) */}
            <div
                className={`static fixed inset-0 z-[2100] flex justify-end items-center transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeCart}
            >
                <div
                    className={`relative cart-container transition-transform duration-300 ease-in-out overscroll-none ${cartOpen ? 'open-cart' : 'close-cart'}`}
                    onClick={(e) => e.stopPropagation()}
                    ref={cartContainerRef}
                >
                    <div className="relative sticky top-0 w-full z-[1000] h-20">
                        <div className="absolute w-full h-full bg-stone-100/70"/>
                        <button onClick={closeCart} className="absolute right-0 my-4 mx-2 text-stone-400 font-thin">
                            <div className="w-12 h-8 flex justify-center items-center relative hover:bg-black/15 transition duration-300">
                                <p> {`close`}</p>
                            </div>
                        </button>
                        <h2 className="absolute top-5 p-4 text-2xl font-medium">
                            {`Shopping Cart`}
                        </h2>
                    </div>
                    
                    {/* Cart content */}
                    {cartItems.length > 0 ? (
                    <>
                    <div className="relative cart-items gap-2 h-3/4 w-full overflow-y-visible overscroll-contain rounded-lg p-1">
                        {cartItems.map((item: any) => {
                            return (
                            <div key={item.cartLineId} className={`h-36 cart-item p-2 gap-4 hover:bg-stone-200 transition duration-300 flex items-center justify-start w-full ${item.quantity <= 0 ? 'opacity-70 pointer-events-none' : ''}`}>
                                
                                <Link href={`https://woshicat.com/collections/${item.collection}/${item.handle}`} className="h-full">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.handle}
                                        className="h-full object-contain bg-white aspect-square mr-2"
                                    />
                                </Link>
                                <div className="ms-auto w-full p-2 flex flex-col justify-center h-full">
                                    <h2 className='h-full w-full mb-1 text-base lg:text-lg'>{item.title}</h2>
                                    <h3 className="text-xs font-thin mb-1 opacity-80">
                                        {item.variantTitle !== "Default Title" && (<>{item.variantTitle}</>)}
                                    </h3>
                                    <p className='text-sm font-thin'>{`${currFormat.format(Number(item.price))}`}</p>
                                    {/* Quantity adjuster component */}
                                    <QuantityAdjuster
                                        variantId={item.variantId}
                                        initialQuantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            console.log('Quantity changed to:', newQuantity);
                                        }}
                                    />
                                </div>
                            </div>
                        )})}
                    </div>
                    </>
                    ) : cartItemsLoading ? (
                        <div className="object-contain relative w-full overflow-hidden flex justify-center items-center">
                            <Loader />
                        </div>
                        ) : (
                        <p className="textbase text-gray-600 text-start p-4">Your cart is empty.</p>
                        )}
                    {/* Centered Checkout Button */}
                    <div className="flex flex-col w-full sticky bottom-0 p-2 bg-stone-100/85">
                        
                        <div className="h-full flex flex-col w-full justify-end items-center p-2 gap-2">
                            <div className="w-full flex justify-end items-center text-xl me-2">
                                <p className={`text-2xl transition duration-300 ${cartItemsLoading ? 'opacity-30' : ''}`}>{`Subtotal: ${currFormat.format(Number(cartTotal))}`}</p>
                            </div>
                            <div className="w-full flex flex-col items-center justify-end gap-4">
                                <button onClick={checkout} disabled={cartItems.length <= 0} className={`px-4 py-2 text-white font-thin rounded-md w-full ${cartItems.length <= 0 ? 'bg-black/10' : 'bg-black/60 hover:bg-black transition duration-200'}`}>Checkout</button>
                            </div>
                        </div>
                        <div className="h-20 pe-2 w-full flex flex-col items-end justify-center gap-4">
                            <div className="w-full flex justify-end">
                                <p className={`${progress < 100 ? '' : 'hidden'}`}>{`You're ${currFormat.format(50 - Number(cartTotal))} away from free shipping!`}
                                </p>
                                <p className={`${progress >= 100 ? '' : 'hidden'}`}>{`Yoyo's excited! You got free shipping!`}
                                </p>
                            </div>
                            
                            <div className={`h-3 overflow-hidden w-full rounded-full border border-2 bg-gray-200`}>
                                <ProgressBar />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
            
        </>
    );
}

export default Cart;