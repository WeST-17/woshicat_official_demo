'use client'
// CollectionCards.tsx
import React, { useEffect, useState } from 'react';
import { getServerCollectionProps } from '../action';
import Link from 'next/link';

interface CollectionType {
    collection: string
}

function CollectionCards({ collection }: CollectionType) {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const { products, error } = await getServerCollectionProps(collection);
        if (error) {
          setError(error);
        } else {
          setProducts(products || []);
        }
      } catch (error) {
        console.error('Error fetching server component props:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
      
    };
    console.log('Products Gallery loaded.');
    fetchData();
  }, [collection]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="loader-screen" /> {/* Replace with actual loading spinner */}
      </div>
    );
  }

  if (error != null) {
    return <div className='flex justify-center w-[100vw] h-[50vh] mt-64'>Something happened on our end!</div>;
  }
  
  let collectionAdjust;
  if (collection === 'apparel') {
    collectionAdjust = 'shirts';
  } else {
    collectionAdjust = collection;
  }

  return (
    <>
    <div className={`grid grid-cols-1 w-full mx-1 mx-auto md:grid-cols-3 flex justify-center gap-2 fade-in ${!loading ? 'show' : ''}`}>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <div className='relative text-center' 
          key={product.name}
        >
          <div className={`absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
          
          <div className='flex justify-center overflow-hidden'>
            <Link className='w-full flex justify-center bg-white' href={`/collections/${collectionAdjust}/${product.handle}`} passHref>
            {/* Render product details */}
            <div className='relative w-full'>
              {/* Default product image */}
              <img 
                src={product.image.url} 
                alt={product.image.altText} 
                className='object-cover aspect-square transition-opacity duration-500 ease-in-out hover:opacity-0'
              />
              
              {/* Hover image */}
              <img 
                src={product.image2.url} 
                alt={product.image2.altText} 
                className='absolute top-0 left-0 w-full h-full object-cover aspect-square opacity-0 transition-opacity duration-125 ease-in-out hover:opacity-100'
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
    </>
  );
}

export default CollectionCards;