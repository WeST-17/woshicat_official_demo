'use client';
import { useState, useEffect } from "react";
import { useCart } from "./cartContext";
import useWindowDimensions from "../transitions-navigation/useWindowDimension";
import { AnimatePresence, motion } from "framer-motion";
import MenuButton from "../MenuComponents/MenuButton";
import Cart from "./cart";
import Image from "next/image";
import cart from './cart-styles.module.css';

const CartHeaderIcon = () => {
    const { cartOpen, cartItems, setCartOpen } = useCart();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const windowSize = useWindowDimensions();

    // const toggleMenu = () => {
    //     setCartOpen(!cartOpen);
    // };

    useEffect(() => {
        window.addEventListener('resize', function () {
            if (window.innerWidth < 1024) {setIsMobile(true)} 
            else {setIsMobile(false)};
        });

        console.log('window width changed: ', windowSize.width);
        return (): void => window.removeEventListener('resize', function () {});
    }, [windowSize.width]);

    const menu = {
        open: {
            width: "650px",
            height: "880px",
            top: "10px",
            right: "0px",
            opacity: 1,
            transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
        },

        closed: {
            width: "120px",
            height: "70px",
            top: "0px",
            right: "0px",
            opacity: 0,
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
        }
    }

    const mobileMenu = {
        open: {
            width: "95vw",
            height: "100vh",
            top: "0px",
            right: "0px",
            opacity: 0,
            transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
        },

        closed: {
            width: "120px",
            height: "70px",
            top: "0px",
            right: "0px",
            opacity: 0,
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
        }
    }

    return (
        <>
            <div className={`fixed top-0 right-0 z-[2005] flex justify-center ${cart.header}`}>
                <motion.div
                    className={`${cart.menu} `}
                    variants={isMobile ? mobileMenu : menu}
                    animate={cartOpen ? "open" : "closed"} 
                    initial="closed"
                >
                    <AnimatePresence>
                        {cartOpen && <Cart />}
                    </AnimatePresence>
                </motion.div>
                <MenuButton open={cartOpen} setMenuOpen={setCartOpen}>
                    <>
                    <Image
                        src={'/icons/Shopping_Cart_Yoyo.png'}
                        alt={'Yoyo pushing a shoppping cart'}
                        width={200}
                        height={1}
                        className={`hover:translate-x-3 transition duration-800 ${cartItems.length > 0 ? '' : 'hidden'} ${cartOpen ? "opacity-0" : ""}`}
                    />
                    <Image
                        src={'/icons/Shopping_Cart_Empty.png'}
                        alt={'Yoyo pushing a shoppping cart'}
                        width={200}
                        height={1}
                        className={`hover:translate-x-3 transition duration-800 ${cartItems.length > 0 ? 'hidden' : ''} ${cartOpen ? "opacity-0" : ""}`}
                    />
                    </>
                </MenuButton>
            </div>
        </>
    )
};

export default CartHeaderIcon;