'use client'

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./transitions-navigation/navbar";
import CartShow from "./cart/cartDisplay";
import { useCart } from "./cart/cartContext";

const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathname = usePathname().includes("lookbook");
    const [scrollPos, setScrollPos] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const { cartOpen } = useCart();

    const HandleScroll = () => {
        const height = 
            document.documentElement.scrollHeight - 
            document.documentElement.clientHeight;
        const windowScroll = document.documentElement.scrollTop;
        const scrolled = (windowScroll / height) * 100;
        
        if ((scrolled - scrollPos) <= 0 || windowScroll <= 20) {
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
            <header className={`fixed absolute top-0 h-[70px] w-screen ${pathname ? `bg-stone-900/60 hover:bg-stone-900/90` : `bg-white/60 hover:bg-white`} text-base text-black p-2 z-2002 transition duration-500 flex ${!isVisible && !cartOpen ? '-translate-y-[70px]' : ''}`} id="header">
                <Link href={'/'} className={`z-1 bg-transparent absolute top-0 lg:left-0 grid grid-flow-col flex justify-center items-center max-lg:w-screen h-full lg:justify-start`}>
                    <Image width={75} height={1} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' className={`${pathname ? "brightness-10 invert" : ""}`} priority/>
                    <h1 className={`max-lg:hidden ${pathname ? "invert" : ""}`}>WoShi Cat</h1>
                </Link>
                <div className={`p-2 absolute max-lg:left-0 relative w-fit lg:mx-auto h-full flex justify-start lg:justify-center items-center transition transition-all duration-500 ease-in-out ${isActive ? "z-3001" : "z-2000"} ${pathname ? "invert" : ""}`} onClick={activeMenu}>
                    <Navigation />
                </div>
                
                <CartShow />
            </header>
        </>
    )
}

export default Header;