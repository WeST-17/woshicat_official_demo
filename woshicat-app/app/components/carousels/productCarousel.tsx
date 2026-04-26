'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CarouselProps {
    children?: React.ReactNode,
    images: any[]
}

const ProductCarousel: React.FC<CarouselProps> = ({ children, images }) => {
    const [currIndex, setCurrIndex] = useState<number>(0);
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
            <section className="py-1 rounded-xs mb-2 h-10 w-16 h-full gap-1 mx-auto flex flex-col justify-center items-center z-200">
                {new Array(childCount).fill("").map((_, i) => (
                    <div 
                        key={i}
                        className="flex justify-center items-center"
                    >
                        <span
                            key={i}
                            className={`block flex justify-center items-center rounded-md h-full cursor-pointer transition-all content-[''] ${currIndex === i ? "opacity-100 w-12" : "opacity-50 w-8"}`}
                            onClick={() => setCurrIndex(i)}
                        >
                            <Image
                                src={images[i].url}
                                alt={images[i].altText}
                                width={100}
                                height={1}
                                className="object-cover w-full h-full bg-white/80 aspect-square rounded-xs"
                            />
                        </span>
                    </div>
                ))}
            </section>

            <div className={`bg-white w-full flex relative items-center justify-center overflow-hidden rounded-lg touch-x-none`} >                
                <button className={`absolute left-1 h-1/2 z-100 p-2 rounded-md opacity-10 hover:opacity-80 transition duration-300 bg-white`} onClick={prev} aria-description="previous slide button" disabled={childCount <= 1}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={10} height={1}/>
                </button>
                <div
                    className={`touch-pan-y carousel-auto relative w-full h-full flex transition transition-all duration-500 ease-in-out rounded-[8px]`}
                    style={{
                        transform: `translateX(-${currIndex * (100)}%)`,
                    }}
                    ref={childRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    >
                    {children}
                </div>
                <button className={`absolute h-1/2 bg-white right-1 z-100 rounded-md p-2 opacity-10 hover:opacity-80 transition duration-350`} onClick={next} aria-description="next slide button" disabled={childCount <= 1}>
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={10} height={1}/>
                </button>
            </div>
        </>
    )
}

export default ProductCarousel;