'use client';

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import ProgressBar from "./progressBar";
import Loader from "../transitions-navigation/LoadingScreen";
import QuantityAdjuster from "./cartItemModify";
import { useCart } from './cartContext';
import { FinalCheckout } from "@/app/server_actions/action";
import Image from "next/image";


const CartShow = () => {
    const { cartOpen, setCartOpen, cartItemsLoading, cartItems, cartTotal, setCartTotal, progress } = useCart();
    const cartContainerRef = useRef<HTMLDivElement>(null);

    const toggle = () => {
        setCartOpen(!cartOpen);
    }

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

    
    const checkout = async () => {
        const checkoutUrl = await FinalCheckout();
        if (checkoutUrl && cartItems.length > 0) {
            window.location.href = checkoutUrl;
        } else {
            console.log("Cart, not cart. Noodles, not noodles...")
            return;
        }
    }

    const currFormat = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'USD',
    });

    const perspective: {} = {
        initial: {
            opacity: 0,
            translateY: 80,
        },
        enter: (i: number) => ({
            opacity: 1,
            translateY: 0,
            transition: {
                duration: 0.65, 
                delay: 0.5 + (i * 0.1), 
                ease: [0.76, 0, 0.24, 1],
                opacity: { duration: 1.05, ease: [0.76, 0, 0.24, 1]},
            }
        }),
        exit: {
            opacity: 0,
            translateY: 80,
            transition: { duration: 1, type: "linear", ease: [0.76, 0, 0.24, 1]}
        }
    }

    return (
        <>
            <div
                className={`overflow-hidden inset-0 absolute w-[100vw] h-[100vh] z-[2999] flex justify-end items-center transition-opacity duration-500 bg-black/50 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggle}
            />
            {/* Button to Open Cart */}
            <button onClick={toggle} className={`cart_btn flex items-center justify-center text-xl absolute right-0 top-0 z-3000`}>
                <Image
                    src={'/icons/Shopping_Cart_Yoyo.png'}
                    alt={'Yoyo pushing a shoppping cart'}
                    width={120}
                    height={1}
                    className={`relative hover:translate-x-5 transition-all duration-500 ease-in-out ${cartItems.length > 0 ? '' : 'hidden'}`}
                />
                <Image
                    src={'/icons/Shopping_Cart_Empty.png'}
                    alt={'Yoyo pushing a shoppping cart'}
                    width={120}
                    height={1}
                    className={`hover:translate-x-5 transition-all duration-500 ease-in-out ${cartItems.length > 0 ? 'hidden' : ''}`}
                />
            </button>
            
            {/* Cart Modal (Always Rendered) */}
            <div
                className={`relative z-[3002] cart-container overflow-y-scroll overscroll-contain rounded-lg ${cartOpen ? 'open-cart' : ''}`}
                onClick={(e) => e.stopPropagation()}
                ref={cartContainerRef}
            >
                <div className="relative sticky top-0 w-full h-20 flex justify-center items-center bg-white/50">
                    
                    <Link href={"/cart"} className="me-auto top-3 p-4 text-2xl font-medium" onClick={toggle}>
                        <p>{`Shopping Cart`}</p>
                    </Link>
                    <button onClick={toggle} className="ms-auto my-4 mx-4 text-stone-400">
                        <div className="w-12 h-8 flex justify-center items-center relative hover:bg-black/15 transition duration-300 rounded-lg text-lg">
                            <p> {`close`}</p>
                        </div>
                    </button>
                </div>
                
                <div className={`w-full h-4/5 p-1 rounded-lg touch-pan-y overflow-auto`}>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item: any, i) => {
                            return (
                            <div key={`b_${i}`} className={`h-36 rounded-md cart-item p-2 gap-4 hover:bg-stone-200 transition duration-500 flex items-center justify-start w-full ${item.quantity <= 0 ? 'opacity-70 pointer-events-none' : ''}`}>
                                <motion.div
                                    custom={i}
                                    variants={perspective}
                                    initial={"initial"}
                                    animate={"enter"}
                                    exit={"exit"}
                                    className={`flex h-full w-full gap-2 overflow-hidden`}
                                >
                                <Link href={`https://woshicat.com/collections/${item.collection}/${item.handle}`} className="h-full">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.handle}
                                        className="h-full object-cover bg-white aspect-square rounded-lg mr-2"
                                    />
                                </Link>
                                <div className="ms-auto w-full p-2 flex flex-col justify-center h-full">
                                    <h2 className='h-full w-full mb-1 text-base lg:text-lg'>{item.title}</h2>
                                    <h3 className="text-xs font-thin mb-1 opacity-80">
                                        {item.variantTitle !== "Default Title" && (<>{item.variantTitle}</>)}
                                    </h3>
                                    <p className='text-sm font-thin'>{`${currFormat.format(Number(item.price))}`}</p>
                                    <QuantityAdjuster
                                        variantId={item.variantId}
                                        initialQuantity={item.quantity}
                                        onQuantityChange={(newQuantity) => {
                                            console.log('Quantity changed to:', newQuantity);
                                        }}
                                    />
                                </div>
                                </motion.div>
                            </div>
                        )})}
                    </>
                    
                ) : cartItemsLoading ? (
                    <div className="object-contain relative w-full overflow-hidden flex justify-center items-center">
                        <Loader />
                    </div>
                    ) : (
                    <p className="textbase text-gray-600 text-start p-4">Your cart is empty.</p>
                    )}
                </div>
                <div className="flex flex-col w-full sticky bottom-0 p-1 bg-white/75">
                    <div className="h-full flex flex-col w-full justify-end items-center p-1 gap-1">
                        <div className="w-full flex justify-end items-center text-xl me-2">
                            <p className={`text-xl transition duration-300 ${cartItemsLoading ? 'opacity-30' : ''}`}>{`Subtotal: ${currFormat.format(Number(cartTotal))}`}</p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-end gap-4">
                            <button onClick={checkout} disabled={cartItems.length <= 0} className={`px-4 py-2 text-white font-thin rounded-md w-full ${cartItems.length <= 0 ? 'bg-black/10' : 'bg-black/60 hover:bg-black transition duration-200'}`}>Checkout</button>
                        </div>
                    </div>
                    <div className="rounded-lg h-16 pe-2 w-full flex flex-col items-end justify-center gap-2">
                        <div className="w-full flex justify-end">
                            <p className={`${progress < 100 ? '' : 'hidden'}`}>{`You're ${currFormat.format(75 - Number(cartTotal))} away from free shipping!`}
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
        </>
    )
};

export default CartShow;