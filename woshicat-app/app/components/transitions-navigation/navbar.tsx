'use client';
import NavLinks from "./nav-links";
import MobileMenu from "../MenuComponents/MobileMenu";

export default function Navigation() {

    return (
        <>
        <div className="hidden lg:flex h-[70px]">
            <NavLinks />
        </div>
        
        <div className={`lg:hidden hover:z-2005 `}>
            <MobileMenu />
        </div>
        </>
    )
}