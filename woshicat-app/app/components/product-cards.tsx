'use client'
// ProductCards.tsx
import React, { useEffect, useState } from 'react';
import { getServerProductsProps } from '../action';
import Link from 'next/link';

const staticProducts = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    image: {
      url: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      altText: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
  },

  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    image: {
      url: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      altText: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
  },
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    image: {
      url: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      altText: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
  },
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    image: {
      url: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      altText: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
  }
]

export default function ProductCards() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { products, error } = await getServerProductsProps();
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
    console.log('ProductCards: useEffect - Fetching complete.');
    fetchData();
  }, []);

  if (error) {
    return <div className='flex h-[100vh]'>Error fetching products: {error.message}</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 flex justify-center'>
      {/* Render your products here using the 'products' state */}
      {products.map((product) => (
        // Render each product item
        <div className='text-center' key={product.id}>
          <div className='hover:opacity-75 transition duration-300'>
              <Link href={`/apparel/${product.handle}`} passHref>
              {/* Render product details */}
              <img 
                src={product.image.url} 
                alt={product.image.altText}
                className='rounded-md mb-3'
              />
              <h3 className="mt-4 text-sm text-stone-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-stone-900">${product.price}</p>
              </Link>
              <button
                className="rounded-md bg-stone-400 mt-2 p-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                >
                Add to Cart
              </button>
          </div>
        </div>
      ))}
    </div>
  );
}
