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
      <div className="relative w-full h-96 overflow-hidden">
        <CoverHeader
          src={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/shopify_cd_2025-061.jpg?v=1759292096'} 
          alt={'models pointing out and wearing woshi cat shirts'}
          header={'Collections'}
          additional="object-cover object-[50%_26%]"
        />
        
      </div>
      <div className="w-full mx-auto col-span-9 flex flex-col">
        <div className="col-span-9 md:text-xl flex justify-center items-center text-center my-8">
          <div className="md:w-1/2 flex flex-col gap-6">
            <Image 
              src={'/media/graphics/Yoyo happy.png'}
              alt={'Yoyo the cat smiling slightly'}
              width={250}
              height={1}
              className="mx-auto pointer-events-none"
            />
            <h2 className="text-2xl">Designed in-house. Yoyo&apos;s happy you&apos;re here!</h2>
          </div>
        </div>
        <div className="w-full md:w-4/5 mx-auto flex">
          {/* Begin section */}
            <ScrollingCarousel addClass="" numPerSlide={3} mobileSlide={1} length={3} type={'collection'}>
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