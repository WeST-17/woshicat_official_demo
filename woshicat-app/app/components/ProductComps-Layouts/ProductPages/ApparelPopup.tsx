'use client';

import { useState, useEffect } from "react";
import { DarkMode } from "../../toggles/Dark_Mode/darkModeContext";
import { useProductPages } from "./ProductPagesContext";
import Image from "next/image";


const ApparelPopup = () => {
    const { darkMode } = DarkMode();
    const { images, index, setIndex, showImages, setShowImages} = useProductPages();
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

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

    const next = () => {
        if (index < images!.length - 1) {
            const nextIndex = index + 1;
            setIndex(nextIndex);
        } else {
            setIndex(0);
        }
    };

    const prev = () => {
        if (index > 0) {
            const nextIndex = index - 1;
            setIndex(nextIndex);
        } else {
            setIndex(images!.length - 1);
        }
    };
    
    return (
        <div className={`max-lg:hidden absolute top-0 fixed inset-0 w-screen h-screen z-4000 flex justify-center items-center transition-opacity duration-500 ${showImages ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute w-screen h-full bg-black/65" onClick={() => setShowImages(false)}/>
            <div className="top-0 flex justify-center items-center h-full lg:w-1/3 mx-auto overflow-hidden relative rounded-[8px] lg:py-8">
                <button className={`absolute left-1 h-1/2 z-100 p-2 rounded-md opacity-10 hover:opacity-80 transition duration-300 bg-white`} onClick={prev} aria-description="previous slide button" disabled={images !== null && images!.length <= 1}>
                    <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={10} height={1}/>
                </button>
                <div
                    className={`touch-pan-y carousel-auto relative w-full h-full flex transition transition-all duration-500 ease-in-out`}
                    style={{
                        transform: `translateX(-${index * (100)}%)`,
                    }}
                    
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    >
                    {images && images.length > 0 && (
                    <>
                        {images.map((image: {url: string, altText: string}, i: number) => (
                            <div key={i} 
                                className={`rounded-[8px] overflow-hidden relative w-full h-full top-0 flex justify-center items-center transition-opacity duration-250 `}
                                >
                                <img
                                    src={image.url}
                                    alt={image.altText}
                                    className='pointer-events-none object-cover w-full h-full'
                                />
                                {image.altText && image.altText.includes('Size') && (
                                    <div className={`${darkMode ? 'bg-stone-900/95 dark-text' : 'light-text bg-white/95'} rounded-md flex justify-end items-center absolute bottom-0 right-0 h-fit w-fit text-sm p-1 m-1`}>
                                        {image.altText.split('/')[0]}
                                        <br></br>
                                        {image.altText.split('/')[1]}
                                    </div>
                                )}
                                
                            </div>
                        ))}
                    </>
                    )}
                </div>
                <button className={`absolute h-1/2 bg-white right-1 z-100 rounded-md p-2 opacity-10 hover:opacity-80 transition duration-350`} onClick={next} aria-description="next slide button" disabled={(images !== null && images!.length <= 1)}>
                    <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={10} height={1}/>
                </button>
            </div>
        </div>
    )


};

export default ApparelPopup;