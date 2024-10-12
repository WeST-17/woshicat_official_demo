'use client'
import Link from "next/link";
import Image from "next/image";
import Navigation from "./navbar";
import Cart from "./cart/cart";

const Header = () => {

    return (
        <>
            <header className={`fixed top-0 flex self-start justify-center items-center h-[70px] w-full bg-white/90 text-base text-black p-2 z-[2000]`}>
                <Link href={'/'} className="z-[1001] bg-transparent absolute md:left-0 grid grid-flow-col flex justify-center md:justify-start items-center w-64">
                    <Image width={75} height={1} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' priority/>
                    <h2 className="max-md:hidden">WoShi Cat</h2>
                </Link>
                <div className="absolute w-screen flex justify-start md:justify-center items-center p-4 md:"><Navigation /></div>
                <div className="z-[1001] absolute right-0">
                    <Cart />
                </div>
            </header>
        </>
    )
}

export default Header;