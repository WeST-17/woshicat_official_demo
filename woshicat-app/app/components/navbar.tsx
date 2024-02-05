'use client';
import NavLinks from "./nav-links";
import Link from "next/link";
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
            document.body.classList.toggle('menu-open', !openMenu);
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
        <div>
            <div className={`bg-black/50 z-0 fixed left-0 top-0 w-[100vw] h-[100vh] ${openMenu ? '' : 'hidden overflow-hidden'}`} ref={overlayRef}></div>
            <div className="flex flex-col-reverse z-[100]">
                <div className={`menu_btn ${openMenu ? 'open-btn' : ''}`} ref={menuBtnRef}>
                    <span className='line top_line rounded-md'></span>
                    <span className='line middle_line rounded-md'></span>
                    <span className='line bottom_line rounded-md'></span>
                </div>
                <div className={`menu-container gap-2 pt-20 overflow-hidden grid grid-rows-6 ${openMenu ? 'open-menu' : ''}`} ref={menuContainerRef}>
                    <div onClick={() => { setTimeout(() => { setMenuOpen(false)}, 150) }}>
                        <NavLinks closeMenu={closeMenu} />
                    </div>

                    {/* Menu Footer */}
                    <div className="w-full flex justify-end self-end row-start-4 row-end-5">
                        <div className="pe-2 text-end text-base w-full"></div>
                    </div>
                    <div className="pe-2 w-full row-start-5 row-end-6 text-end">
                        <label htmlFor="email" className="block text-base leading-6">Join our email list for Wo Shi Cat updates!</label>
                        <div className="flex justify-end mt-2">
                            <input id='email' name='email' type='email' autoComplete="email" placeholder="johndoe@gmail.com"
                            className="flex flex-none w-72 text-end rounded-md border-0 py-1.5 pe-1.5 text-stone-700 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6" />
                        </div>
                        <button
                            type="submit"
                            className="rounded-md bg-stone-600 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                            >
                            Submit!
                        </button>
                    </div>
                    <div className="w-full flex justify-end self-end row-start-6"> 
                        {/* Social Media */}
                        <div className='p-2 flex text-sm'>
                            <div className="text-end rounded-md hover:bg-stone-200 transition duration-300 p-2"><Link href='https://instagram.com' target='_blank'>Instagram</Link></div>
                            <div className="text-end rounded-md hover:bg-stone-200 transition duration-300 p-2"><Link href='https://tiktok.com' target='_blank'>TikTok</Link></div>
                            <div className="text-end rounded-md hover:bg-stone-200 transition duration-300 p-2"><Link href='https://youtube.com' target='_blank'>YouTube</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}