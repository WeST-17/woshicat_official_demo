'use client'
// Dynamically routed pages for individual items
import React from 'react';
import { usePathname } from 'next/navigation';
import SingleProductCard from '@/app/components/ProductPages/SingleProduct';
import AccessoryCard from '@/app/components/ProductPages/AccessoryPage';

const ProductDetailPage = () => {
    const pathname = usePathname(); // get pathname: '/apparel/[handle]
    const handle = pathname.replace('/collections/lunar-new-year/', ''); // get handle from pathname

    const isAccessory: boolean = handle.includes('sticker');
    
    return (
      <div>
       {!isAccessory ? <SingleProductCard handle={handle} /> : <AccessoryCard handle={handle} />} 
      </div>
    );
}

export default ProductDetailPage;