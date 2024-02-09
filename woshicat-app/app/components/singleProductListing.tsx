'use client'
// Note: Needs work, currently not pulling product correctly...
import React, { useEffect, useState } from 'react';
import { getServerItemProps } from '../action';
import Link from 'next/link';

interface ItemCardProps {
  itemHandle: string;
}

function ItemCard({ itemHandle }: ItemCardProps) {
  const [itemListing, setItemListing] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const { item, error } = await getServerItemProps({ params: { itemHandle } });
        if (error) {
          setError(error);
        } else {
          setItemListing(item);
        }
      } catch (error) {
        console.error('Error fetching server component props:', error);
        setError(error);
      }
    };
    console.log('Item loaded.');
    fetchData();
  }, []);


  if (error) {
    return <div className='flex h-[100vh]'>Error fetching products: {error.message}</div>;
  }

  return (
    <>
      {/* Render your products here using the 'products' state */}
      <div className='flex justify-center text-center h-fit' key={itemListing.id}>
          <div className='hover:opacity-75 transition duration-300 lg:w-1/3'>
            <Link href={`/apparel/${itemListing.handle}`} passHref>
            {/* Render product details */}
            <img 
              src={itemListing.image[0].url} 
              alt={itemListing.image[0].altText}
              className='rounded-md mb-3'
            />
            <h3 className="mt-4 text-sm text-stone-700">{itemListing.name}</h3>
            <p className="mt-1 text-lg font-medium text-stone-900">${itemListing.price}</p>
            <div>Sizing selector placeholder</div>
            </Link>
            <button
              className="rounded-md bg-stone-400 mt-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
              >
              Add to Cart
            </button>
        </div>
      </div>
    </>
  );
}

export default ItemCard;