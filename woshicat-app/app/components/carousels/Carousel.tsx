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
    type?: string,
    mobileSlide: number
}

const ScrollingCarousel: React.FC<CarouselComponentProps> = ({ children, addClass, numPerSlide, length, type, mobileSlide }) => {
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
            if (currIndex < (length - Math.ceil(numPerSlide - 1))) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            }; 
        } else {
            if (currIndex < (length - Math.floor(mobileSlide))) {
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
            if (windowSize.width && windowSize.width > 1023) {
                setCurrIndex((length - Math.ceil(numPerSlide - 1)));
            } else {
                setCurrIndex((length - Math.floor(mobileSlide)));
            }
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
        <div className={`w-full grid grid-cols-1 overflow-hidden`}>
            <div className="w-full flex relative items-center">
                <button className={`absolute left-2 lg:-left-10 h-1/2 z-[100] bg-white px-3 rounded-md opacity-20 hover:opacity-80 transition duration-500 ${length > (2) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={prev}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={20} height={1}/>
                </button>
                <div className="overflow-hidden w-full h-full">
                    <div
                        className={`touch-pan-y flex transition transition-all duration-500 ease-in-out ${type ? `carousel-${type}` : 'carousel-collection'} ${addClass}`}
                        style={{
                            transform: `translateX(-${currIndex * (
                            1 / (windowSize.width >= 1024 ? numPerSlide : mobileSlide) * 100
                            )}%)`,
                        }}
                        ref={childRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        >
                        {children}
                    </div>

                </div>
                <button className={`absolute h-1/2 right-2 lg:-right-10 z-[100] bg-white rounded-md px-3 opacity-20 hover:opacity-80 transition duration-500 ${length > (2) ? '' : 'hidden'} ${length <= numPerSlide ? 'lg:hidden' : ''}`} onClick={next} >
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={20} height={1}/>
                </button>
            </div>
        </div>
    )
}

export default ScrollingCarousel;