'use client'
// Dynamically routed pages for individual items
import React from 'react';
import { usePathname } from 'next/navigation';
import SingleProductCard from '@/app/components/ProductPages/SingleProduct';
import AccessoryCard from '@/app/components/ProductPages/AccessoryPage';
import TransitionSlide from '@/app/components/transitionWipe';

const ProductDetailPage = () => {
    const pathname = usePathname(); // get pathname: '/apparel/[handle]
    const handle = pathname.replace(/^\/collections\/[^/]+\//, ''); // get handle from pathname

    const isAccessory: boolean = !['shirt', 'hoodie', 'sweater', 'pants'].some(item =>
      handle.toLowerCase().includes(item)
    );
    

    
    return (
      <>
      <div>
       {!isAccessory ? <SingleProductCard handle={handle} /> : <AccessoryCard handle={handle} />} 
      </div>
      <TransitionSlide />
      </>
    );
}

export default ProductDetailPage;