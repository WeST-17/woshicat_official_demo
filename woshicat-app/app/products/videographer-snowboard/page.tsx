'use client'
// Dynamically routed pages for individual items
import React, { useEffect, useState } from 'react';
import { getServerItemProps } from '@/app/action';
import Link from 'next/link';

export default function VideoSnowboardPage() {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const handle = 'the-videographer-snowboard' // You can replace with any handle really
    const webUrl = 'videographer-snowboard'

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
        <div className='h-fit' key={item.id}>
          <div className='flex justify-center grid lg:grid-cols-3 lg:p-32'>
              <div className='col-span-2 border-test'>
              {/* Render product details */}
              <img 
                src={item.image[0].url} 
                alt={item.image[0].altText}
                className='rounded-md mb-3'
              />
              </div>
              <div className='self-center h-fit border-test'>
                <h3 className="m-8 text-4xl text-stone-700">{item.name}</h3>
                <p className="m-8 text-lg font-medium text-stone-900">${item.price}</p>
                <div className='m-8'>
                  <button
                    className="rounded-md bg-stone-400 me-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                    >
                    {item.variants[0].title}
                  </button>
                  <button
                    className="rounded-md bg-stone-400 me-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                    >
                    {item.variants[1].title}
                  </button>
                  <button
                    className="rounded-md bg-stone-400 me-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                    >
                    {item.variants[2].title}
                  </button>   
                </div>
                <button
                  className="rounded-md bg-stone-400 w-1/2 ms-8 mb-8 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                  >
                  Add to Cart
                </button>
              </div>
                
          </div>
        </div>
      );
}
