'use client';

import React from "react";
import Link from "next/link";
import ShopNowButton from "../ShopNowButton";

interface TwoOneRectProps {
    children: React.ReactNode,
    link: string,
    collectionName: string

}

const TwoOneRect: React.FC<TwoOneRectProps> = ({ children, link, collectionName }) => {

    return (
        <>
        {/* Change to Lunar New Year 2025 */}
        <div className="button-hover relative col-span-9 md:col-span-6 overflow-hidden md:aspect-[2/1] aspect-square"> {/* Remember to change back to square when we have more collections! */}
          <Link href={link}>
            <div className="">
              {children}
            </div>

            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5 z-[100]">
              <h2 className="text-3xl ">{collectionName}</h2>
              <ShopNowButton />
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/5 w-full h-full"/>
          </Link>
        </div>
        </>
    )

}

export default TwoOneRect;