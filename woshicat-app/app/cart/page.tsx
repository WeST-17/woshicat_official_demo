'use client';
import React, {useEffect} from "react";
import MobileCart from "../components/cart/MobileCart";
import { useCart } from "../components/cart/cartContext";
import { FinalCheckout } from "@/app/server_actions/action";
import ProgressBar from "../components/cart/progressBar";
import Image from "next/image";
import { DarkMode } from "../components/toggles/Dark_Mode/darkModeContext";

const CartPage = () => {
  const { cartItemsLoading, cartItems, cartTotal, setCartTotal, progress } = useCart();
  const { darkMode } = DarkMode();

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

  return (
    <>
    <main className={`w-full relative min-h-screen pt-[75px] ${darkMode ? "dark-text bg-stone-900/95" : "text-white bg-white/95"}`}>
        <section className="sticky top-0 rounded-[8px] overflow-hidden w-full lg:w-1/2 h-32 relative mx-auto">
            <Image 
                src={`https://cdn.shopify.com/s/files/1/0901/4794/6795/files/stag_japan_tote.jpg?v=1761983360`}
                alt="I AM Tote Bag in Japan, carried by a man crossing a crosswalk"
                fill={true}
                className="object-cover z-[-1]"
            />
            <h2 className="text-2xl w-full mx-auto h-full absolute top-0 bg-stone-900/65">
                <div
                    className={`flex justify-start items-center h-full w-full gap-2 p-3 rounded-lg`}
                >
                    {`Shopping Cart`}
                </div>
            </h2>
        </section>
        <div className="relative overflow-y-scroll w-full h-fit lg:w-1/2 mx-auto flex flex-col items-start relative rounded-lg mt-2"> 
            <MobileCart />
            
        </div>
        
    </main>
    </>
  );
}

export default CartPage;