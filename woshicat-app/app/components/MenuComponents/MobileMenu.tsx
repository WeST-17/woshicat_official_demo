'use client';
import NavLinks from "../transitions-navigation/nav-links";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { DarkMode } from "../toggles/Dark_Mode/darkModeContext";

// mobile menu and general cart menu
const MobileMenu = () => {
    const [openMenu, setMenuOpen] = useState(false);
    const menuBtnRef = useRef<HTMLDivElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { darkMode } = DarkMode();
    
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
        <div className={`bg-black/70 z-0 fixed left-0 top-0 w-screen h-screen transition-all duration-500 ease-in-out ${openMenu ? '' : 'opacity-0 pointer-events-none overflow-hidden'}`} ref={overlayRef} onClick={closeMenu}/>
        <div className="flex flex-col-reverse z-100">
            <div className={`menu_btn transition transition-all duration-500 ${openMenu ? 'open-btn' : ''}`} ref={menuBtnRef}>
                <span className={`line top_line rounded-md ${darkMode ? 'dark' : 'light'}`}></span>
                <span className={`line middle_line rounded-md ${darkMode ? 'dark' : 'light'}`}></span>
                <span className={`line bottom_line rounded-md ${darkMode ? 'dark' : 'light'}`}></span>
            </div>
            <div className={`menu-container overflow-hidden flex flex-col rounded-[12px] overflow-hidden ${openMenu ? 'open-menu' : ''} ${darkMode ? 'bg-stone-900/95' : 'bg-white/85'}`} ref={menuContainerRef}>
                <div className="gap-2 w-full h-full flex flex-col justify-center items-center" onClick={() => { setTimeout(() => { setMenuOpen(false)}, 150) }}>
                    <NavLinks closeMenu={closeMenu} />
                    {/* Social Media */}
                    <div className={`flex text-sm opacity-40 hover:opacity-70 transition-opacity duration-250 ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                        <div className="text-start transition duration-300 p-1">
                        <Link href='https://instagram.com/woshicatofficial' target='_blank' className="flex justify-center items-center gap-3">
                            <Image 
                                src={'/logo/instagram-brands-solid.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className={`${darkMode ? "invert" : "light-text"}`}
                                width={20}
                                height={20}
                            />
                            <p className="text-base">@woshicatofficial</p>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center"> 
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default MobileMenu;