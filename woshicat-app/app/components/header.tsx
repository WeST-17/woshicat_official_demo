'use client'
import Link from "next/link";
import Image from "next/image";
import Navigation from "./navbar";
import Cart from "./cart/cart";

const Header = () => {

    return (
        <>
            <header className={`fixed top-0 flex self-start justify-center items-center h-[100px] w-full bg-stone-100/75 text-base text-black p-2 z-[1000]`}>
                
                <div className="p-4 me-auto"><Navigation /></div>
                <Link href={'/'} className="z-[1001] bg-transparent absolute left/50">
                    <Image width={100} height={0} src='/logo/Logo Red Version.png' alt='Wo Shi Cat logo red' />
                </Link>
                <Cart />
            </header>
        </>
    )
}

export default Header;