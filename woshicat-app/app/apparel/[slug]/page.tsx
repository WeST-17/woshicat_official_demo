'use client'
// Dynamically routed pages for individual items
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getServerItemProps } from '@/app/action';
import Link from 'next/link';
import Header from '@/app/components/header';

export default function ProductDetailPage() {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const pathname = usePathname();
    const handle = pathname.replace('/apparel/', '')

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
        return <div>Error fetching products: {error.message}</div>;
    }

    if (!item || !item.image) {
        return <div className='flex justify-center p-8'>Loading...</div>;
    }

    return (
        <div className='text-center' key={item.id}>
          <div className='hover:opacity-75'>
              <Link href={`/apparel/${item.handle}`} passHref>
              {/* Render product details */}
              <img 
                src={item.image.url} 
                alt={item.image.altText}
                className='rounded-md mb-3'
              />
              <p>{item.name}</p>
              <p>${item.price}</p>
              </Link>
          </div>
        </div>
      );
}
