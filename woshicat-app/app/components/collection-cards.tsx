'use client'
// CollectionCards.tsx
import React, { useEffect, useState } from 'react';
import { getServerCollectionProps } from '../action';
import Link from 'next/link';
import FadeInImage from './animationComps/FadeInImages';
import Loader from './LoadingScreen';

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
      <div className='loader'/>
    );
  }

  if (error != null) {
    return <div className='flex justify-center w-[100vw] h-[50vh] mt-64'>Something happened on our end!</div>;
  }


  return (
    <>
    <div className={`grid grid-cols-2 w-full md:w-4/5 mx-1 mx-auto md:grid-cols-3 gap-2 fade-in ${!loading ? 'show' : ''} `}>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <FadeInImage key={product.name}>
        <div className={`relative text-center h-full`} 
          key={product.name}
        >
          <div className={`absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
          
          <div className={`bg-white flex justify-center overflow-hidden`}>
            <Link className='w-full flex justify-center bg-white' href={`/collections/${collection}/${product.handle}`} passHref>
            {/* Render product details */}
            <div className='relative aspect-square flex justify-center items-center'>
              {/* Default product image */}
              <img 
                src={product.image.url} 
                alt={product.image.altText} 
                className='object-cover h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0'
              />
              
              {/* Hover image */}
              <img 
                src={product.image2.url} 
                alt={product.image2.altText} 
                className='max-sm:hidden absolute top-0 left-0 object-contain w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100'
              />
            </div>
            </Link>
          </div>
          <div className='flex w-full p-2 text-xs'>
            <div className="text-stone-700 me-auto lg:text-sm">{product.name}</div>
            <div className="text-stone-700 ms-auto lg:text-sm">${product.price}</div>
          </div>
        </div>
      </FadeInImage>
      ))}
    </div>
    </>
  );
}

export default CollectionCards;