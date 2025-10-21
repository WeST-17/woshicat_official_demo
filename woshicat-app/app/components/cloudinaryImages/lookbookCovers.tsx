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
        <section className={`relative w-full h-full overflow-hidden ${classExtra}`}>
          <Link href={link} className="relative w-full h-full">
                <Image 
                    src={photoSrc}
                    alt={photoAlt}
                    width={2000}
                    height={1}
                    className='object-cover h-full z-1'
                />
                <div className="absolute w-full h-full top-0 mx-auto text-white w-full z-99 flex justify-center items-center">
                    <h2 className="text-lg lg:text-2xl p-2 bg-black/30 hover:bg-black/10 transition duration-300 rounded-lg h-full w-full flex items-center">{title}</h2>
                </div>
            {/* <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 z-100'/> */}
          </Link>
        </section>
        </FadeInImage>
        </>
    )
}

export default LookBookCover;