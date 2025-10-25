'use client';
import { useCart } from "./cartContext";
import { AnimatePresence, motion } from "framer-motion";
import MenuButton from "../MenuComponents/MenuButton";
import Cart from "./cart";
import Image from "next/image";
import Link from "next/link";
import cart from '../../cart-styles.module.css';

const CartHeaderIcon = () => {
    const { cartOpen, cartItems, setCartOpen } = useCart();

    const menu = {
        open: {
            width: "650px",
            height: "90vh",
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


    return (
        <>
            {/* mobile */}
            <div className={`flex absolute top-0 right-0 z-2005 ${cart.header}`}>
                <Link href={'/cart'} className="w-full h-full">
                    <>
                    <Image
                        src={'/icons/Shopping_Cart_Yoyo.png'}
                        alt={'Yoyo pushing a shoppping cart'}
                        width={120}
                        height={1}
                        className={`hover:translate-x-3 transition duration-800 ${cartItems.length > 0 ? '' : 'hidden'} ${cartOpen ? "opacity-0" : ""}`}
                    />
                    <Image
                        src={'/icons/Shopping_Cart_Empty.png'}
                        alt={'Yoyo pushing a shoppping cart'}
                        width={120}
                        height={1}
                        className={`hover:translate-x-3 transition duration-800 ${cartItems.length > 0 ? 'hidden' : ''} ${cartOpen ? "opacity-0" : ""}`}
                    />
                    </>
                </Link>
            </div>
            {/* desktop and tablet */}
            {/* <div className={`max-md:hidden max-md:pointer-events-none absolute top-0 right-0 z-2005 ${cart.header}`}>
                <motion.div
                    className={`${cart.menu} `}
                    variants={menu}
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
            </div> */}
        </>
    )
};

export default CartHeaderIcon;