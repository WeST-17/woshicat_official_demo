'use client'
// Dynamically routed pages for individual items
import React from 'react';
import { usePathname } from 'next/navigation';
import SingleProductCard from '@/app/components/ProductComps-Layouts/ProductPages/SingleProduct';
import TransitionSlide from '@/app/components/transitions-navigation/transitionWipe';

const ProductDetailPage = () => {
    const pathname = usePathname(); // get pathname: '/apparel/[handle]
    const handle = pathname.replace(/^\/collections\/[^/]+\//, ''); // get handle from pathname
    
    return (
      <>
      <div>
       <SingleProductCard handle={handle} />
      </div>
      <TransitionSlide />
      </>
    );
}

export default ProductDetailPage;