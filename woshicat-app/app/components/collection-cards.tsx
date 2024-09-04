'use client'
// CollectionCards.tsx
import React, { Suspense, useEffect, useState } from 'react';
import { getServerCollectionProps } from '../action';
import Link from 'next/link';
import LoadingScreen from './loading';

interface CollectionType {
    collection: string
}

function CollectionCards({ collection }: CollectionType) {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const { products, error } = await getServerCollectionProps(collection);
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

  if (error != null) {
    return <div className='flex h-[100vh] mt-64'>Something happened on our end!</div>;
  }
  
  let collectionAdjust;
  if (collection === 'apparel') {
    collectionAdjust = 'shirts';
  } else {
    collectionAdjust = collection;
  }

  return (
    <>
    <Suspense fallback={<LoadingScreen />}>
    <div className='grid grid-cols-1 lg:p-32 p-20 md:grid-cols-2 gap-4 flex justify-center'>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <div className='text-center' key={product.id}>
          <div>
              <Link href={`/collections/${collectionAdjust}/${product.handle}`} passHref>
              {/* Render product details */}
              <img 
                src={product.image.url} 
                alt={product.image.altText}
                className='rounded-md mb-2'
              />
              <div className='flex w-full mx-auto text-start'>
                <div className="text-sm text-stone-700 me-auto">{product.name}</div>
              </div>
              </Link>
          </div>
        </div>
      ))}
    </div>
    </Suspense>
    </>
  );
}

export default CollectionCards;