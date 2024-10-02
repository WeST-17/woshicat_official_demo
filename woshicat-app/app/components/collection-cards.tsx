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
  const [productHover, setProductHover] = useState<string | null>(null);

  const handleMouseEnter = (name: string) => {
    setProductHover(name);
  };

  const handleMouseLeave = () => {
    setProductHover(null);
  };
  
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
    return <div className='flex justify-center w-[100vw] h-[50vh] mt-64'>Something happened on our end!</div>;
  }
  
  let collectionAdjust;
  if (collection === 'apparel') {
    collectionAdjust = 'shirts';
  } else {
    collectionAdjust = collection;
  }

  console.log(products)

  return (
    <>
    <Suspense fallback={<LoadingScreen />}>
    <div className='grid grid-cols-1 w-screen md:grid-cols-3 flex justify-center gap-8'>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <div className='text-center' 
          key={product.name}
          onMouseEnter={() => handleMouseEnter(product.name)}
          onMouseLeave={handleMouseLeave}
        >
          <div className='flex justify-center overflow-hidden'>
            <Link className='w-full flex justify-center bg-white' href={`/collections/${collectionAdjust}/${product.handle}`} passHref>
            {/* Render product details */}
            <div>
              <img 
                src={productHover === product.name ? product.image2.url || product.image.url : product.image.url} 
                alt={product.image.altText}
                className='object-cover aspect-square'
              />
            </div>
            </Link>
          </div>
          <div className='flex w-full p-2 text-lg'>
            <div className="text-stone-700 me-auto">{product.name}</div>
            <div className="text-stone-700 ms-auto">${product.price}</div>
          </div>
        </div>
      ))}
    </div>
    </Suspense>
    </>
  );
}

export default CollectionCards;