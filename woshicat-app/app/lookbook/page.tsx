'use client'

// Set link to routed pages for individual items here
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeInImage from '../components/animationComps/FadeInImages';

const LookbookHome = () => {
    
    return (
      <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-2'>
        <section id='item-1'>
        <FadeInImage>
        <div className='col-span-1 aspect-square flex flex-col justify-center items-center gap-2'>
          <Link href={'/lookbook/metro-daydreams'} className='relative'>
            <Image 
              src={'/media/lookbook grid/MD_Cover_Lookbook.jpeg'}
              alt={'Guy standing with 506 train shirt back facing.'}
              width={1000}
              height={1}
              className='object-cover aspect-square w-full h-full'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300'/>
          </Link>
          <p className='w-full text-start text-xl px-2'>2024 - Metro Daydreams</p>
        </div>
        </FadeInImage>
        </section>

        {/* <section id='item-2'>
        <FadeInImage>
        <div className='col-span-1 aspect-square flex flex-col justify-center items-center gap-2'>
          <Link href={'/lookbook/lunar-new-year-2025'} className='relative'>
            <Image 
              src={'/media/lookbook grid/MD_Cover_Lookbook.jpeg'} // change image src to lunar new year pic
              alt={''}
              width={1000}
              height={1}
              className='object-cover aspect-square w-full h-full'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300'/>
          </Link>
          <p className='w-full text-start text-xl px-2'>2025 - Lunar New Year</p>
        </div>
        </FadeInImage>
        </section> */}
      </div>
    );
}

export default LookbookHome;