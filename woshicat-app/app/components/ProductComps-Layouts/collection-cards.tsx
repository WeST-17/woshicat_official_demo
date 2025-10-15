'use client'
// CollectionCards.tsx
import React, { useEffect, useState } from 'react';
import { getCollectionProductsHelper } from '../../server_actions/action';
import Link from 'next/link';
import FadeInImage from '../transitions-navigation/FadeInImages';
import Image from 'next/image';
import CoverHeader from './components/heroImageInsert';

interface CollectionType {
    collectionHandle: string | any
}

const CollectionCards: React.FC<CollectionType> = ({ collectionHandle }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>();
  const [scrollPos, setScrollPos] = useState<number>(0);
  
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      const products = await getCollectionProductsHelper(collectionHandle);
      try {
        setProducts(products[0]);
        setCursor(products[1].endCursor);
      } catch (error) {
        console.error('Error fetching server component props:', products);
        setError(products);
      } 
      setLoading(false);
      
    };
    fetchData();
    console.log('Products Gallery loaded.');
  }, [collectionHandle]);

  const HandleScroll = () => {
    const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
    const windowScroll = document.documentElement.scrollTop;
    const scrolled = (windowScroll / height) * 100;
    setScrollPos(scrolled);
  }

  const currFormat = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
      window.addEventListener("scroll", HandleScroll, { passive: true });
      return () => {
          window.removeEventListener("scroll", HandleScroll);
      };
  }, []);

  const getNextPage = async () => {
    if (cursor === null) {
      return;
    }
    const nextPageProducts = await getCollectionProductsHelper(collectionHandle, cursor);
    if (nextPageProducts[1].hasNextPage === true) {
      setCursor(nextPageProducts[1].endCursor);
    } else {
      setCursor(null);
    }
    const productsPlusNext = products.concat(nextPageProducts[0]);
    setProducts(productsPlusNext);
  }

  useEffect(() => {
    if (scrollPos > 75 && cursor !== null) getNextPage();
  }, [scrollPos]);

  if (loading) {
    return (
      <div className={`flex justify-center w-full md:w-[90vw] mx-1 mx-auto gap-2`}>
        <Image
          src="/loading_assets/Yoyo_Walk_Cycle_Forward.gif"
          alt="Yoyo walk cycle"
          width={400}
          height={1}
          unoptimized={true}
        />
      </div>
    );
  }

  if (error != null) {
    return <div className='flex justify-center w-[100vw] h-[50vh] mt-64'>Something happened on our end!</div>;
  }


  return (
    <>
    <div className="flex justify-center items-center w-full h-fit relative overflow-hidden mb-8">
      <CoverHeader
        src={products[0].collectionImg} 
        alt={products[0].collectionAlt}
        header={products[0].collectionTitle}
        additional="w-full h-full"
      />
    </div>
    <div className={`grid grid-cols-2 w-full md:w-[90vw] mx-1 mx-auto lg:grid-cols-4 gap-1 fade-in ${!loading ? 'show' : ''} `}>
      {products.map((product) => (
        // Render each product item
        <FadeInImage key={product.handle}>
        <div className={`relative text-center h-full overflow-hidden`}  
          key={product.handle}
        >
          <div className={`z-[101] rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
          <div className={`z-[101] rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-amber-500 pointer-events-none ${product.lowStock && product.available ? '' : 'hidden'}`}>Only a few left!</div>
          
          <div className={`bg-white flex justify-center overflow-hidden`}>
            <Link className='w-full flex justify-center' href={`/collections/${product.collection}/${product.handle}`} passHref>
            {/* Render product details */}
            <div className='relative aspect-[9/10] flex justify-center items-center'>
              {/* Default product image */}
              <img 
                src={product.images[0].url} 
                alt={product.images[0].altText} 
                className={`${!product.available ? 'grayscale-[0.75]' : ''} ${product.handle.includes('shirt', 'hoodie') ? 'object-contain' : 'object-cover'} h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0`}
              />
              {/* Hover image */}
              { product.images[2] && (<img 
                src={product.images[2].url} 
                alt={product.images[2].altText} 
                className={`${!product.available ? 'grayscale-[0.75]' : ''} object-contain max-sm:hidden absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100`}
              />) }
            </div>
            </Link>
          </div>
          <div className={`flex w-full p-2 text-xs gap-2 ${!product.available ? 'text-stone-500' : 'text-black'}`}>
            <div className="me-auto lg:text-sm text-start">{product.title}</div>
            <div className="ms-auto lg:text-sm">{currFormat.format(product.price)}</div>
          </div>
        </div>
      </FadeInImage>
      ))}
    </div>
    </>
  );
}

export default CollectionCards;