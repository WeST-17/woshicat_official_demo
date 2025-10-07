'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface VideoHeroProps {
    source: string,
    linkToUrl?: string,
    logoSrc?: string,
    imageAlt?: string,
    imageWidth?: number,
    imageClassName?: string,
    children: React.ReactNode
};

const VideoHero: React.FC<VideoHeroProps> = ({ children, source, linkToUrl, logoSrc, imageAlt, imageWidth, imageClassName }) => {
    return (
        <>
        {/* Singularity */}
        <div className="flex relative justify-center items-center h-[100vh] w-screen">
        <video 
            className="object-cover xl:w-full max-xl:h-full" 
            autoPlay 
            loop 
            muted 
            playsInline={true} 
            data-v-f518367b="" 
            preload="metadata"
            
        >
            <source src={`${source}`} type="video/mp4" data-v-f518367b="" />
        </video> 
        <Link className="button-hover flex items-center justify-center absolute bottom-0 left-0 font-thin text-white w-full h-full p-12" href={linkToUrl || '/collections'}>
            <div className="relative z-[100] h-full w-full lg:w-1/2 p-2 w-full flex flex-col items-center justify-center font-bold text-center gap-2 pointer-events-none">
            <section className="w-full flex justify-center text-xl lg:text-3xl">
                {logoSrc && (
                    <Image 
                    src={logoSrc}
                    alt={imageAlt || 'oops, forgot to write an alt'}
                    width={imageWidth}
                    height={1}
                    className={imageClassName}
                    />
                )}
                {children}
            </section>
            
            </div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-black/35 hover:bg-black/60 transition duration-300 flex justify-center items-center" />
        </Link>
        </div>
        </>
    )
};

export default VideoHero;