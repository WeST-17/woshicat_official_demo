'use client';
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Loader from "../transitions-navigation/LoadingScreen";
import QuantityAdjuster from "./cartItemModify";
import { useCart } from './cartContext';
import { DarkMode } from "../toggles/Dark_Mode/darkModeContext";
import { useMetaPixel } from "../MetaPixel/PixelContext";
import { FinalCheckout } from "@/app/server_actions/action";
import ProgressBar from "./progressBar";

const MobileCart = () => {
    const { cartItemsLoading, cartItems, cartOpen, cartTotal, setCartTotal, progress } = useCart();
    const cartContainerRef = useRef<HTMLDivElement>(null);
    const { darkMode } = DarkMode();
    const { checkoutClick, setCheckoutClick } = useMetaPixel();

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
        const checkoutUrl: string | null = await FinalCheckout();
        if (checkoutUrl) {
            const checkoutCounter: number = checkoutClick + 1;
            setCheckoutClick(checkoutCounter);
        };

        if (checkoutUrl && cartItems.length > 0) {
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
    //             opacity: { duration: 1.05, ease: [0.76, 0, 0.24, 1]},
    //         }
    //     }),
    //     exit: {
    //         opacity: 0,
    //         translateY: 80,
    //         transition: { duration: 1.2, type: "linear", ease: [0.76, 0, 0.24, 1]}
    //     }
    // }

    return (
        <>
            <div
                className={`relative overflow-y-visible min-h-screen h-full rounded-[8px] flex flex-col justify-start items-center w-full z-1000 ${darkMode ? 'bg-stone-700/95' : 'bg-stone-200/95'}`}
                onClick={(e) => e.stopPropagation()}
                ref={cartContainerRef}
            >
                {/* Cart content */}
                <div className={`flex flex-col w-full h-[500px] rounded-[8px] overflow-hidden`}> 
                    {cartItems.length > 0 ? (
                        <>
                        {cartItems.map((item: any, i) => {
                            return (
                            <div key={`b_${i}`} className={`fade-in h-32 lg:h-24 cart-item p-2 gap-2 transition duration-500 flex items-center justify-start w-full bg-transparent ${item.quantity <= 0 ? 'opacity-70 pointer-events-none' : ''} show ${darkMode ? 'dark-text bg-white/10' : 'light-text bg-black/80'}`}>
                                <div
                                    className={`p-2 flex justify-center h-full w-full gap-1 overflow-hidden`}
                                >
                                <Link href={`https://woshicat.com/collections/${item.collection}/${item.handle}`} className="h-full aspect-square flex justify-center items-center">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.handle}
                                        className="h-full object-cover aspect-square rounded-lg"
                                    />
                                </Link>
                                <div className="ms-auto w-full p-1 gap-1 flex flex-col justify-center h-full">
                                    <h2 className='h-fit w-full text-xs md:text-sm'>{item.title}</h2>
                                    <h3 className="text-xs font-thin mb-1 opacity-80">
                                        {item.variantTitle !== "Default Title" && (<>{item.variantTitle}</>)}
                                    </h3>
                                    <p className='text-xs font-thin'>{`${currFormat.format(Number(item.price))}`}</p>
                                </div>
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
                       
                        </>
                    
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
                    )}
                </div>
                <div className={`absolute sticky bottom-0 flex flex-col w-full h-it mx-auto p-2 transition transition-all z-[1000] rounded-[8px] ${darkMode ? 'bg-white/20 text-stone-200' : 'bg-white/75 light-text'}`}>        
                    <div className="h-full flex flex-col w-full justify-end items-center p-2 gap-2">
                        <div className="w-full flex justify-end items-center text-xl me-2">
                            <p className={`text-2xl transition duration-300 ${cartItemsLoading ? 'opacity-30' : ''}`}>{`Subtotal: ${currFormat.format(Number(cartTotal))}`}</p>
                        </div>
                        <div className="w-full flex flex-col items-center lg:items-end justify-end gap-4">
                            <button onClick={checkout} disabled={cartItems.length <= 0} className={`px-4 py-2 text-white rounded-md w-full lg:w-1/2 ${cartItems.length <= 0 ? 'bg-black/10' : 'bg-black/60 hover:bg-black transition duration-200'}`}>Checkout</button>
                        </div>
                    </div>
                    <div className="h-20 pe-2 w-full mx-auto flex flex-col items-end justify-center gap-4">
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

export default MobileCart;