'use client'
// Dynamically routed pages for individual items
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getServerItemProps } from '@/app/action';
import Link from 'next/link';

export default function ProductDetailPage() {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const pathname = usePathname();
    const handle = pathname.replace('/apparel/', '') // You can replace with any handle really

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
        <div className='flex justify-center text-center h-fit' key={item.id}>
          <div className='hover:opacity-75 transition duration-300 lg:w-1/3'>
              <Link href={`/apparel/${item.handle}`} passHref>
              {/* Render product details */}
              <img 
                src={item.image[0].url} 
                alt={item.image[0].altText}
                className='rounded-md mb-3'
              />
              <h3 className="mt-4 text-sm text-stone-700">{item.name}</h3>
              <p className="mt-1 text-lg font-medium text-stone-900">${item.price}</p>
              <div>Sizing selector placeholder</div>
              </Link>
              <button
                className="rounded-md bg-stone-400 mt-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                >
                Add to Cart
              </button>
          </div>
        </div>
      );
}
