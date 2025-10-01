'use client'
// Set link to routed pages for individual items here
import React from 'react';
import Image from 'next/image';
import CoverHeader from '../components/ProductComps-Layouts/heroImageInsert';
import LookBookCover from '../components/cloudinaryImages/lookbookCovers';

const LookbookHome = () => {
  return (
    <>
    <div className='mt-20 relative w-full h-full flex flex-col justify-center items-center gap-1'>      
      {/*<div className='relative w-full h-full flex justify-center items-center'>
        <LookBookCover 
          photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/woshi-hermanpark-05.jpg?v=1748581247'}
          photoAlt={'Guy standing with morning commute shirt back facing.'}
          title={'2025 - Ego Diffraction'}
          link={'/lookbook/ego-diffraction'}
          classExtra='ms-auto text-right z-[100]'
        />
        <div className="max-md:hidden absolute -left-0 w-[370px] h-full flex justify-left">
          <Image
            src={'/icons/Sketchy arrow demo.png'}
            alt={'black sketched arrow pointing at lookbook panel links'}
            width={800}
            height={1}
            className='absolute bottom-20 -right-0 -rotate-[135deg] scale-[1.2] transform -scale-y-100 z-[101]'
          />
          <Image 
            src={'/media/cat_pngs/2025_Benji_Design.png'}
            alt={'Seredipity Benji doing an ollie on a skateboard'}
            width={600}
            height={1}
            className='z-[102] absolute top-0 transform object-cover h-full'
          />
        </div>
      </div> */}
      <div className='relative w-full h-full flex justify-center items-center'>
        <LookBookCover 
          photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/woshi-hermanpark-05.jpg?v=1748581247'}
          photoAlt={'Two models wearing MD shirts sitting on a ledge.'}
          title={'2024 - Metro Daydreams'}
          link={'/lookbook/metro-daydreams'}
          classExtra='me-auto z-[100]'
        />
        <div className="max-md:hidden absolute flex justify-right -right-0 w-[370px] h-full">
          <Image
            src={'/icons/Sketchy arrow demo.png'}
            alt={'black sketched arrow pointing at lookbook panel links'}
            width={500}
            height={1}
            className='z-[102] rotate-[30deg] transform scale-[1.2] -scale-y-100 absolute top-20'
          />
          <Image 
            src={'/media/cat_pngs/Suffocation_YOYO.png'}
            alt={'City Nights Prosperity Yoyo'}
            width={800}
            height={1}
            className='absolute bottom-0 transform object-cover h-full w-full'
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default LookbookHome;