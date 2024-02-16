'use client'
// ProductCards.tsx
import React, { useEffect, useState } from 'react';
import { getServerProductsProps } from '../action';
import { Suspense } from 'react';
import Link from 'next/link';
import LoadingScreen from './loading';
import Transition from './transition';


export default function ProductCards() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const { products, error } = await getServerProductsProps();
        if (error) {
          setError(error);
        } else {
          setProducts(products || []);
        }
      } catch (error) {
        console.error('Error fetching server component props:', error);
        setError(error);
      }
    };
    console.log('Products Gallery loaded.');
    fetchData();
  }, []);

  if (error) {
    return <div className='flex h-[100vh]'>Error fetching products: {error.message}</div>;
  }
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 flex justify-center'>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <div className='text-center' key={product.id}>
          <div>
              <Link href={`/apparel/${product.handle}`} passHref>
              {/* Render product details */}
              <img 
                src={product.image.url} 
                alt={product.image.altText}
                className='rounded-md mb-2 hover:opacity-75 transition duration-300'
              />
              <div className='p-4 border-test rounded-md flex w-3/4 mx-auto'>
                <h3 className="text-normal text-stone-700 me-auto">{product.name}</h3>
                <p className="text-normal font-medium text-stone-900">${product.price}</p>
              </div>
              </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
