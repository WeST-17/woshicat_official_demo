'use client';
import Link from "next/link";
import Image from "next/image";
import { DarkMode } from "./components/toggles/Dark_Mode/darkModeContext";

export default function NotFound() {
    const { darkMode } = DarkMode();

    return (
    <>
    <div className={`w-screen h-screen flex flex-col justify-center items-center ${darkMode ? 'bg-stone-900 text-stone-200' : 'text-black'}`}>
         <Image
            src={'/media/stickers/Subway2_Sticker.png'}
            alt={'sad yoyo subway sticker'}
            width={300}
            height={1}
            className="pointer-events-none mb-3 rounded-full"
        />
        <h2 className="mb-4 text-6xl text-center">{`404`}</h2>
        <h2 className="mb-4 text-base text-center">{`Yoyo couldn't find the page he wanted to show you...`}</h2>
        
        <Link href={'https://woshicat.com'} className="border-[0.5px] p-2 transition duration-300 hover:text-red-800 hover:bg-white rounded-lg">
            Return to Home
        </Link>
    </div>
    </>
    )
};