'use client';
import React from "react";
import ComicEps from "./comic";
import Link from "next/link";
import Image from "next/image";

const YoyoComic = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen">
      {/* */}
      <div className="relative flex flex-col gap-4 w-full min-h-[75vh] md:w-1/2 mx-auto p-2">
        <h1 className="text-4xl pt-4">{`Slice of Life - Yoyo & Friends!`}</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg">{`Follow Yoyo and his friends as they tackle their corporate jobs and life head on!`}</h2>
            {/* <Link
              href={`/yoyo-friends/ep-1-weekday-mournings`}
              className="flex items-center gap-2 border-2 border-transparent w-fit px-2 py-1 rounded-lg bg-stone-400 text-white hover:bg-stone-700 transition-all duration-250 ease-in-out"
            >
              {`Episode 1`} 
              <Image 
                src={'/icons/paper-plane-regular.svg'} 
                alt={'right arrow for first episode'} 
                width={15} height={1}
                className="w-3"
              />
            </Link> */}
        </div>
        <div className="w-full flex flex-col">
          {ComicEps.toReversed().map((episode) => (
            <Link
              href={`/yoyo-friends/${episode.epID}`}
              className="relative flex items-center gap-4 opacity-80 hover:opacity-100 transition-all duration-250 ease-in-out"
              key={episode.epID}
            >
              <Image 
                src={episode.thumbnail}
                alt={`${episode.title} thumbnail`}
                width={70}
                height={1}
                className="w-16"
              />
              <h2 className="text-sm lg:text-lg">{episode.title}</h2>
              <p className="text-end absolute right-0 text-xs">{episode.date}</p>
            </Link>
          ))}
          
        </div>
        
      </div>
      
      
    </main>
    </>
  );
}

export default YoyoComic;