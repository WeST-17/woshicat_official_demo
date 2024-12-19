'use client';
import React, { useEffect, useState } from "react";

interface CarouselProps {
    messages: string[];
}

const AutoCarousel: React.FC<CarouselProps> = ({ messages }) => {
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
            <div className="relative auto-carousel w-full h-20 md:h-8 flex justify-center items-center bg-orange-100 z-[2000]">
                {messages.map((message, index) => (
                    <div className={`absolute transition-opacity duration-500 ${current === index ? 'opacity-100' : 'opacity-0'}`} key={index}>
                        {message}
                    </div>
                ))}
            </div>
        </>
    )
}

export default AutoCarousel;