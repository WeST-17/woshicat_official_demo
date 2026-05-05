'use client'
// ProductCards.tsx
import { useEffect, useState } from 'react';
import { getCollectionNamesHelper, getAllProductsHelper } from '../../server_actions/action';
import Link from 'next/link';
import FadeInImage from '../transitions-navigation/FadeInImages';
import Image from 'next/image';
import Collapse from './components/collapse-item';
import { DarkMode } from '../toggles/Dark_Mode/darkModeContext';

const ProductCards = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [collectionList, setCollectionList] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>();
  const [hasNextPage, setNext] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<string>('All Products');
  const [scrollPos, setScrollPos] = useState<number>(0);
  const { darkMode } = DarkMode();
  
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

  const filterClick = ( value: string ) => {
    setTimeout(() => {
      setFilter(value);
    }, 100);
  };

  const currFormat = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'USD',
  });

  const getNextPage = async () => {
    if (!cursor) {
      return;
    }
    const nextPageProducts = await getAllProductsHelper(cursor);
    if (nextPageProducts[1].hasNextPage === true) {
      setCursor(nextPageProducts[1].endCursor);
      setNext(true);
    } else {
      setCursor(null);
      setNext(false);
    }
    const productsPlusNext = products.concat(nextPageProducts[0]);
    setProducts(productsPlusNext);
  };

  useEffect(() => {
    if (scrollPos > 65 && hasNextPage === true) getNextPage();
    return () => {};
  }, [scrollPos]);
  
  useEffect(() => {
    const fetchData = async () => {
      try { 
        setLoading(true);
        const products = await getAllProductsHelper();  
        const collections = await getCollectionNamesHelper();
        const validProducts = products[0].filter((product: { collections: [] | undefined; }) => {
          return (product.collections !== undefined || product.collections!.length > 0);
        })
        setProducts(validProducts || []);
        setCollectionList(collections.reverse() || []);
        if (products[1].hasNextPage) {
          setCursor(products[1].endCursor);
          setNext(true);
        } else {
          setNext(false);
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
    return () => {};
  }, []);

  if (error) {
    return <div className='flex h-32 w-full justify-center items-center'>{"Oops! Something happened on our end!"}</div>;
  }
  
  return (
    <>
    <div className='w-[90vw] h-[70px] mx-auto' id='top-products'/>
    <div 
      className={`w-full lg:w-[90vw] flex items-center justify-start mx-auto text-3xl font-semibold mb-2`}
      id='top-products'
    >
      {`Shop / ${filter}`}
    </div>
    <div className='mx-auto w-full lg:w-[90vw] lg:flex max-md:items-start gap-4 items-center justify-start mb-16 relative '>
      <div className={`w-full lg:w-1/2 flex flex-col justify-start items-start absolute top-0 z-1000 hover:bg-white transition transition-all duration-500 rounded-[8px]`}>
      <Collapse 
        title={`Filter by Collection:`} 
        classProp={`w-full text-xl h-full ${darkMode ? 'bg-stone-700/95 dark-text' : 'light-text bg-stone-200/65'} rounded-[8px] overflow-hidden`}
        divider={false}
      >
        <button onClick={() => filterClick('All Products')} className={`text-base w-full text-start border-transparent border-2 ${filter === 'All Products' ? '' : 'opacity-60'}`}>
          {`All Products`}
        </button>
        {collectionList.map((collection) => (
          <button 
            key={collection.id} 
            onClick={() => {
              filterClick(collection.title);
            }}
            className={`border-transparent border-2 w-full text-start text-base ${filter === collection.title ? '' : 'opacity-60'}`}
          >
            {`${collection.title}`}
          </button>
        ))}
      </Collapse>
      </div>
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
        className={`grid grid-cols-2 md:grid-cols-3 w-full md:w-[90vw] mx-auto lg:grid-cols-5 gap-1 fade-in ${!loading ? 'show' : ''}`}
      >
        {/* Render your products here using the 'products' state */}
        {products.filter(product => {
              // Show all if no filter is selected
              if (filter === 'All Products') return true;
              
              // Match the collection name
              return product.collections.find((collection: {title: string, handle: string}) => {
                return collection.title === filter;
              })
            }
          ).map((product) => (
          // Render each product item
          <FadeInImage key={product.id}>
          <div className={`relative text-center h-full overflow-hidden`} 
            key={product.id}
          >
            <div className={`z-101 w-1/2 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
            <div className={`z-101 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-amber-500 pointer-events-none ${product.lowStock && product.available ? '' : 'hidden'}`}>Only a few left!</div>
            
            <div className={`flex justify-center overflow-hidden ${darkMode ? 'dark-text' : 'light-text'}`}>
              <Link className='w-full flex justify-center' href={`/collections/${product.collections[0].handle}/${product.handle}`} passHref>
              {/* Render product details */}
              <div className='relative flex justify-center items-center aspect-4/5 h-full'>
                {/* Default product image */}
                <img 
                  src={product.images[0].url} 
                  alt={product.images[0].altText} 
                  className={`${!product.available ? 'grayscale-[0.75]' : ''} object-cover rounded-md h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0`}
                />
                
                {/* Hover image */}
                { product.images[2] &&
                  (<img 
                  src={product.images[2].url} 
                  alt={product.images[2].altText} 
                  className={`${!product.available ? 'grayscale-[0.75]' : ''} rounded-md object-cover max-sm:hidden absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100`}
                />)
                  }
              </div>
              </Link>
            </div>
            <div className={`flex flex-col w-full p-2 text-xs gap-1 ${!product.available ? `${darkMode ? "dark-text" : 'light-text'} opacity-75` : `${darkMode ? "dark-text" : "light-text"}`}`}>
              <div className="lg:text-sm text-start">{product.name}</div>
              <div className="text-start">{currFormat.format(Number(product.price))}</div>
            </div>
          </div>
          </FadeInImage>
          ))}
    </div>}
    <Link 
      className={`w-full mx-auto flex flex-col gap-2 justify-center items-center mt-10 transition duration-500 ease-in-out opacity-35 hover:opacity-100 text-sm ${darkMode ? 'dark-text' : 'light-text'}`}
      href={'#top-products'}
    >
      <Image
        src={'/icons/caret-left-solid.svg'}
        alt='up arrow, back to top'
        width={30}
        height={1}
        className={`rotate-90 aspect-square ${darkMode ? 'invert' : ''}`}
      />
      <p>{`back to top`}</p>
    </Link>
    </>
  );
}

export default ProductCards;