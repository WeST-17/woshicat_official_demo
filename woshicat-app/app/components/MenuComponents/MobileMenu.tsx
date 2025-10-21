'use client';
import NavLinks from "../transitions-navigation/nav-links";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';

// mobile menu and general cart menu
const MobileMenu = () => {
    const [openMenu, setMenuOpen] = useState(false);
    const menuBtnRef = useRef<HTMLDivElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    
    const closeMenu = () => {
        // Close the menu
        if (menuBtnRef.current && menuContainerRef.current && overlayRef.current) {
          menuBtnRef.current.classList.remove('open-btn');
          menuContainerRef.current.classList.remove('open-menu');
          overlayRef.current.classList.add('hidden');
          setMenuOpen(false);
          document.body.classList.remove('menu-open');
        }
    }
    
    useEffect(() => {
        const menuBtn = menuBtnRef.current;
        const menuContainer = menuContainerRef.current;
        const overlay = overlayRef.current;

        const handleClick = () => {
            menuBtn?.classList.toggle('open-btn');
            menuContainer?.classList.toggle('open-menu');
            overlay?.classList.toggle('hidden');
            setMenuOpen(!openMenu); // Toggle menu state
        };

        if (menuBtn) {
            menuBtn.addEventListener('click', handleClick);

            return () => {
                // Clean up event listener when component unmounts
                menuBtn.removeEventListener('click', handleClick);
            };
        }
    }, [openMenu, menuBtnRef, menuContainerRef, overlayRef]); // Add openMenu, menuBtnRef, menuContainerRef, and overlayRef as dependencies

    return (
        <>
        <div className={`bg-black/70 z-0 fixed left-0 top-0 w-screen h-screen transition-all duration-500 ease-in-out ${openMenu ? '' : 'hidden overflow-hidden'}`} ref={overlayRef} />
        <div className="flex flex-col-reverse z-100">
            <div className={`menu_btn transition transition-all duration-500 ${openMenu ? 'open-btn translate-y-8 translate-x-2' : ''}`} ref={menuBtnRef}>
                <span className='line top_line rounded-md'></span>
                <span className='line middle_line rounded-md'></span>
                <span className='line bottom_line rounded-md'></span>
            </div>
            <div className={`menu-container pt-20 my-8 mx-2 overflow-hidden flex flex-col rounded-lg ${openMenu ? 'open-menu' : ''}`} ref={menuContainerRef}>
                <div onClick={() => { setTimeout(() => { setMenuOpen(false)}, 150) }}>
                    <NavLinks closeMenu={closeMenu} />
                </div>
                <div className="w-full flex justify-center mt-8"> 
                    {/* Social Media */}
                    <div className='flex text-sm text-stone-500'>
                        <div className="text-start rounded-md hover:text-black transition duration-300 p-1">
                        <Link href='https://instagram.com/woshicatofficial' target='_blank' className="flex justify-center items-center gap-1">
                            <Image 
                                src={'/logo/instagram-brands-solid.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="text-black"
                                width={20}
                                height={20}
                            />
                            @woshicatofficial
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MobileMenu;