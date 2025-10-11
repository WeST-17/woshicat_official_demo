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
    mobileSlide: number
}

const ScrollingCarousel: React.FC<CarouselComponentProps> = ({ children, addClass, numPerSlide, length, mobileSlide }) => {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const childRef = useRef<HTMLDivElement | null>(null);
    const windowSize = useWindowDimensions();

    const [touchPosition, setTouchPosition] = useState<any>(null);

    useEffect(() => {
            window.addEventListener("touchstart", handleTouchStart, { passive: false });
            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            return () => {
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
            };
        }, []);
    
    const handleTouchStart = (e: any) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: any) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

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
            if ((currIndex < (Math.ceil(length / numPerSlide)) - 1)) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            }; 
        } else {
            if (currIndex < (Math.ceil(length / mobileSlide) - 1)) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            };
        } 
    };

    const prev = () => {
        if (windowSize.width && windowSize.width > 1023) {
            if ((currIndex > 0)) {
                setCurrIndex(currIndex - 1);
            } else {
                setCurrIndex((Math.ceil(length / numPerSlide)) - 1);
            }; 
        } else {
            if (currIndex > 0) {
                setCurrIndex(currIndex - 1);
            } else {
                setCurrIndex((Math.ceil(length / mobileSlide) - 1));
            }
        };
        
    };

    if (windowSize.width === undefined) {
        
        return (
            <div className="w-full h-full flex justify-center">
            <Loader />
            </div>
        )
    };
    
    return (
        <>
        <section className={`absolute left-1/4 -bottom-12 h-12 w-1/2 mx-auto flex justify-center items-center z-[200] gap-1`}>
            {windowSize.width >= 1024 ? new Array(Math.ceil(length / numPerSlide)).fill("").map((_, i) => (
                <div 
                    key={i}
                    className="flex justify-center items-center h-full w-fit"
                >
                    <span
                        key={i}
                        className={`bg-red-900/50 rounded-full flex justify-center items-center h-2 cursor-pointer transition-all ${currIndex === i ? "w-6" : "w-2 opacity-50"} `}
                        onClick={() => setCurrIndex(i)}
                    />
                </div>
            )) : new Array(Math.ceil(length / mobileSlide)).fill("").map((_, i) => (
                <div 
                    key={i}
                    className="flex justify-center items-center h-full w-fit"
                >
                    <span
                        key={i}
                        className={`bg-red-900/50 rounded-full flex justify-center items-center h-2 cursor-pointer transition-all ${currIndex === i ? "w-6" : "w-2 opacity-50"} `}
                        onClick={() => setCurrIndex(i)}
                    />
                </div>
            ))}
        </section>
        <div className={`relative w-full overflow-hidden`}>
            <div className="w-full flex relative items-center">
                <button className={`absolute left-2 h-3/4 z-[100] bg-white px-2 rounded-md opacity-10 hover:opacity-80 transition duration-500 ${length > (2) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={prev}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={20} height={1}/>
                </button>
                <div className="relative overflow-hidden w-full h-full">
                    <div
                        className={`lg:gap-1 touch-pan-y flex transition transition-all duration-500 ease-in-out carousels ${addClass}`}
                        style={{
                            transform: `translateX(-${currIndex * (100 * (windowSize.width >= 1024 ? Math.floor(numPerSlide) : Math.floor(mobileSlide)))}%)`,
                            width: `calc(${100 / (windowSize.width >= 1024 ? numPerSlide : mobileSlide)}%)`
                        }}
                        ref={childRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        >
                        {children}
                    </div>

                </div>
                <button className={`absolute h-3/4 right-2 z-[100] bg-white rounded-md px-2 opacity-10 hover:opacity-80 transition duration-500 ${length > (2) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={next} >
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={20} height={1}/>
                </button>
            </div>
        </div>
        </>
    )
}

export default ScrollingCarousel;