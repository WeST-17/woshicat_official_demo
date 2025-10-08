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
        <section className={`relative w-full h-[75vh] ${classExtra}`} id='item-1'>
          <Link href={link}>
            <FadeInImage>
                <Image 
                    src={photoSrc}
                    alt={photoAlt}
                    fill={true}
                    className='object-cover h-full z-[1]'
                />
                <div className="absolute bottom-0 left-0 p-3 mx-2 mx-auto font-thin text-white bg-black/45 w-full z-[101]">
                    <h2 className="text-lg lg:text-2xl ">{title}</h2>
                </div>
            </FadeInImage>
            <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300 z-[100]'/>
          </Link>
        </section>
        </>
    )
}

export default LookBookCover;