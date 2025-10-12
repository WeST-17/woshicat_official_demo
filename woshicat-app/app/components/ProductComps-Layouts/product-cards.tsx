'use client'
// ProductCards.tsx
import React, { useEffect, useState } from 'react';
import { getCollectionNamesHelper, getAllProductsHelper } from '../../server_actions/action';
import Link from 'next/link';
import FadeInImage from '../transitions-navigation/FadeInImages';
import Image from 'next/image';

const ProductCards = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [collectionList, setCollectionList] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>();
  const [filter, setFilter] = useState<string>('All Products');
  const [scrollPos, setScrollPos] = useState<number>(0);
  const HandleScroll = () => {
      const height = 
          document.documentElement.scrollHeight - 
          document.documentElement.clientHeight;
      const windowScroll = document.documentElement.scrollTop;
      const scrolled = (windowScroll / height) * 100;
      setScrollPos(scrolled);
  }

  useEffect(() => {
      window.addEventListener("scroll", HandleScroll, { passive: true });
      return () => {
          window.removeEventListener("scroll", HandleScroll);
      };
  }, []);

  const filterClick = (x: string) => {
    setFilter(x);
  }

  const currFormat = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'USD',
  });

  const getNextPage = async () => {
    if (cursor === null) {
      return;
    }
    const nextPageProducts = await getAllProductsHelper(cursor);
    if (nextPageProducts[1].hasNextPage === true) {
      setCursor(nextPageProducts[1].endCursor);
    } else {
      setCursor(null);
    }
    const productsPlusNext = products.concat(nextPageProducts[0]);
    setProducts(productsPlusNext);
  }

  useEffect(() => {
    if (scrollPos > 75) getNextPage();
  }, [scrollPos]);
  
  useEffect(() => {

    const fetchData = async () => {
      try { 
        setLoading(true);
        const products = await getAllProductsHelper();  
        const collections = await getCollectionNamesHelper();
        const validProducts = products[0].filter((product: { collection: string | undefined; }) => {
          return product.collection !== undefined;
        })
        setProducts(validProducts || []);
        setCollectionList(collections || []);
        if (products[1].hasNextPage) {
          setCursor(products[1].endCursor);
        }

      } catch (error) {
        console.error('Error fetching server component props:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log('Products Gallery loaded.');
    
  }, []);

  if (error) {
    return <div className='flex h-32 w-full justify-center items-center'>{"Oops! Something happened on our end!"}</div>;
  }
  
  return (
    <>
    <div className='w-[90vw] h-[70px] mx-auto' id='top-products'/>
    <div 
      className={`w-full lg:w-[90vw] flex items-center justify-start mx-auto text-2xl font-semibold`}
      id='top-products'
    >
      {`Shop / ${filter}`}
    </div>
    <div className='hidden mx-auto w-full lg:w-[90vw] lg:flex max-md:items-start gap-4 items-center justify-start mb-8'>
      <div>
        {`Filter by Collection:`}
      </div>
      <button onClick={() => filterClick('All Products')} className={`border-transparent border-2 ${filter === 'All Products' ? '' : 'opacity-50'}`}>
        {`All Products`}
      </button>
      {collectionList.map((collection) => (
        <button 
          key={collection.id} 
          onClick={() => filterClick(collection.title)}
          className={`border-transparent border-2 ${filter === collection.title ? '' : 'opacity-50'}`}
        >
          {`${collection.title}`}
        </button>
      ))}
      
    </div>
    {loading ? 
      <div className={`flex justify-center w-full md:w-[90vw] mx-1 mx-auto gap-2`}>
        <Image
          src="/loading_assets/Yoyo_Walk_Cycle_Forward.gif"
          alt="Yoyo walk cycle"
          width={400}
          height={1}
          unoptimized={true}
        />
      </div> : 
      <div 
        className={`grid grid-cols-2 md:grid-cols-3 w-full md:w-[90vw] mx-auto lg:grid-cols-5 gap-1 fade-in ${!loading ? 'show' : ''} `}
      >
        {/* Render your products here using the 'products' state */}
        {products.filter(product => {
          // Show all if no filter is selected
          if (filter === 'All Products') return true;

          // Match the collection name
          return product.collectionTitle === filter;
        }).map((product) => (
          // Render each product item
          <FadeInImage key={product.id}>
          <div className={`relative text-center h-full overflow-hidden bg-white/80`} 
            key={product.id}
          >
            <div className={`z-[101] w-1/2 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
            <div className={`z-[101] rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-amber-500 pointer-events-none ${product.lowStock && product.available ? '' : 'hidden'}`}>Only a few left!</div>
            
            <div className={`bg-white flex justify-center overflow-hidden`}>
              <Link className='w-full flex justify-center bg-white' href={`/collections/${product.collection}/${product.handle}`} passHref>
              {/* Render product details */}
              <div className='relative flex justify-center items-center aspect-[9/10] h-full'>
                {/* Default product image */}
                <img 
                  src={product.images[0].url} 
                  alt={product.images[0].altText} 
                  className={`${!product.available ? 'grayscale-[0.75]' : ''} ${product.handle.includes('shirt', 'hoodie') ? 'object-contain' : 'object-cover'} h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0`}
                />
                
                {/* Hover image */}
                { product.images[2] &&
                  (<img 
                  src={product.images[2].url} 
                  alt={product.images[2].altText} 
                  className={`${!product.available ? 'grayscale-[0.75]' : ''} object-contain max-sm:hidden absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100`}
                />)
                  }
              </div>
              </Link>
            </div>
            <div className={`flex w-full p-2 text-xs gap-2 ${!product.available ? 'text-stone-500' : 'text-black'}`}>
              <div className="me-auto lg:text-sm text-start">{product.name}</div>
              <div className="ms-auto lg:text-sm">{currFormat.format(Number(product.price))}</div>
            </div>
          </div>
          </FadeInImage>
          ))}
    </div>}
    <Link 
      className='w-full mx-auto flex flex-col gap-2 justify-center items-center mt-10 transition duration-500 ease-in-out opacity-35 hover:opacity-100 text-sm'
      href={'#top-products'}
    >
      <Image
        src={'/icons/caret-left-solid.svg'}
        alt='up arrow, back to top'
        width={30}
        height={1}
        className='rotate-90 aspect-square'
      />
      {`back to top`}
    </Link>
    </>
  );
}

export default ProductCards;