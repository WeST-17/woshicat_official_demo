'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useWindowDimensions from "../transitions-navigation/useWindowDimension";
import Loader from "../transitions-navigation/LoadingScreen";

interface CarouselComponentProps {
    children: React.ReactNode,
    addClass?: string,
    numPerSlide: number,
    length: number,
    type?: string 
}

const ScrollingCarousel: React.FC<CarouselComponentProps> = ({ children, addClass, numPerSlide, length, type }) => {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const childRef = useRef<HTMLDivElement | null>(null);
    const windowSize = useWindowDimensions();

    useEffect(() => {
        const width = windowSize.width;
        window.addEventListener('resize', function () {
            if (window.innerWidth !== width) setCurrIndex(0);
        });

        console.log('window width changed: ', windowSize.width);
        return (): void => window.removeEventListener('resize', function () {
            if (window.innerWidth !== width) setCurrIndex(0);
        });
    }, [windowSize.width]);

    const next = () => {
        if (windowSize.width && windowSize.width > 1023) {
            if (currIndex < (length - Math.ceil(numPerSlide - 1))) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            }; 
        } else {
            if (currIndex < (length - Math.ceil(numPerSlide - 1))) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            };
        } 
    };

    const prev = () => {
        if (currIndex > 0) {
            setCurrIndex(currIndex - 1);
        } else {
            setCurrIndex((length - Math.ceil(numPerSlide - 1)));
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
        <div className={`w-full grid grid-cols-1`}>
            <div className="w-full flex relative items-center">
                <button className={`absolute left-2 lg:-left-10 h-1/2 z-[100] bg-stone-300 p-3 rounded-md opacity-20 hover:opacity-100 transition duration-300 ${length > (2) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={prev}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={10} height={1}/>
                </button>
                <div className="overflow-hidden w-full h-full">
                    <div
                        className={`flex transition transition-all duration-450 ease-in-out ${type ? `carousel-${type}` : 'carousel-collection'} ${addClass}`}
                        style={{
                            transform: `translateX(-${currIndex * (
                            1 / (windowSize.width >= 1024 ? numPerSlide : (numPerSlide !== Math.floor(numPerSlide) ? numPerSlide : 2)) * 100
                            )}%)`,
                        }}
                        ref={childRef}
                        >
                        {children}
                    </div>

                </div>
                <button className={`absolute h-1/2 right-2 lg:-right-10 z-[100] bg-stone-300 rounded-md p-3 opacity-20 hover:opacity-100 transition duration-300 ${length > (2) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={next} >
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={10} height={1}/>
                </button>
            </div>
        </div>
    )
}

export default ScrollingCarousel;