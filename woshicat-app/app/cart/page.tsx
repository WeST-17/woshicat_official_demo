'use client';
import React, {useRef, useEffect} from "react";
import MobileCart from "../components/cart/MobileCart";
import { useCart } from "../components/cart/cartContext";
import { FinalCheckout } from "@/app/server_actions/action";
import ProgressBar from "../components/cart/progressBar";

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
  return (
    <>
    <main className="w-full relative h-fit">
      <div className="relative overflow-y-scroll overscroll-contain w-full h-fit lg:w-1/2 mx-auto flex flex-col items-start relative bg-white/95 rounded-lg mt-[80px]"> 
        <MobileCart />
      </div>
      <div className={`sticky bottom-0 flex flex-col w-1/2 mx-auto p-2 transition transition-all z-[1000]`}>
                    
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
    </main>
    </>
  );
}

export default CartPage;