'use client'
// ProductCards.tsx
import React, { useEffect, useState } from 'react';
import { getCollectionNames, getServerProductsProps } from '../action';
import Link from 'next/link';
import FadeInImage from './animationComps/FadeInImages';
import Image from 'next/image';

const ProductCards = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [collectionList, setCollectionList] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all-products');

  const filterClick = (x: string) => {
    setFilter(x);
  }

  const currFormat = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'USD',
  });
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const { products, error } = await getServerProductsProps();
        const collections = await getCollectionNames();
        if (error) {
          setError(error);
        } else {
          const validProducts = products?.filter(hasCollectionName => {
            return hasCollectionName.drop !== '';
          })

          setProducts(validProducts || []);
          setCollectionList(collections || []);
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
  }, []);

  if (error) {
    return <div className='flex h-32 w-full justify-center items-center'>Error fetching products: {"Oops! Something happened on our end!"}</div>;
  }
  
  return (
    <>
    <div 
      className={`w-full md:w-4/5 flex items-center justify-start mx-auto text-2xl font-semibold mt-8`}
    >
      {`Shop / ${filter.trim()
            .replace(/ {1,}/g, ' ')
            .toLowerCase()
            .split('-')
            .map(word => {
              if (word !== 'and') {
                return word[0].toUpperCase() + word.slice(1)
              } else {
                return word
              }
              })
            .join(' ')}`}
    </div>
    <div className='hidden mx-auto w-4/5 lg:flex gap-4 items-center justify-start mb-8'>
      <div>
        {`Filter by Collection:`}
      </div>
      <button onClick={() => filterClick('all-products')} className={`border-transparent border-2 ${filter === 'all-products' ? '' : 'opacity-50'}`}>
        {`All Products`}
      </button>
      {collectionList.map((collectionHandle) => (
        <button 
          key={collectionHandle} 
          onClick={() => filterClick(collectionHandle)}
          className={`border-transparent border-2 ${filter === collectionHandle ? '' : 'opacity-50'}`}
        >
          {`${collectionHandle
            .trim()
            .replace(/ {1,}/g, ' ')
            .toLowerCase()
            .split('-')
            .map(word => {
              if (word !== 'and') {
                return word[0].toUpperCase() + word.slice(1)
              } else {
                return word
              }
              })
            .join(' ')
          }`}
        </button>
      ))}
      
    </div>
    {loading ? 
      <div className={`flex justify-center w-full md:w-4/5 mx-1 mx-auto gap-2`}>
        <Image
          src="/loading_assets/Yoyo_Walk_Cycle_Forward.gif"
          alt="Yoyo walk cycle"
          width={400}
          height={1}
          unoptimized={true}
        />
      </div> : 
      <div className={`grid grid-cols-2 w-full md:w-4/5 px-2 mx-auto md:grid-cols-4 gap-2 fade-in ${!loading ? 'show' : ''} `}>
        {/* Render your products here using the 'products' state */}
        {products.filter(product => {
          // Show all if no filter is selected
          if (filter === 'all-products') return true;

          // Match the collection name
          return product.drop.includes(filter) ;
        }).map((product) => (
          // Render each product item
          <FadeInImage key={product.name}>
          <div className={`relative text-center h-full`} 
            key={product.name}
          >
            <div className={`absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
            
            <div className={`bg-white flex justify-center overflow-hidden`}>
              <Link className='w-full flex justify-center bg-white' href={`/collections/${product.drop}/${product.handle}`} passHref>
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
              <div className="text-stone-700 ms-auto lg:text-sm">{currFormat.format(Number(product.price))}</div>
            </div>
          </div>
        </FadeInImage>
        ))}
    </div>}
    </>
  );
}

export default ProductCards;