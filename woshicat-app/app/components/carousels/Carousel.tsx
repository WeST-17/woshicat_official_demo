'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useWindowDimensions from "../transitions-navigation/useWindowDimension";
import Loader from "../transitions-navigation/LoadingScreen";

interface CarouselComponentProps {
    children: React.ReactNode,
    addClass?: string,
    numPerSlide: number
}

const ScrollingCarousel: React.FC<CarouselComponentProps> = ({ children, addClass, numPerSlide }) => {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const length = 3;
    const childRef = useRef<HTMLDivElement | null>(null);
    const windowSize = useWindowDimensions();

    const next = () => {
        if (currIndex < (length - 2)) {
            setCurrIndex(currIndex + 1);
        } else {
            setCurrIndex(0);
        }; 
    };

    const prev = () => {
        if (currIndex > 0) {
            setCurrIndex(currIndex - 1);
        } else {
            setCurrIndex(length - 2);
        };
    };

    if (windowSize.width === undefined) {
        
        return (
            <>
            <Loader />
            </>
        )
    };
    
    return (
        <div className={`w-full flex flex-col`}>
            <div className="w-full flex relative">
                <button className={`absolute -left-10 h-full z-[100] bg-stone-300 p-3 rounded-md opacity-50 hover:opacity-100 transition duration-300 ${length > (numPerSlide - 1) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={prev}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={10} height={1}/>
                </button>
                <div className="overflow-hidden w-full h-full">
                    <div
                        className={`flex transition transition-all duration-450 ease-in-out carousel-content ${addClass}`}
                        style={{
                            transform: `translateX(-${currIndex * (
                            1 / (windowSize.width > 1024 ? numPerSlide : (numPerSlide - 1)) * 100
                            )}%)`,
                        }}
                        ref={childRef}
                        >
                        {children}
                    </div>

                </div>
                <button className={`absolute h-full -right-10 z-[100] bg-stone-300 rounded-md p-3 opacity-50 hover:opacity-100 transition duration-300 ${length > (numPerSlide - 1) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={next} >
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={10} height={1}/>
                </button>
            </div>
        </div>
    )
}

export default ScrollingCarousel;