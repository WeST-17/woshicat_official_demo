'use client'
// ProductCards.tsx
import React, { useEffect, useState } from 'react';
import { getServerProductsProps } from '../action';
import Link from 'next/link';

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

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 flex justify-center'>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <div className='text-center bg-stone-100 rounded-md p-4' key={product.id}>
          <div className=''>
              <Link href={`/apparel/${product.handle}`} passHref>
              {/* Render product details */}
              <img 
                src={product.image.url} 
                alt={product.image.altText}
                className='rounded-md mb-3'
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
              </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
