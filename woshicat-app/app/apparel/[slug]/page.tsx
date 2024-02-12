'use client'
// Dynamically routed pages for individual items
import React from 'react';
import { usePathname } from 'next/navigation';
import SingleProductCard from '@/app/components/SingleProduct';

export default function ProductDetailPage() {
    const pathname = usePathname();
    const handle = pathname.replace('/apparel/', '') // You can replace with any handle really

    return (
      <div>
        <SingleProductCard handle={handle} />
      </div>
    );
}
