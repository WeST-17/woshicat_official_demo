'use client';

import React from 'react';
import Image from 'next/image';

interface PeopleInfoProps {
    imageUrl: string,
    imageAlt: string,
    description: string,
    imgAlignment: string,
    name: string,
    title: string
}

const PeopleInfoCard: React.FC<PeopleInfoProps> = ({ imageUrl, imageAlt, description, imgAlignment, name, title}) => {
    return (
        <>
            <div className='w-full flex max-md:flex-col gap-6 justify-center items-center'>
                {(imgAlignment === 'left' || imgAlignment === null) && (
                    <>
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            width={1000}
                            height={1}
                            className='w-1/2 lg:w-1/3 mx-auto aspect-[9/10] object-cover rounded-[16px]'
                        />
                        <div className='w-4/5 lg:w-2/3 flex flex-col mx-auto'>
                            <h3 className='text-3xl'>{name}</h3>
                            <h4 className='text-base font-bold'>{title}</h4>
                            <p className='text-base'>{description}</p>
                        </div>
                    </>
                )}
                {imgAlignment === 'right' && (
                    <>
                        <div className='w-4/5 lg:w-2/3 flex flex-col mx-auto text-end'>
                            <h3 className='text-3xl'>{name}</h3>
                            <h4 className='text-base font-bold'>{title}</h4>
                            <p className='text-base'>{description}</p>
                        </div>
                        <Image
                            src={imageUrl}
                            alt={imageAlt}
                            width={1000}
                            height={1}
                            className='w-1/2 lg:w-1/3 mx-auto aspect-[9/10] object-cover rounded-[16px]'
                        />
                    </>
                )}
                
            </div>
        </>
    )
};

export default PeopleInfoCard;