'use client';

// import { motion } from "framer-motion"; 
import { useEffect, useRef } from "react";
import Link from "next/link";
import ProgressBar from "./progressBar";
import Loader from "../transitions-navigation/LoadingScreen";
import QuantityAdjuster from "./cartItemModify";
import { useCart } from './cartContext';
import { FinalCheckout } from "@/app/server_actions/action";
import { useMetaPixel } from "../MetaPixel/PixelContext";
import Image from "next/image";
import { DarkMode } from "../toggles/Dark_Mode/darkModeContext";


const CartShow = () => {
    const { cartOpen, setCartOpen, cartItemsLoading, cartItems, cartTotal, setCartTotal, progress, setCurrentLink } = useCart();
    const { checkoutClick, setCheckoutClick } = useMetaPixel();
    const cartContainerRef = useRef<HTMLDivElement>(null);
    const { darkMode } = DarkMode();

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

        return () => { console.log("unmount / cleanup") };
    }, [cartItems])

    
    const checkout = async () => {
        const checkoutUrl: string | null = await FinalCheckout();
        if (checkoutUrl) {
            const checkoutCounter: number = checkoutClick + 1;
            setCheckoutClick(checkoutCounter);
        };

        if (checkoutUrl && cartItems.length > 0) {
            setCurrentLink('/');
            window.location.href = checkoutUrl;
        } else {
            console.log("Cart, not cart. Noodles, not noodles...")
            return;
        };
    };

    const currFormat = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'USD',
    });

    // const perspective: {} = {
    //     initial: {
    //         opacity: 0,
    //         translateY: 80,
    //     },
    //     enter: (i: number) => ({
    //         opacity: 1,
    //         translateY: 0,
    //         transition: {
    //             duration: 0.65, 
    //             delay: 0.5 + (i * 0.1), 
    //             ease: [0.76, 0, 0.24, 1],
    //             opacity: { duration: 1, ease: [0.76, 0, 0.24, 1]},
    //         }
    //     }),
    //     exit: {
    //         opacity: 0,
    //         translateY: 80,
    //         transition: { duration: 1, type: "linear", ease: [0.76, 0, 0.24, 1]}
    //     }
    // }

    return (
        <>
            <div
                className={`overflow-hidden inset-0 absolute w-[100vw] h-[100vh] z-[2999] flex justify-end items-center transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggle}
            />
            {/* Button to Open Cart */}
            <button onClick={toggle} className={`cart_btn flex items-center justify-center text-xl absolute right-0 top-0 ${cartOpen ?'z-2006' : 'z-2005'}`}>
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
                className={`relative z-[3002] cart-container overscroll-none overflow-hidden rounded-l-[12px] bg-stone-900 ${cartOpen ? 'open-cart' : ''} `}
                onClick={(e) => e.stopPropagation()}
                ref={cartContainerRef}
            >
                
                <div className={`sticky top-0 w-full h-16 flex justify-center items-center ${darkMode ? 'bg-stone-900 text-stone-200' : 'bg-white'}`}>
                    <button //href={"/cart"} 
                    className={`me-auto top-3 p-4 text-2xl font-medium `} onClick={toggle}>
                        <p className={`transition duration-350 ${cartOpen ? 'opacity-100' : 'opacity-0'}`}>{`Shopping Cart`}</p>
                    </button>
                    <button onClick={toggle} className={`ms-auto my-4 mx-4 text-stone-400 rounded-lg overflow-hidden ${darkMode ? 'text-stone-200' : 'hover:bg-black/15'}`}>
                        <div className="w-12 h-8 flex justify-center items-center relative transition duration-300 text-lg">
                            <p> {`close`}</p>
                        </div>
                    </button>
                    <span className={`rounded-full absolute bottom-0 left-5 h-[0.5px] ${!darkMode ? 'bg-black/40' : 'bg-stone-200/40'} w-[95%]`} />
                </div>
                
                <div className={`w-full h-full flex flex-col justify-start px-2 touch-pan-y overflow-auto ${cartItems.length <= 3 ? "overflow-y-none" : "overflow-y-scroll"} overscroll-contain ${darkMode ? 'text-stone-200 bg-stone-900/95' : 'bg-white/95'}`}>
                {cartItems.length > 0 ? (
                    <div className="w-full h-full rounded-[8px]">
                        {cartItems.map((item: any, i) => {
                            return (
                            <div key={`b_${i}`} className={`fade-in h-32 lg:h-28 rounded-[8px] cart-item gap-1 transition duration-500 flex items-center justify-start w-full bg-transparent ${item.quantity <= 0 ? 'opacity-70 pointer-events-none' : ''} ${cartOpen ? 'show ': ''} ${darkMode ? 'text-stone-200' : ''}`}>
                                <div
                                    className={`flex justify-center h-full w-full gap-1 overflow-hidden p-2`}
                                >
                                <Link href={`https://woshicat.com/collections/${item.collection}/${item.handle}`} className={`h-full w-full flex justify-center items-center gap-1 hover:brightness-105 hover:bg-stone-400/15 transition-all duration-250 p-2 rounded-[8px]`}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.handle}
                                        className="h-full object-cover aspect-square rounded-lg"
                                    />
                                
                                    <div className="ms-auto w-full p-1 gap-1 flex flex-col justify-center h-full">
                                        <h2 className='h-fit w-full text-xs md:text-sm'>{item.title}</h2>
                                        <h3 className="text-xs font-thin mb-1 opacity-80">
                                            {item.variantTitle !== "Default Title" && (<>{item.variantTitle}</>)}
                                        </h3>
                                        <p className='text-xs font-thin'>{`${currFormat.format(Number(item.price))}`}</p>
                                    </div>
                                </Link>
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
                    
                    ) : cartItemsLoading ? (
                        <div className="object-contain relative w-full overflow-hidden flex justify-center items-center">
                            <Loader />
                        </div>
                        ) : ( 
                        <>
                        <div className={`gap-2 absolute top-0 right-0 bottom-0 w-full h-full flex flex-col justify-center items-center z-[-1] text-center ${darkMode ? 'bg-stone-900 text-stone-200' : 'bg-white'}`}>
                            <p className={`scale-[1.5] ${darkMode ? 'bg-stone-900 text-stone-200' : 'bg-white'}`}>{`o( ・∇・)o`}</p>
                        </div>
                        </> 
                    )
                }
                    
                </div>
                <div className={`h-fit flex flex-col w-full sticky bottom-0 rounded-t-[8px] p-2 ${darkMode ? 'bg-white/20 text-stone-200' : 'bg-stone-200/75'}`}>
                    <div className="h-full flex flex-col w-full justify-end items-center p-2 gap-1">
                        <div className="w-full flex justify-end items-center text-xl me-2">
                            <p className={`text-xl transition duration-300 ${cartItemsLoading ? 'opacity-30' : ''}`}>{`Subtotal: ${currFormat.format(Number(cartTotal))}`}</p>
                        </div>
                        <div className="w-full flex flex-col items-center justify-end gap-4">
                            <button onClick={checkout} disabled={cartItems.length <= 0} className={`overflow-hidden relative px-4 py-2 h-12 font-thin rounded-full w-full ${cartItems.length <= 0 ? `bg-black/10` : 'bg-black/60 hover:bg-black transition duration-200'} ${darkMode ? 'dark-text' : 'text-stone-100'}`}>
                                <p className="z-1 absolute left-0 top-0 h-full w-full text-center flex items-center justify-center">Checkout</p>
                                {/* <span className="absolute bottom-0 left-0 w-full h-full checkout-hover"/> */}
                            </button>
                        </div>
                    </div>
                    <div className="rounded-lg h-16 px-2 w-full flex flex-col items-end justify-center gap-2">
                        <div className="w-full flex justify-end">
                            <p className={`${progress < 100 ? '' : 'hidden'}`}>{`You're ${currFormat.format(75 - Number(cartTotal))} away from free shipping!`}
                            </p>
                            <p className={`${progress >= 100 ? '' : 'hidden'}`}>{`Free shipping for your order!`}
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