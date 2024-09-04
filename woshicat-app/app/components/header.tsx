'use client'
import Link from "next/link";
import Image from "next/image";
import Navigation from "./navbar";
import { useEffect, useState } from "react";
import Cart from "./cart/cart";

const Header = () => {

    return (
        <>
            <header className={`fixed top-0 flex self-start justify-center items-center h-[95px] w-full bg-stone-100/50 text-base text-black p-2 z-[1000]`}>

                <div className="p-4"><Navigation /></div>
                <Link href={'/'} className="z-[1001] bg-transparent mx-auto">
                    <Image width={120} height={0} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' />
                </Link>
                <Cart />
                
            </header>
            
            

        </>
    )
}

export default Header;