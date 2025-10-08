'use client'
// Set link to routed pages for individual items here
import React from 'react';
import Image from 'next/image';
import LookBookCover from '../components/cloudinaryImages/lookbookCovers';

const LookbookHome = () => {
  return (
    <>
    <div className='mt-20 relative w-full h-full flex justify-center items-center gap-1'>      
      {/* <div className='relative w-full h-full flex justify-center items-center'>
        <LookBookCover 
          photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/shopify_cd_2025-029.jpg?v=1759768048'}
          photoAlt={'Duo wearing the Serendipity Hoodie.'}
          title={'2025 - Tàijí 太極'}
          link={'/lookbook/taiji-2025'}
          classExtra='ms-auto text-start'
        />
        <div className="absolute right-0 w-full h-full flex justify-end items-end">
          <Image 
            src={'/media/cat_pngs/2025_Benji_Design.png'}
            alt={'Seredipity Benji doing an ollie on a skateboard'}
            width={300}
            height={1}
            className='z-[102] object-contain h-full'
          />
        </div>
      </div> */}
      <div className='relative w-full h-full flex justify-center items-center'>
        <LookBookCover 
          photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/woshi-hermanpark-08.jpg?v=1759898843'}
          photoAlt={'Two models wearing MD shirts sitting on a ledge.'}
          title={'2024 - Metro Daydreams'}
          link={'/lookbook/metro-daydreams'}
          classExtra='me-auto'
        />
        {/* <div className="absolute flex justify-right -left-0 w-[370px] h-full">
          <Image 
            src={'/media/cat_pngs/Suffocation_YOYO.png'}
            alt={'City Nights Prosperity Yoyo'}
            width={800}
            height={1}
            className='z-[100] absolute bottom-0 left-0 transform object-cover h-full w-full'
          />
        </div> */}
      </div>
    </div>
    </>
  );
}

export default LookbookHome;