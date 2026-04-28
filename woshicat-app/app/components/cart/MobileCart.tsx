'use client';
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Loader from "../transitions-navigation/LoadingScreen";
import QuantityAdjuster from "./cartItemModify";
import { useCart } from './cartContext';
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
                className={`relative overflow-y-visible h-full rounded-[16px] flex flex-col justify-start items-center bg-stone-400/20 w-full z-1000`}
                onClick={(e) => e.stopPropagation()}
                ref={cartContainerRef}
            >
                {/* Cart content */}
                {cartItems.length > 0 ? (
                <>
                <div className={`w-full overflow-y-visible overscroll-contain p-2`}> 
                    {cartItems.map((item: any, i) => {
                        return (
                        <div key={`b_${i}`} className={`flex items-center justify-start w-full h-30 ${item.quantity <= 0 ? 'opacity-70 pointer-events-none' : ''}`}>
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
            
        </>
    )
};

export default MobileCart;