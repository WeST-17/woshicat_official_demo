'use client';
import React, {useEffect} from "react";
import MobileCart from "../components/cart/MobileCart";
import { useCart } from "../components/cart/cartContext";
import { FinalCheckout } from "@/app/server_actions/action";
import ProgressBar from "../components/cart/progressBar";
import Image from "next/image";

const CartPage = () => {
  const { cartItemsLoading, cartItems, cartTotal, setCartTotal, progress } = useCart();

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
    }, [cartItems]);

    useEffect(() => {
        return () => {};
    }, []);

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
  return (
    <>
    <main className="w-full relative h-fit">
        <section className="w-full lg:w-1/2 h-48 relative mx-auto sticky top-0">
            <Image 
                src={`https://cdn.shopify.com/s/files/1/0901/4794/6795/files/stag_japan_tote.jpg?v=1761983360`}
                alt="I AM Tote Bag in Japan, carried by a man crossing a crosswalk"
                fill={true}
                className="object-cover z-[-1]"
            />
            <h2 className="text-2xl w-full mx-auto h-full absolute top-0">
                <div
                    className={`flex justify-start items-center h-full w-full gap-2 p-3 bg-white/80 rounded-lg`}
                >
                    {`Shopping Cart`}
                </div>
            </h2>
        </section>
        <div className={`z-2000 flex justify-start items-center mx-auto w-full lg:w-1/2 h-2 transition transition-all duration-500 border-b-1 border-gray-300`}/>
        <div className="relative overflow-y-scroll overscroll-contain w-full h-fit lg:w-1/2 mx-auto flex flex-col items-start relative bg-white/95 rounded-lg mt-2"> 
        <MobileCart />
        </div>
        <div className={`sticky bottom-0 flex flex-col w-full lg:w-1/2 mx-auto p-2 transition transition-all z-[1000]`}>
                    
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
    </main>
    </>
  );
}

export default CartPage;