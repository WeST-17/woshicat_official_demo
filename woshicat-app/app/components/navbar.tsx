'use client';
import NavLinks from "./nav-links";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';

export default function Navigation() {
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
        <div className="hidden md:flex gap-2">
            <NavLinks closeMenu={closeMenu}/>
        </div>
        
        <div className="md:hidden">
            <div className={`bg-black/50 z-0 fixed left-0 top-0 w-[100vw] h-[100vh] ${openMenu ? '' : 'hidden overflow-hidden'}`} ref={overlayRef}></div>
            <div className="flex flex-col-reverse z-[100]">
                <div className={`scale-[0.7] menu_btn ${openMenu ? 'open-btn' : ''}`} ref={menuBtnRef}>
                    <span className='line top_line rounded-md'></span>
                    <span className='line middle_line rounded-md'></span>
                    <span className='line bottom_line rounded-md'></span>
                </div>
                <div className={`menu-container gap-2 pt-32 overflow-hidden grid grid-rows-6 ${openMenu ? 'open-menu' : ''}`} ref={menuContainerRef}>
                    <div onClick={() => { setTimeout(() => { setMenuOpen(false)}, 150) }}>
                        <NavLinks closeMenu={closeMenu} />
                    </div>

                    {/* Menu Footer */}
                    {/* <div className="w-full flex justify-end self-end row-start-4 row-end-5">
                        <div className="pe-2 text-end text-base w-full"></div>
                    </div> */}
                    <div className="w-full flex justify-start self-end row-start-6"> 
                        {/* Social Media */}
                        <div className='p-2 mb-8 flex text-sm text-stone-400'>
                            <div className="text-start rounded-md hover:text-stone-900 transition duration-300 p-2">
                            <Link href='https://instagram.com/woshicatofficial' target='_blank'>
                                <Image 
                                    src={'/logo/instagram-brands-solid.svg'}
                                    alt={'Instagram - WoShi Cat Official!'}
                                    className="text-stone-700 hover:scale-[1.05] transition duration-300"
                                    width={20}
                                    height={20}
                                />
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}