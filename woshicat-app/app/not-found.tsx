'use client';
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
    <>
    <div className="w-screen h-screen flex flex-col justify-center items-center">
         <Image
            src={'/media/stickers/Subway2_Sticker.png'}
            alt={'sad yoyo subway sticker'}
            width={250}
            height={1}
            className="pointer-events-none mb-3"
        />
        <h2 className="mb-4 text-6xl text-center">{`404`}</h2>
        <h2 className="mb-4 text-base text-center">{`Yoyo couldn't find the page he wanted to show you...`}</h2>
        
        <Link href={'https://woshicat.com'} className="border-[0.5px] text-black p-2 transition duration-300 hover:text-red-800 rounded-lg">
            Return to Home
        </Link>
    </div>
    </>
    )
};