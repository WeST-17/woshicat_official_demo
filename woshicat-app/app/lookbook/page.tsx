'use client'

// Set link to routed pages for individual items here
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeInImage from '../components/animationComps/FadeInImages';

const LookbookHome = () => {
    
    return (
      <div className='w-full md:w-4/5 grid grid-cols-1 p-2 md:grid-cols-2 gap-2'>
        <section id='item-1'>
        <FadeInImage>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <Link href={'/lookbook/metro-daydreams'} className='relative w-full'>
            <Image 
              src={'/media/lookbook grid/MD_Cover_Lookbook.jpeg'}
              alt={'Guy standing with 506 train shirt back facing.'}
              width={1000}
              height={1}
              className='object-cover aspect-square w-full'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300'/>
          </Link>
          <p className='w-full text-center text-xl px-2'>{`2024 - Metro Daydreams`}</p>
        </div>
        </FadeInImage>
        </section>

        {/* <section id='item-2'>
        <FadeInImage>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <Link href={'/lookbook/ego-diffraction'} className='relative w-full'>
            <Image 
              src={'/media/LNY2025/dome of light.jpg'}
              alt={'Guy standing in the Taiwan Dome of Light wearing our Morning Commute Shirt.'}
              width={1000}
              height={1}
              className='object-cover aspect-square w-full'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-25 transition duration-300'/>
          </Link>
          <p className='w-full text-center text-xl px-2'>{`2025 - Ego Diffraction`}</p>
        </div>
        </FadeInImage>
        </section> */}
      </div>
    );
}

export default LookbookHome;