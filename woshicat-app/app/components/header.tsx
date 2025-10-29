'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./transitions-navigation/navbar";
import CartShow from "./cart/cartDisplay";

const Header = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const activeMenu = () => {
        setIsActive(!isActive);
    }

    return (
        <>
            <header className={`fixed sticky top-0 h-[70px] w-screen bg-white/70 hover:bg-white text-base text-black p-2 z-2002 transition duration-500 flex`} id="header">
                <Link href={'/'} className="z-1 bg-transparent absolute top-0 lg:left-0 grid grid-flow-col flex justify-center items-center max-lg:w-screen h-full lg:justify-start">
                    <Image width={75} height={1} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' priority/>
                    <h1 className="max-lg:hidden">WoShi Cat</h1>
                </Link>
                <div className={`p-2 absolute max-lg:left-0 relative w-fit lg:mx-auto h-full flex justify-start lg:justify-center items-center transition transition-all duration-500 ease-in-out ${isActive ? "z-2006" : "z-2000"}`} onClick={activeMenu}>
                    <Navigation />
                </div>
                
                <CartShow />
            </header>
        </>
    )
}

export default Header;