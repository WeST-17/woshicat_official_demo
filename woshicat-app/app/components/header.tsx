'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./transitions-navigation/navbar";
import CartShow from "./cart/cartDisplay";
import { useCart } from "./cart/cartContext";
import { DarkMode } from "./toggles/Dark_Mode/darkModeContext";

const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const { cartOpen, setCurrentLink } = useCart();
    const { darkMode } = DarkMode();
    

    const HandleScroll = () => {
        
        const height = 
            document.documentElement.scrollHeight - 
            document.documentElement.clientHeight;
        const windowScroll = document.documentElement.scrollTop;
        const scrolled = (windowScroll / height) * 100;
        
        if ((scrolled - scrollPos) <= 0 || windowScroll <= 20 || cartOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        };

        setScrollPos(scrolled);
      }
    
    useEffect(() => {
        window.addEventListener("scroll", HandleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", HandleScroll);
        };
    }, [scrollPos]);

    const activeMenu = () => {
        setIsActive(!isActive);
    }

    return (
        <>
            <header className={`fixed absolute top-0 h-[70px] rounded-b-[12px] w-screen ${darkMode ? `dark-text bg-stone-700/65 hover:bg-stone-700/90` : `bg-white/60 hover:bg-white/90 light-text`} text-base z-2002 transition duration-500 flex ${!isVisible && !cartOpen ? '-translate-y-[70px]' : ''}`} id="header">
                <Link href={'/'} className={`z-1 bg-transparent absolute top-0 lg:left-0 grid grid-flow-col flex justify-center items-center max-lg:w-screen h-full lg:justify-start`} onClick={() => setCurrentLink('/')}>
                    <Image width={75} height={1} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' className={`${darkMode ? "brightness-0 invert" : "hue-rotate-212 brightness-180 opacity-90"}`} priority/>
                    <h1 className={`max-lg:hidden ${darkMode ? "dark-text" : "light-text"}`}>WoShi Cat</h1>
                </Link>
                <div className={`p-3 absolute max-lg:left-0 relative w-fit lg:mx-auto h-full flex justify-start lg:justify-center items-center transition transition-all duration-500 ease-in-out ${isActive ? "z-3001" : "z-2000"} ${darkMode ? "dark-text" : "light-text"}`} onClick={activeMenu}>
                    <Navigation />
                </div>
                
                <CartShow />
            </header>
        </>
    )
}

export default Header;