'use client'
import Link from "next/link";
import Navigation from "./navbar";

const Header = () => {
    
    return (
        <header className="fixed top-0 flex self-start justify-end items-center h-[120px] w-full bg-transparent text-base text-stone-700 p-2 z-[1000]">
            <Link href={'/'} className="border-test p-4 me-auto text-4xl">
            {/* Logo Placeholder */}
            WS
            </Link>
            <div className="justify-self-end p-4"><Navigation /></div>
            
        </header>
    )
}

export default Header;