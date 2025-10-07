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
            <div className="w-full flex relative items-center justify-center overflow-hidden" >
                <section className="bg-stone-200/80 py-1 px-2 rounded-sm absolute bottom-0 mb-2 h-12 w-fit mx-auto flex gap-2 justify-center items-center z-[200]">
                    {new Array(childCount).fill("").map((_, i) => (
                        <div 
                            key={i}
                            className="flex justify-center items-center"
                        >
                            <span
                                key={i}
                                className={`block flex justify-center items-center rounded-md w-10 h-1 cursor-pointer transition-all content-[''] ${currIndex === i ? "opacity-100" : "opacity-60"}`}
                                onClick={() => setCurrIndex(i)}
                            >
                                <Image
                                    src={images[i].url}
                                    alt={images[i].alt}
                                    width={100}
                                    height={1}
                                    className="object-cover bg-white/80 aspect-square rounded-sm"
                                />
                            </span>
                        </div>
                    ))}
                </section>
                
                <button className={`absolute left-0 h-3/4 z-[100] p-2 rounded-md opacity-10 hover:opacity-80 transition duration-300`} onClick={prev} aria-description="previous slide button" disabled={childCount <= 1}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={25} height={1}/>
                </button>
                <div
                    className={`touch-pan-y carousel-auto relative w-full h-full flex transition transition-all duration-500 ease-in-out`}
                    style={{
                        transform: `translateX(-${currIndex * (100)}%)`,
                    }}
                    ref={childRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    >
                    {children}
                </div>
                <button className={`absolute h-3/4 right-0 z-[100] rounded-md p-2 opacity-10 hover:opacity-80 transition duration-350`} onClick={next} aria-description="next slide button" disabled={childCount <= 1}>
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={25} height={1}/>
                </button>
            </div>
        </>
    )
}

export default ProductCarousel;