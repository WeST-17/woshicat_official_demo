'use client'
// Dynamically routed pages for individual items
import React from 'react';
import AccessoryCard from '@/app/components/AccessoryPage';
import { usePathname } from 'next/navigation';

export default function AccessoryDetailPage() {
    const pathname = usePathname(); // get pathname: '/apparel/[handle]
    const handle = pathname.replace('/collections/accessories/', '') // get handle from pathname

    return (
      <div>
        <AccessoryCard handle={handle} />
      </div>
    );
}
