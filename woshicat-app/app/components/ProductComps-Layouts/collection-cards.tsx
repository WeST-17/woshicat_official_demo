'use client'
// CollectionCards.tsx
import React, { useEffect, useState } from 'react';
import { getCollectionProductsHelper } from '../../server_actions/action';
import Link from 'next/link';
import FadeInImage from '../transitions-navigation/FadeInImages';
import CoverHeader from './components/heroImageInsert';
import { notFound } from 'next/navigation';
import Loader from '../transitions-navigation/LoadingScreen';
import { DarkMode } from '../toggles/Dark_Mode/darkModeContext';

interface CollectionType {
    collectionHandle: string | any
}

const CollectionCards: React.FC<CollectionType> = ({ collectionHandle }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>();
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [hasNextPage, setNext] = useState<boolean | null>(null);
  const { darkMode } = DarkMode();
  
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      const products = await getCollectionProductsHelper(collectionHandle);
      try {
        setProducts(products[0]);
        setCursor(products[1].endCursor);
        if (products[1].hasNextPage) setNext(true); else setNext(false);
        
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
    if (!cursor) {
      return;
    }
    const nextPageProducts = await getCollectionProductsHelper(collectionHandle, cursor);
    if (nextPageProducts[1].hasNextPage === true) {
      setCursor(nextPageProducts[1].endCursor);
      setNext(true);
    } else {
      setCursor(null);
      setNext(false);
    }
    const productsPlusNext = products.concat(nextPageProducts[0]);
    setProducts(productsPlusNext);
  }

  useEffect(() => {
    if (scrollPos > 75 && hasNextPage) getNextPage();
  }, [scrollPos]);

  if (loading) {
    return (
      <div className={`flex justify-center items-center w-full h-screen mx-auto`}>
        <Loader />
      </div>
    );
  }

  if (error != null) {
    notFound();
  }


  return (
    <>
    <div className="flex justify-center items-center w-full h-fit relative overflow-hidden mb-8 absolute top-0 sticky rounded-b-lg">
      <CoverHeader
        src={products[0].collectionImg} 
        alt={products[0].collectionAlt}
        header={products[0].collectionTitle}
        additional="w-full h-full"
      />
    </div>
    <section className={`w-full min-h-screen h-[120vh] relative ${darkMode ? 'bg-stone-900/95 dark-text' : 'light-text bg-white/95'}`}>
      <div className={`pt-4 relative grid grid-cols-2 w-full md:w-[90vw] mx-1 mx-auto lg:grid-cols-5 gap-1 fade-in ${!loading ? 'show' : ''} `}>
        {products.map((product) => (
          // Render each product item
          <FadeInImage key={product.handle}>
          <div className={`relative text-center h-full overflow-hidden rounded-[8px] ${darkMode ? 'bg-stone-900/95' : 'bg-white/95'}`}  
            key={product.handle}
          >
            <div className={`z-101 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
            <div className={`z-101 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-amber-500 pointer-events-none ${product.lowStock && product.available ? '' : 'hidden'}`}>Only a few left!</div>
            
            <div className={`flex justify-center overflow-hidden`}>
              <Link className='w-full flex justify-center' href={`/collections/${product.collection}/${product.handle}`} passHref>
              {/* Render product details */}
              <div className='relative aspect-4/5 flex justify-center items-center'>
                {/* Default product image */}
                <img 
                  src={product.images[0].url} 
                  alt={product.images[0].altText} 
                  className={`${!product.available ? 'grayscale-[0.75]' : ''} z-1 bg-transparent object-cover rounded-md h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0`}
                  
                />
                {/* Hover image */}
                { product.images[2] && (<img 
                  src={product.images[2].url} 
                  alt={product.images[2].altText} 
                  className={`${!product.available ? 'grayscale-[0.75]' : ''} z-1 rounded-md object-cover max-sm:hidden absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100`}
                />) }
              </div>
              </Link>
            </div>
            <div className={`flex flex-col w-full p-2 text-xs gap-1 ${!product.available ? `${darkMode ? 'text-stone-400' : "text-stone-600"}` : `${darkMode ? 'dark-text' : "light-text"}`}`}>
              <div className="lg:text-sm text-start">{product.title}</div>
              <div className="text-start">{currFormat.format(product.price)}</div>
            </div>
          </div>
        </FadeInImage>
        ))}
      </div>
    </section>
    </>
  );
}

export default CollectionCards;