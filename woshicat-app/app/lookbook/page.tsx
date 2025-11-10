'use client'
// Set link to routed pages for individual items here
import React from 'react';
import Image from 'next/image';
import LookBookCover from '../components/cloudinaryImages/lookbookCovers';

const LookbookHome = () => {

  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-3 relative w-full min-h-[90vh] flex flex-col justify-center gap-1'>
      {/* <div className={`relative w-full h-full flex justify-center items-center`}>
        <LookBookCover 
          photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/shopify_cd_2025-029.jpg?v=1759768048'}
          photoAlt={'Duo wearing the Serendipity Hoodie.'}
          title={'Tàijí 太極 - Fall 2025'}
          link={'/lookbook/taiji-2025'}
          classExtra='h-full'
        />
      </div> */}
      <div className='relative w-full h-fit flex justify-center items-center overflow-hidden rounded-lg'>
        <LookBookCover 
          photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/woshi-hermanpark-08.jpg?v=1759898843'}
          photoAlt={'Two models wearing MD shirts sitting on a ledge.'}
          title={'Metro Daydreams - Fall 2024'}
          link={'/lookbook/metro-daydreams'}
          classExtra='h-full'
        />
      </div>
      
    </div>
    </>
  );
}

export default LookbookHome;