'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CoverHeader from "../components/heroImageInsert";
import ShopNowButton from "../components/ShopNowButton";

const Collections = () => {
  
  return (
    <>
    <main className="w-screen grid grid-cols-9">
      <div className="relative col-span-9 h-96">
        <CoverHeader
          src={'/media/collection_page_covers/s_k_pointnlook.JPG'} 
          alt={'models pointing out and wearing woshi cat shirts'}
          header={'Collections'}
        />
        
      </div>
      <div className="col-span-9 md:text-xl font-thin flex justify-center items-center text-center my-9">
        <div className="p-8 md:w-1/2 border-b border-t">Find out in-house collections here! Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge: A Salary Cat in a human world.
        </div>
      </div>
      
      <div className="relative col-span-6 mx-1">
        <Link href={'/collections/metro-daydreams/'}>
          <div className="button-hover">
              <Image
                src={'/media/collection_page_covers/s_k_pointnlook.JPG'}
                fill={true}
                alt={'Metro DayDreams Collection'}
                className="object-cover"
              />
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/25 w-4/5">
                <h2 className="md:text-4xl ">Metro Daydreams</h2>
                <ShopNowButton />
              </div>
          </div>
        </Link>
      </div>
      <div className="relative col-span-9 md:col-span-3 aspect-square mx-1">
        <Image
          src={'/media/collection_page_covers/s_k_pointnlook.JPG'}
          fill={true}
          alt={'Metro DayDreams Collection'}
          className="object-cover"
        />
      </div>
       {/* Next section */}
      
    </main>
    </>
  );
}

export default Collections;