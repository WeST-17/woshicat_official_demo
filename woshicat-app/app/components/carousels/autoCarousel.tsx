'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CarouselProps {
    children?: React.ReactNode
}

const AutoCarousel: React.FC<CarouselProps> = ({ children }) => {
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [auto, setAuto] = useState<boolean>(true);
    const childRef = useRef<HTMLDivElement | null>(null);
    const [childCount, setChildCount] = useState<number>(0);
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
        
        setTouchPosition(null);
    };

    useEffect(() => {
        if (auto) {
            const timeout = 
            setTimeout(() => {
                slideNext();
            }, 10000);
            return () => clearTimeout(timeout);
        }
        
    }, [currIndex, auto])

    const playControls = () => {
        setAuto(!auto);
    }

    const slideNext = () => {
        setCurrIndex(currIndex === childCount - 1 ? 0 : currIndex + 1);
    };

    useEffect(() => {
        const getChildCount = async () => {
            if (childRef.current) {
                setChildCount(childRef.current?.childNodes.length);
            }
            
        } 
        getChildCount();
    }, [childRef.current])

    const next = () => {
        if (childRef.current && currIndex < (childCount - 1)) {
            setCurrIndex(currIndex + 1);
        } else {
            setCurrIndex(0);
        }; 
    };

    const prev = () => {
        if (currIndex > 0) {
            setCurrIndex(currIndex - 1);
        } else {
            setCurrIndex(childCount - 1)
        };
        
    };


    return (
        <>
            <div className="w-full flex relative items-center justify-center overflow-hidden" >
                <section className="absolute bottom-0 mb-2 h-12 w-fit mx-auto flex gap-2 justify-center items-center z-[200]">
                    {new Array(childCount).fill("").map((_, i) => (
                        <div 
                            key={i}
                            className="flex justify-center items-center h-full w-fit"
                        >
                            <span
                                key={i}
                                className={`bg-white rounded-full flex justify-center items-center w-10 h-2 cursor-pointer transition-all ${currIndex === i ? "" : "opacity-50"}`}
                                onClick={() => setCurrIndex(i)}
                            />
                        </div>
                    ))}
                </section>
                <button className="px-2 opacity-80 hover:opacity-100 hover:bg-white/40 transition duration-450 rounded-md absolute bottom-0 left-0 m-2 z-[100] text-white flex items-center gap-2 text-sm h-10 md:w-36" onClick={playControls} aria-description="play and pause control button for carousel" disabled={childCount <= 1}>
                    {auto ? 
                        <>
                        <Image 
                            src="/icons/playpausecontrols/pause-solid-full-white.svg"
                            alt="Pause button"
                            height={25}
                            width={25}
                        />
                        <p className="hidden md:block">pause slideshow</p>
                        </> 
                        :
                        <>
                        <Image 
                            src="/icons/playpausecontrols/play-solid-full-white.svg"
                            alt="Play button"
                            height={25}
                            width={25}  
                        />
                        <p className="hidden md:block">play slideshow</p>
                        </>
                    }
                </button>
                <button className={`absolute left-0 h-3/4 z-[100] p-2 rounded-md opacity-30 hover:opacity-100 transition duration-300`} onClick={prev} aria-description="previous slide button" disabled={childCount <= 1}>
                    <Image src={'/icons/caret-left-solid-white.svg'} alt={'left arrow'} width={25} height={1}/>
                </button>
                <div
                    className={`touch-pan-y carousel-auto relative w-full h-full flex transition transition-all duration-[1.5s] ease-in-out`}
                    style={{
                        transform: `translateX(-${currIndex * (100)}%)`,
                    }}
                    ref={childRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    >
                    {children}
                </div>
                <button className={`absolute h-3/4 right-0 z-[100] rounded-md p-2 opacity-30 hover:opacity-100 transition duration-350`} onClick={next} aria-description="next slide button" disabled={childCount <= 1}>
                    <Image src={'/icons/caret-right-solid-white.svg'} alt={'right arrow'} width={25} height={1}/>
                </button>
            </div>
        </>
    )
}

export default AutoCarousel;