'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface CarouselProps {
    messages: string[];
    link?: string,
}

const AutoCarousel: React.FC<CarouselProps> = ({ messages, link }) => {
    const [current, setCurrent] = useState(0);
    
    useEffect(() => {
        const timeout = 
        setTimeout(() => {
            slideNext();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [current])

    const slideNext = () => {
        setCurrent(current === messages.length - 1 ? 0 : current + 1);
    };

    return (
        <>
            <Link 
                className={`relative auto-carousel w-full h-20 h-8 flex justify-center items-center bg-orange-100 z-[1000] transition duration-300 ${!link ? 'pointer-events-none' : ''}`}
                href={link || ''}
                target="_blank"
                id="header-info"
            >
                {messages.map((message, index) => (
                    <div className={`absolute transition-opacity duration-500 text-xs md:text-base ${current === index ? 'opacity-100' : 'opacity-0'}`} key={index}>
                        {message}
                    </div>
                ))}
            </Link>
        </>
    )
}

export default AutoCarousel;