'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EmailList from "./email-list/EmailList";
import SmoothScrollToggleButton from "./toggles/toggleButton";
import PrivacyToggleButton from "./toggles/privacyToggle";
import { useMetaPixel } from "./MetaPixel/PixelContext";
import ToggleButton from "./toggles/templateToggle";
import { DarkMode } from "./toggles/Dark_Mode/darkModeContext";
import DarkModeToggle from "./toggles/Dark_Mode/darkModeToggle";

const Footer = () => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [openPref, setOpenPref] = useState<boolean>(false);
    const [features, setFeatures] = useState<boolean>(false);
    const [newsletterPopUp, setNewsletterPopUp] = useState<boolean | null>(null);
    const { consent } = useMetaPixel();
    const { darkMode } = DarkMode();

    const nClicked = () => {
        setClicked(true);

        const timeout = setTimeout(() => {
            setClicked(false)
        }, 5000);

        clearTimeout(timeout);
    };

    return (
        <>
        <div className="fixed bottom-0 right-0 flex justify-end items-center w-16 h-16 z-1000">
            <div className="newsletter-hover w-full h-full relative rounded-md">
                <Link 
                    className="opacity-60 hover:opacity-100 transition duration-500 ease w-full h-full"
                    href="#newsletter"
                    onClick={nClicked}
                >
                    <Image
                        src="/media/graphics/Yoyo happy fill.png"
                        alt="down arrow to get to footer and newsletter sign up"
                        fill={true}
                        className="w-full h-full"
                    />
                </Link>
                <div 
                    className="absolute flex flex-col justify-center items-center right-16 bottom-0 w-64 lg:w-96 h-20 nl-signup bg-stone-50/80 text-start rounded-md"
                >
                    <p className="rounded-md overflow-hidden px-2 mx-2 w-full flex items-center text-center text-xs md:text-lg">{`Sign up for the WoShi Cat Newsletter for 10% off your next order!`}</p>
                </div>
            </div>
        </div>
        
        <div className={`z-[3000] fixed inset-0 w-screen h-screen flex flex-col justify-center items-center text-start text-black transition-all duration-350 ${openPref ? "" : "opacity-0 pointer-events-none"}`}>
            <div className={`fixed inset-0 z-[-1] w-full h-full bg-black/50 ${openPref ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => {setOpenPref(false)}} />
            <div className="flex flex-col w-fit lg:w-96 h-fit p-8 items-start justify-center gap-6 bg-white rounded-sm relative">
                <p className="text-sm">{`Privacy, Cookies, and Third-Party Analytics Tracking Preferences: `}</p>
                <button className="absolute top-0 right-0 m-2 text-black/45 text-xs hover:text-black" onClick={() => {setOpenPref(false)}}>close</button>
                <div className="flex items-center w-fit gap-4">
                    <PrivacyToggleButton />
                    <p className="text-sm">Analytics + Marketing Tracking: {consent?.toUpperCase()}{`${consent === 'grant' ? 'ED' : `${consent === 'revoke' ? 'D' : 'NONE SET'}`}`}</p>
                </div>
                <div className="flex items-center w-fit gap-4">
                    <ToggleButton alwaysOn={true} switch_id="functional"/>
                    <p className="text-sm">Strictly Necessary Website Function Cookies</p>
                </div>
            </div>
        </div>

        <div className={`z-[3000] fixed inset-0 w-screen h-screen flex flex-col justify-center items-center text-start text-black transition-all duration-350 ${features ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className={`fixed inset-0 z-[-1] w-full h-full bg-black/50 ${features ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => {setFeatures(false)}} />
            <div className={`flex flex-col w-fit lg:w-96 h-fit p-5 items-start justify-center gap-4 bg-white rounded-sm relative`}>
                <p className="text-sm">{`Experimental Website Features: `}</p>
                <button className="absolute top-0 right-0 m-2 text-black/65 hover:text-black" onClick={() => {setFeatures(false)}}>close</button>
                <div className="flex w-fit gap-4">
                    <SmoothScrollToggleButton />
                    <p className="text-xs">{`Experimental: Smooth Scroll [ Desktop Only ]`}</p>
                </div>
                <div className="flex w-fit gap-4 testing-feature-hover relative">
                    <DarkModeToggle />
                    <p className="text-xs">{`Experimental: Dark Mode - `}{darkMode ? 'ON' : 'OFF'}</p>
                </div>
                <div className="bg-white/95 notice-feature absolute w-full h-fit p-2 rounded-[8px] left-0 -bottom-15">
                    <div className="w-full text-xs">{`Dark Mode is an experimental feature. Please be understanding of any visual issues that may occur. Thanks!`}</div>
                </div>
            </div>
        </div>

        <footer className={`pt-20 relative w-screen grid-cols-8 ${darkMode ? "bg-stone-800/90" : "bg-white"} text-base text-black transition transition-all duration-300 h-fit`}>
            <div className="col-span-8 p-4 flex flex-col items-center justify-center">
                {/* Email subscription list! */}
                <div className={`flex w-fit justify-center items-center min-h-fit pt-8 ${darkMode ? "text-white" : ""}`} id="newsletter">
                    <EmailList clicked={clicked}/>  
                </div>
                <div className="border-t border-stone-400"/>
                {/* Social Media */}
                <div className={`flex text-sm justify-center items-center ${darkMode ? "invert text-stone-200" : "text-stone-400"}`}>
                    {/* Instagram */}
                    <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://instagram.com/woshicatofficial' target='_blank' className="flex justify-center items-center gap-2">
                            <Image 
                                src={'/logo/instagram-brands-solid.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="opacity-50 hover:opacity-100 transition duration-300"
                                width={25}
                                height={25}
                            />
                        </Link>
                    </div>
                    {/* YouTube */}
                    <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://youtube.com/@woshicat_official' target='_blank' className="flex justify-center items-center gap-2">
                            <Image 
                                src={'/logo/youtube-brands.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="opacity-50 hover:opacity-100 transition duration-300"
                                width={30}
                                height={30}
                            />
                        </Link>
                    </div>
                     {/* TikTok */}
                     <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://www.tiktok.com/@woshicatofficial' target='_blank' className="flex justify-center items-center gap-2">
                            <Image 
                                src={'/logo/tiktok-brands-solid.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="opacity-50 hover:opacity-100 transition duration-300"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className={`col-span-8 flex max-md:flex-col gap-2 md:gap-4 justify-center text-center text-sm mb-4 ${darkMode ? 'dark-text' : 'light-text'}`}>
                <Link href={'/privacy-policy'} className={`link-button`}>Privacy Policy</Link>
                <Link href={'/terms-of-service'} className="link-button">Terms of Service</Link>
                <Link href={'/about/faq'} className="link-button">FAQ</Link>
                <Link href={'/contact-us'} className="link-button">Contact Us</Link>
                <button className="" onClick={() => { setOpenPref(true) }}>
                    Privacy Preferences
                </button>
                <button className="" onClick={() => { setFeatures(true) }}>
                    Experimental Features
                </button>
            </div>
            
            <div className={`mt-4 text-sm text-center w-full flex self-end items-center justify-center col-span-8 text-stone-400`}>
                {`WoShi Cat, LLC - 2026`}
            </div>
        </footer>
        </>
    )
}

export default Footer;

