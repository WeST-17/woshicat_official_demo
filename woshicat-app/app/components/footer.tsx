'use client';
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import EmailList from "./email-list/EmailList";
import ToggleButton from "./toggles/toggleButton";
import { useMetaPixel } from "../meta-pixels/PixelContext";

const Footer = () => {
    const [clicked, setClicked] = useState<boolean>(false);
    const pathname = usePathname().includes("lookbook");
    const { setHideNotice } = useMetaPixel();

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
        <footer className={`pt-20 relative w-screen grid-cols-8 ${pathname ? "bg-stone-900" : "bg-white"} text-base text-black transition transition-all duration-300 h-fit`}>
            <div className="col-span-8 p-4 flex flex-col items-center justify-center">
                {/* Email subscription list! */}
                <div className={`flex w-fit justify-center items-center min-h-fit pt-8 ${pathname ? "text-white" : ""}`} id="newsletter">
                    <EmailList clicked={clicked}/>  
                </div>
                <div className="border-t border-stone-400"/>
                {/* Social Media */}
                <div className={`flex text-sm justify-center items-center ${pathname ? "invert text-stone-200" : "text-stone-400"}`}>
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
            
            <div className="col-span-8 flex max-md:flex-col gap-4 justify-center text-center text-sm text-stone-400">
                <Link href={'/privacy-policy'} className="hover:text-black transition duration-250">Privacy Policy</Link>
                <Link href={'/terms-of-service'} className="hover:text-black transition duration-250">Terms of Service</Link>
                <Link href={'/about/faq'} className="hover:text-black transition duration-250">FAQ</Link>
                <Link href={'/contact-us'} className="hover:text-black transition duration-250">Contact Us</Link>
                <button className="hover:text-black transition duration-250" onClick={() => setHideNotice(false)}>Privacy Preferences</button>
            </div>
            <div className="absolute bottom-0 left-0 m-3 flex flex-col gap-1 justify-center items-start text-start text-stone-500 max-md:hidden">
                <ToggleButton />
                <p className="text-xs">{`Experimental: Smooth Scroll`}</p>
            </div>
            <div className={`mt-4 text-sm text-center w-full flex self-end items-center justify-center col-span-8 text-stone-400 ${pathname ? "invert" : ""}`}>
                {`WoShi Cat, LLC - 2026`}
            </div>
        </footer>
        </>
    )
}

export default Footer;