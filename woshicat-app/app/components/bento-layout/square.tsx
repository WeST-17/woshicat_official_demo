'use client';

import React from "react";
import Link from "next/link";
import ShopNowButton from "../ShopNowButton";

interface SquareProps {
    children: React.ReactNode,
    link: string,
    collectionName: string

}

const Square: React.FC<SquareProps> = ({ children, link, collectionName }) => {

    return (
        <>
        <div className="h-full button-hover relative col-span-9 md:col-span-3 overflow-hidden aspect-square">
            <Link href={link}>
            <div className="">
                {children}
            </div>
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5 z-[100]">
                <h2 className="text-3xl ">{collectionName}</h2>
                <ShopNowButton />
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/15 w-full h-full"/>
            </Link>
        </div>
        </>
    )

}

export default Square;