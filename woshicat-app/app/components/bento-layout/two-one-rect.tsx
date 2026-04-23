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
        <div className="sticky top-[70px] button-hover relative col-span-9 lg:col-span-6 overflow-hidden rounded-lg h-[80vh] w-full aspect-[9/10] md:aspect-[2/1] ">
          <Link href={link} className="w-full">
            <div className="w-full h-full flex justify-center items-center ">
              {children}
            </div>

            <div className="absolute bottom-0 left-0 p-3 text-white bg-black/45 flex flex-col justify-center items-start w-full  z-100 hover-rise h-full transition-all duration-500 rounded-t-[8px]">
              <div className="flex flex-col h-full text-hover-rise">
                <h2 className="text-xl lg:text-3xl">{collectionName}</h2>
                <ShopNowButton />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white w-full h-full"/>
            <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300'/>
          </Link>
        </div>
        </>
    )

}

export default TwoOneRect;