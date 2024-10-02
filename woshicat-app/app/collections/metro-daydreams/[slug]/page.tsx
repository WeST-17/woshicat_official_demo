'use client'
// Dynamically routed pages for individual items
import React from 'react';
import { usePathname } from 'next/navigation';
import SingleProductCard from '@/app/components/ProductPages/SingleProduct';

export default function ProductDetailPage() {
    const pathname = usePathname(); // get pathname: '/apparel/[handle]
    const handle = pathname.replace('/collections/metro-daydreams/', ''); // get handle from pathname
    
    return (
      <div>
        <SingleProductCard handle={handle} />
      </div>
    );
}
