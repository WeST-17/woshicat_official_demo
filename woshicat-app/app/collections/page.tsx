'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CoverHeader from "../components/heroImageInsert";
import ShopNowButton from "../components/ShopNowButton";

const Collections = () => {
  
  return (
    <>
    <main className="w-screen grid grid-cols-9 gap-1">
      <div className="relative col-span-9 h-fit md:h-96 overflow-hidden">
        <CoverHeader
          src={'/media/collections-page/1.jpg'} 
          alt={'models pointing out and wearing woshi cat shirts'}
          header={'Collections'}
          additional="lg:-translate-y-36 xl:-translate-y-60"
        />
        
      </div>
      <div className="w-full mx-auto col-span-9 grid grid-cols-9">
        <div className="col-span-9 md:text-xl font-thin flex justify-center items-center text-center my-6">
          <div className="md:w-1/2 flex flex-col gap-6">
            <Image 
              src={'/media/graphics/Yoyo happy.png'}
              alt={'Yoyo the cat smiling slightly'}
              width={200}
              height={1}
              className="mx-auto pointer-events-none"
            />
            <h2 className="text-2xl">Designed in-house. Yoyo&apos;s happy you&apos;re here!</h2>
          </div>
        </div>
        <div className="w-full mx-auto col-span-9 grid grid-cols-9">
          <div className="relative md:col-span-6 col-span-9 max-md:aspect-square"> {/* Change to square potentially when we have more collections */}
            <Link href={'/collections/metro-daydreams/'} >
              <div className="button-hover overflow-hidden">
                  <Image
                    src={'/media/collections-page/2.jpeg'}
                    fill={true}
                    alt={'Metro DayDreams Collection'}
                    className="object-cover object-[50%_1%]"
                  />
                <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5">
                    <h2 className="md:text-4xl ">Metro Daydreams</h2>
                    <ShopNowButton />
                  </div>
              </div>
            </Link>
          </div>
          <div className="relative col-span-9 md:col-span-3 aspect-square">
            <Image
              src={'/media/collections-page/3 Large.jpeg'}
              fill={true}
              alt={'Metro DayDreams Collection'}
              className="object-cover"
            />
          </div>
          {/* Next section */}
        </div>
      </div>
    </main>
    </>
  );
}

export default Collections;