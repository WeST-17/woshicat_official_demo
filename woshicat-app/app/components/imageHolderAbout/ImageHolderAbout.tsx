'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "@/app/components/imageHolderAbout/InfoCard";
import about_descriptions from "../textData/aboutDescriptions";

interface AboutProps {
    children: React.ReactNode,
    passedIndex: number,
    classAdd: string,
}

const AboutCarousel: React.FC<AboutProps> = ({ children, classAdd, passedIndex }) => {
    const [current, setCurrent] = useState(passedIndex);
    const childLength = React.Children.count(children);

    // Sync `current` with `passedIndex`
    useEffect(() => {
        setCurrent(passedIndex);

        return (() => {
            console.log('component reset');
        })
    }, [passedIndex]);

    const personNext = () => {
        setCurrent(current === childLength - 1 ? 0 : current + 1);
    };

    const personPrev = () => {
        setCurrent(current === 0 ? childLength - 1 : current - 1);
    }

    return (
        <>
        <div className={`fixed inset-0 w-screen h-full bg-stone-900/70 z-[2001] flex items-center ${classAdd}`}/>
        <div className={`flex fixed inset-0 justify-center items-center w-full h-screen z-[2002] ${classAdd}`}>
            <button className="absolute left-0 p-2 flex justify-center items-center h-20 w-25 bg-black/25 rounded-md z-[2003]" onClick={personPrev}>
                <Image 
                    src={'/icons/caret-left-solid-white.svg'}
                    alt='left arrow'
                    width={20}
                    height={1}
                />
            </button>
            <div className="flex w-5/6 h-screen justify-center items-center">
                
                <div className="bg-white rounded-md relative w-full h-3/4 flex max-md:flex-col justify-center items-center gap-2 max-lg:p-8 max-lg:m-2">
                    {
                        React.Children.toArray(children).map((child, index) => (
                                <>
                                <div key={index} className={`z-[2005] w-1/2 h-1/4 flex justify-center items-center transition-all duration-300 text-white rounded-sm pointer-events-none ${index === current ? 'opacity-100 sway' : 'opacity-0 hidden'}`}>
                                    {child}
                                </div>
                                <Card description={about_descriptions[index]} classAdd={`max-lg:text-sm aspect-square rounded-sm transition-all duration-300 max-md:w-full lg:w-3/4 h-full md:h-3/4 pe-2 ${index === current ? 'opacity-100' : 'opacity-0 hidden'}`}/>
                                </>
                            )
                        )
                    }
                </div>
                
            </div>
            <button className="flex h-20 w-25 bg-black/25 rounded-md p-2 justify-center items-center z-[2003] absolute right-0 me-2" onClick={personNext}>
                <Image
                    src={'/icons/caret-right-solid-white.svg'}
                    alt='right arrow'
                    width={20}
                    height={1}
                    
                />
            </button>
        </div>
        </>
    )
}

export default AboutCarousel;