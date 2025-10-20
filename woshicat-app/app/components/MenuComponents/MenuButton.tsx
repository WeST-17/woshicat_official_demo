'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from "../cart/cart-styles.module.css";

interface MenuButtonProps {
    children?: React.ReactNode,
    open: boolean,
    setMenuOpen: (x: boolean) => void;
}

const MenuButton:React.FC<MenuButtonProps> = ({ children, open, setMenuOpen }) => {
    
    const toggleMenu = () => {
        setMenuOpen(!open);
    };

  return (
    <div className={`${styles.button} mx-2 z-[1001] bg-white relative`}>
        <motion.div 
            className={`w-full h-full`}
            animate={{top: open ? "-100%" : "0%"}}
            transition={{ duration: 1, type: "tween", ease: [0.76, 0, 0.24, 1]}}
        >
            <button 
                className={`flex justify-center items-center transition duration-650`}
                onClick={toggleMenu}
            >
                {children ? (children) : "menu"}
            </button>
            <button 
                className={`flex justify-center items-center transition duration-650`}
                onClick={toggleMenu}
            >
                <p className={`rounded-[25px] absolute me-1 my-4 top-0 right-0 w-[100px] h-12 text-lg text-center flex justify-center items-center hover:bg-black/50 transition duration-500 ${!open ? "translate-y-16 opacity-0 pointer-event-none" : ""}`}>
                    {`close`}
                </p>
            </button>
        </motion.div>
    </div>);
};

export default MenuButton;