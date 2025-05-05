'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CoverHeader from "../components/heroImageInsert";
import ShopNowButton from "../components/ShopNowButton";
import ProductCards from "../components/product-cards";
import Square from "../components/bento-layout/square";

const Collections = () => {
  
  return (
    <>
    <main className="w-full flex flex-col gap-1">
      <div className="relative w-full h-fit md:h-64 overflow-hidden">
        <CoverHeader
          src={'/media/collections-page/sk1.jpg'} 
          alt={'models pointing out and wearing woshi cat shirts'}
          header={'Collections'}
          additional="object-cover inset-0 w-full object-[50%_30%]"
        />
        
      </div>
      <div className="w-full mx-auto col-span-9 flex flex-col">
        <div className="col-span-9 md:text-xl font-thin flex justify-center items-center text-center my-4">
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
        <div className="w-full md:w-4/5 mx-auto col-span-9 grid grid-cols-9 p-2 gap-2">
          {/* Begin section */}
          <div className="relative md:col-span-3 col-span-9 aspect-square"> {/* Feature Collection, add square ones at the bottom for older collections */}
            <Link href={'/collections/metro-daydreams/'} >
              <div className="button-hover overflow-hidden">
                  <Image
                    src={'/media/collections-page/2.jpeg'}
                    fill={true}
                    alt={'Metro DayDreams Collection'}
                    className="object-cover object-[50%_1%]"
                  />
                <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5">
                    <h2 className="text-2xl">Metro Daydreams</h2>
                    <ShopNowButton />
                  </div>
              </div>
            </Link>
          </div>
          <div className="relative md:col-span-3 col-span-9 aspect-square"> {/* Feature Collection, add square ones at the bottom for older collections */}
            <Link href={'/collections/lunar-new-year/'} >
              <div className="button-hover overflow-hidden">
                  <Image
                    src={'/media/collections-page/uniq bag pin.jpeg'}
                    fill={true}
                    alt={'Lunar New Year 2025 Collection'}
                    className="object-cover"
                  />
                <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5">
                    <h2 className="text-2xl">{`Lunar New Year [2025]`}</h2>
                    <ShopNowButton />
                  </div>
              </div>
            </Link>
          </div>
          {/* Stationary and Accessories */}
          <Square
            link={'/collections/stationary-and-accessories/'}
            collectionName={`Stationary and Accessories`}
          > 
            <Image 
              className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
              src={'/media/stationary-page/apr2025_506print.jpg'} 
              alt={'picture of our 506 train print close up on caligraphy'} 
              fill={true}
            />
          </Square>
          <div className="relative col-span-9 md:col-span-3 aspect-square">
            <Image
              src={'/media/collections-page/3 Large.jpeg'}
              fill={true}
              alt={'Metro DayDreams Collection'}
              className="object-cover"
            />
          </div>
          {/* End section */}
        </div>
        {/* Show All Products */}
        <ProductCards />
      </div>
    </main>
    </>
  );
}

export default Collections;