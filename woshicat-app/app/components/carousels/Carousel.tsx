'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useWindowDimensions from "../transitions-navigation/useWindowDimension";
import Loader from "../transitions-navigation/LoadingScreen";

interface CarouselComponentProps {
    children: React.ReactNode,
    addClass?: string,
    numPerSlide: number,
    mobileSlide: number,
    autoPlay?: boolean
}

const ScrollingCarousel: React.FC<CarouselComponentProps> = ({ children, addClass, numPerSlide, mobileSlide, autoPlay }) => {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const childRef = useRef<HTMLDivElement | null>(null);
    const windowSize = useWindowDimensions();
    const [touchPosition, setTouchPosition] = useState<any>(null);
    const [childCount, setChildCount] = useState<number>(0);

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
        if (windowSize.width && windowSize.width > 767) {
            if ((currIndex < (Math.ceil(childCount / numPerSlide)) - 1)) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            }; 
        } else {
            if (currIndex < (Math.ceil(childCount / mobileSlide) - 1)) {
                setCurrIndex(currIndex + 1);
            } else {
                setCurrIndex(0);
            };
        } 
    };

    const prev = () => {
        if (windowSize.width && windowSize.width > 767) {
            if ((currIndex > 0)) {
                setCurrIndex(currIndex - 1);
            } else {
                setCurrIndex((Math.ceil(childCount / numPerSlide)) - 1);
            }; 
        } else {
            if (currIndex > 0) {
                setCurrIndex(currIndex - 1);
            } else {
                setCurrIndex((Math.ceil(childCount / mobileSlide) - 1));
            }
        };
        
    };

    useEffect(() => {
        const getChildCount = async () => {
            if (childRef.current) {
                setChildCount(childRef.current?.childNodes.length);
            }
        } 
        getChildCount();
    }, [childRef.current])

    useEffect(() => {
        if (autoPlay) {
            const timeout = 
            setTimeout(() => {
                next();
            }, 6000);
            return () => clearTimeout(timeout);
        }   
        
    }, [currIndex, autoPlay])

    if (windowSize.width === undefined) {
        
        return (
            <div className="w-full h-full flex justify-center">
            <Loader />
            </div>
        )
    };
    
    return (
        <>
        <section className={`absolute left-1/4 -bottom-12 h-12 w-1/2 mx-auto flex justify-center items-center z-200 gap-1`}>
            {windowSize.width >= 768 ? new Array(Math.ceil(childCount / numPerSlide)).fill("").map((_, i) => (
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
            )) : new Array(Math.ceil(childCount / mobileSlide)).fill("").map((_, i) => (
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
        <div className={`relative w-full overflow-hidden rounded-lg`}>
            <div className="w-full flex relative items-center">
                <button className={`absolute left-0 h-3/4 z-100 bg-white px-4 rounded-md opacity-10 hover:opacity-80 transition duration-500 ${childCount > (2) ? '' : 'hidden'} ${childCount <= numPerSlide ? 'lg:hidden' : ''}`} onClick={prev}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={15} height={1}/>
                </button>
                <div className="relative overflow-hidden w-full h-full touch-x-none">
                    <div
                        className={`touch-pan-y flex transition transition-all ${childCount >= 5 ? 'duration-850' : 'duration-500'} ease-in-out carousels ${addClass}`}
                        style={{
                            transform: `translateX(-${currIndex * ((windowSize.width >= 768 ? 100 * Math.floor(numPerSlide) * (childCount % 3 > 0 && (childCount % Math.floor(numPerSlide) > 0 && currIndex === Math.floor(childCount / Math.floor(Math.floor(numPerSlide)))) ? (1 - (0.16667 * (Math.floor(numPerSlide) - (childCount % (Math.floor(numPerSlide)))))) : 1) : 100 * Math.floor(mobileSlide)))}%)`,
                            width: `calc(${100 / (windowSize.width >= 768 ? numPerSlide : mobileSlide)}%)`
                        }}
                        ref={childRef}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        >
                        {children}
                        
                    </div>

                </div>
                <button className={`absolute h-3/4 right-0 z-100 bg-white rounded-md px-4 opacity-10 hover:opacity-80 transition duration-500 ${childCount > (2) ? '' : 'hidden'} ${childCount <= numPerSlide ? 'md:hidden' : ''}`} onClick={next} >
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={15} height={1}/>
                </button>
            </div>
        </div>
        </>
    )
}

export default ScrollingCarousel;