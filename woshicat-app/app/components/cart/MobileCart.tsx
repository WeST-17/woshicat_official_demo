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

const MobileCart = () => {
    const { cartItemsLoading, cartItems, cartTotal, setCartTotal, progress } = useCart();
    const cartContainerRef = useRef<HTMLDivElement>(null);

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
            transition: { duration: 1.2, type: "linear", ease: [0.76, 0, 0.24, 1]}
        }
    }

    return (
        <>
            <div
                className={`overflow-y-scroll h-4/5 rounded-[16px] flex flex-col justify-start items-center bg-stone-200/80 w-full z-1000`}
                onClick={(e) => e.stopPropagation()}
                ref={cartContainerRef}
            >
                <div className={`sticky top-0 w-full z-1000 h-20 transition transition-all duration-500`}>
                    <h2 className="absolute top-2 p-4 text-2xl font-medium">
                        <motion.div
                            variants={perspective}
                            initial={"initial"}
                            animate={"enter"}
                            exit={"exit"}
                            className={`flex h-full w-full gap-2 p-1`}
                        >
                            {`Shopping Cart`}
                        </motion.div>
                    </h2>
                </div>

                {/* Cart content */}
                {cartItems.length > 0 ? (
                <>
                <div className={`w-full overflow-y-visible overscroll-contain p-5 mt-2`}> 
                    {/* "relative cart-items gap-2 h-3/4 w-full overflow-y-visible overscroll-contain rounded-lg p-1" */}
                    {cartItems.map((item: any, i) => {
                        return (
                        <div key={`b_${i}`} className={`flex items-center justify-start w-full ${item.quantity <= 0 ? 'opacity-70 pointer-events-none' : ''}`}>
                            <motion.div
                                custom={i}
                                variants={perspective}
                                initial={"initial"}
                                animate={"enter"}
                                exit={"exit"}
                                className={`flex h-full w-full gap-2 p-1`}
                            >
                                <Link href={`https://woshicat.com/collections/${item.collection}/${item.handle}`} className={`h-full overflow-hidden rounded-lg transition-all duration-500`}>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.handle}
                                        className="h-24 object-cover bg-white aspect-9/10 mr-2"
                                        width={100}
                                        height={1}
                                    />
                                </Link>
                                <div className={`ms-auto w-full p-2 flex flex-col justify-center h-full transition transition-all duration-500`}>
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
                            </motion.div>
                        </div>
                    )})}
                </div>
                </>
                ) : cartItemsLoading ? (
                    <div className="object-contain relative w-full h-full overflow-hidden flex justify-center items-center">
                        <Loader />
                    </div>
                    ) : (
                    <p className="textbase text-gray-600 text-start p-4">Your cart is empty.</p>
                    )}
            </div>
            {/* Centered Checkout Button */}
            <motion.div
                variants={perspective}
                initial={"initial"}
                animate={"enter"}
                exit={"exit"}
                className={`flex h-full w-full gap-2 p-1`}
            >
                <div className={`flex flex-col w-full sticky bottom-0 p-2 mt-10 transition transition-all`}>
                    
                    <div className="h-full flex flex-col w-full justify-end items-center p-2 gap-2">
                        <div className="w-full flex justify-end items-center text-xl me-2">
                            <p className={`text-2xl transition duration-300 ${cartItemsLoading ? 'opacity-30' : ''}`}>{`Subtotal: ${currFormat.format(Number(cartTotal))}`}</p>
                        </div>
                        <div className="w-full flex flex-col items-center lg:items-end justify-end gap-4">
                            <button onClick={checkout} disabled={cartItems.length <= 0} className={`px-4 py-2 text-white font-thin rounded-md w-full lg:w-1/2 ${cartItems.length <= 0 ? 'bg-black/10' : 'bg-black/60 hover:bg-black transition duration-200'}`}>Checkout</button>
                        </div>
                    </div>
                    <div className="h-20 pe-2 w-full flex flex-col items-end justify-center gap-4">
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
            </motion.div>
        </>
    )
};

export default MobileCart;