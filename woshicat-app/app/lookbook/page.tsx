'use client'
// Set link to routed pages for individual items here
import React from 'react';
import LookBookCover from '../components/cloudinaryImages/lookbookCovers';

const LookbookHome = () => {

  return (
    <>
    <div className='relative w-full h-fit'>
      <section className='w-full flex max-lg:flex-col max-lg:gap-3'>
        <div className={`relative absolute left-0 w-full lg:w-1/2 h-fit flex justify-center items-center overflow-hidden rounded-l-lg`}>
          <LookBookCover 
            photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/shopify_cd_2025-029.jpg?v=1759768048'}
            photoAlt={'Duo wearing the Serendipity Hoodie.'}
            title={'Tàijí 太極 - Fall 2025'}
            link={'/lookbook/taiji-2025'}
            classExtra='h-full lg:translate-y-10'
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className='max-lg:hidden slant z-100 right-0 translate-y-10'>
            <polygon fill="#1c1917" points="0,100 100,0 100,100"/>
          </svg>
        </div>
        <div className='relative absolute right-0 w-full lg:w-1/2 h-fit flex justify-center items-center overflow-hidden rounded-r-lg'>
          <LookBookCover 
            photoSrc={'https://cdn.shopify.com/s/files/1/0901/4794/6795/files/woshi-hermanpark-08.jpg?v=1759898843'}
            photoAlt={'Two models wearing MD shirts sitting on a ledge.'}
            title={'Metro Daydreams - Fall 2024'}
            link={'/lookbook/metro-daydreams'}
            classExtra='h-full lg:-translate-y-10'
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className='max-lg:hidden slant z-100 left-0 rotate-180 -translate-y-10'>
            <polygon fill="#1c1917" points="100,100 100,0 0,100"/>
          </svg>
        </div>
      </section>
    </div>
    </>
  );
}

export default LookbookHome;