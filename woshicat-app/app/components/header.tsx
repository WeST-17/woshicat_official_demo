'use client'
import Link from "next/link";
import Image from "next/image";
import Navigation from "./transitions-navigation/navbar";
import Cart from "./cart/cart";


const Header = () => {

    return (
        <>
            <header className={`fixed top-0 flex justify-center items-center h-[70px] w-full bg-white/70 hover:bg-white text-base text-black p-2 z-[2000] transition duration-300`} id="header">
                <Link href={'/'} className="z-[1001] bg-transparent absolute lg:left-0 grid grid-flow-col flex justify-center lg:justify-start items-center w-64">
                    <Image width={75} height={1} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' priority/>
                    <h1 className="max-lg:hidden">WoShi Cat</h1>
                </Link>
                <div className="absolute w-screen flex justify-start lg:justify-center items-center p-4"><Navigation /></div>
                <div className="z-[1001] absolute right-0 flex justify-center items-center">
                    <Cart />
                </div>
            </header>
            
        </>
    )
}

export default Header;