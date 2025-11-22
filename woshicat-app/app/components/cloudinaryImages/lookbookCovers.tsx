'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInImage from "../transitions-navigation/FadeInImages";

interface LookBookCoverProps {
    photoSrc: string,
    photoAlt: string,
    title: string,
    link: string,
    classExtra?: string
}

const LookBookCover: React.FC<LookBookCoverProps> = ({ photoSrc, photoAlt, title, link, classExtra }) => {
    return (
        <>
        <FadeInImage>
        <Link href={link} className="relative w-full aspect-4/5 lg:aspect-5/4">
        <section className={`relative w-full h-full overflow-hidden ${classExtra}`}>
                <Image 
                    src={photoSrc}
                    alt={photoAlt}
                    width={1000}
                    height={1}
                    className='object-cover h-full w-full z-1'
                />
            
            <div className="absolute w-full h-full bottom-0 mx-auto text-white w-full z-100 flex justify-center items-center bg-black/65 hover:bg-black/10 transition duration-300">
                <h2 className="text-lg lg:text-2xl p-2 bg-black/10 rounded-lg h-full w-full flex justify-center items-center pointer-events-none">{title}</h2>
            </div>
            
        </section>
        </Link>
        </FadeInImage>
        </>
    )
}

export default LookBookCover;