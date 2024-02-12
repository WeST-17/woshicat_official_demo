'use client';
import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { getServerItemProps } from '@/app/action';
import Link from 'next/link';
import Image from 'next/image';
import LoadingScreen from './loading';

interface Handle {
    handle: string
}

const SingleProductCard: React.FC<Handle> = ({ handle }) => {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        
        const fetchData = async () => {
        try {
            const { item, error } = await getServerItemProps({ params: { handle } });
            if (error) {
            setError(error);
            } else {
            setItem(item);
            }
        } catch (error) {
            console.error('Error fetching server component props:', error);
            setError(error);
        }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className='flex items-center h-[100vh]'>Error fetching products: {error.message}</div>;
    }

    if (!item || !item.image) {
        return <div className='flex justify-center items-center p-8 h-[100vh]'></div>;
    }

    return (
        <Suspense fallback={<LoadingScreen />}>
        <div className="flex justify-center items-center h-[100vh] w-full bg-stone-200 mb-8">
            {/*
            <Image 
            src='/next.svg'
            alt='placeholder image'
            fill={true}
            />*/}
        </div>
        <div className='h-fit text-lg' key={item.id}>
            <div className='flex justify-center grid lg:grid-cols-3 lg:p-16'>
                <div className='lg:col-span-2'>
                {/* Render product details */}
                <img 
                src={item.image[0].url} 
                alt={item.image[0].altText}
                className='rounded-md mb-3'
                />
                </div>
                <div className='lg:col-span-1 self-center h-fit w-full'>
                    <div className='w-full'>
                        <h3 className="m-8 text-4xl font-bold text-stone-700">{item.name}</h3>
                        <p className="m-8 text-lg font-medium text-stone-900">${item.price}</p>
                    </div>
                
                    {/* Apparel Colors */}
                    {item.color.length > 0 && (
                        <>
                            <div className='ms-8 my-2 flex items-center text-xl'>Color</div>
                            <div className='ms-8 flex items-center'>
                            {item.color.map((color: string, index: number) => (
                                <button
                                    key={index}
                                    className="rounded-md bg-stone-400 me-2 p-2 w-20 h-10 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                                >
                                    {color}
                                </button>
                            ))}
                            </div>
                        </>
                    )}

                    {item.size.length > 0 && (
                        <>
                            <div className='ms-8 mt-10 my-2 flex items-center text-xl'>Size</div>
                            {/* Apparel Sizing: XS, SM, MD, LG, XL */}
                            <div className='ms-8 my-4 flex items-center'>
                                {item.size.map((sizing: string, index: number) => (
                                    <button
                                        key={index}
                                        className="rounded-md bg-stone-400 me-2 p-2 w-10 h-10 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                                    >
                                        {sizing}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}


                    {/* Product Description: Need to make components for product description and add to cart button */}
                    <div className='ms-8 my-10 flex items-center text-xl'>
                        <p>100% Cotton yada yada yada. Embroidered cat design, designed in-house. Product Description wahoo! Meow.</p>
                    </div>
                    <button
                        className="rounded-full bg-stone-400 w-3/4 h-10 mx-8 p-2 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                        >
                        &#43; Add to Cart
                    </button>
                </div>
                
            </div>
        </div>
        </Suspense>
    );
}

export default SingleProductCard;