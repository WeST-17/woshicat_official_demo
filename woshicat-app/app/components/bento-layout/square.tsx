'use client';

import React from "react";
import Link from "next/link";
import ShopNowButton from "../ShopNowButton";

interface SquareProps {
    children: React.ReactNode,
    link: string,
    collectionName: string,
    shopNow?: boolean,
}

const Square: React.FC<SquareProps> = ({ children, link, collectionName, shopNow }) => {

    return (
        <>
        <div className="h-full w-full button-hover relative col-span-9 md:col-span-3 overflow-hidden aspect-[9/10]">
            <Link href={link} className="">
                <div className="">
                    {children}
                </div>
                { shopNow && 
                (
                <>
                    <div className="absolute bottom-0 left-0 p-3 mx-2 mx-auto font-thin text-white bg-black/45 w-full z-[100]">
                        <h2 className="text-lg lg:text-2xl ">{collectionName}</h2>
                        <ShopNowButton />
                    </div>
                    <div className="absolute bottom-0 left-0 font-thin text-white w-full h-full"/>
                </>
                )
                }
                { !shopNow && 
                (
                <>
                    <div className="absolute bottom-0 left-0 p-3 mx-2 mx-auto font-thin text-white bg-black/45 w-full z-[100]">
                        <h2 className="text-lg lg:text-2xl ">{collectionName}</h2>
                    </div>
                    <div className="absolute bottom-0 left-0 font-thin text-white w-full h-full"/>
                </>
                )
                }
                <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300'/>
            </Link>
        </div>
        </>
    )

}

export default Square;