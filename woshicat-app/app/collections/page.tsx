'use client';
import React from "react";
import Image from "next/image";
import CoverHeader from "../components/ProductComps-Layouts/heroImageInsert";
import ProductCards from "../components/ProductComps-Layouts/product-cards";
import CollectionListing from "../components/collection-listings/collectionListing";
import ScrollingCarousel from "../components/carousels/Carousel";

const Collections = () => {
  
  return (
    <>
    <main className="w-full flex flex-col gap-1">
      <div className="relative w-full h-fit overflow-hidden">
        <CoverHeader
          src={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/shopify_cd_2025-094.jpg?v=1759774433'} 
          alt={'models sitting at skate park watching you (?)'}
          header={'Collections'}
          additional="object-cover object-bottom"
        />
        
      </div>
      <div className="w-full mx-auto col-span-9 flex flex-col">
        <div className="relative w-full mx-auto flex flex-col mb-2">
          <div className="absolute left-0 top-0 w-full flex justify-start">
            <Image
              src={'/media/corner-bright.png'}
              width={120}
              height={1}
              alt="Chinese style corner frame decoration/design"
              className=""
            />
          </div>
          <div className="col-span-9 md:text-xl flex justify-center items-center text-center px-20 my-8">
            <div className="w-full flex max-md:flex-col justify-center items-center md:gap-2">
              <Image 
                src={'/media/stickers/Desk Yoyo Sticker.png'}
                alt={'Yoyo the cat smiling slightly'}
                width={350}
                height={1}
                className="pointer-events-none"
              />
              <h2 className="text-xl lg:text-2xl">{`Designed in-house. Yoyo's happy you're here!`}</h2>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-full flex justify-end">
            <Image
              src={'/media/corner-bright.png'}
              width={120}
              height={1}
              alt="Chinese style corner frame decoration/design"
              className="rotate-180"
            />
          </div>
        </div>
        <div className="w-full md:w-[90vw] mx-auto flex">
          {/* Begin section */}
            <ScrollingCarousel addClass="" numPerSlide={3} mobileSlide={1} length={3}>
              <CollectionListing addClass="w-full h-full px-1"/>
            </ScrollingCarousel>
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