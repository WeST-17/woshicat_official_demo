'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import CollectionCards from "@/app/components/ProductComps-Layouts/collection-cards";

const CollectionPage = () => {
  const pathname = usePathname(); // get pathname: '/collections/[handle]
  const handle = pathname.replace(/^\/collections\//, ''); // get handle from pathname

  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      
      <div className="col-span-8">
        <div className="flex flex-col justify-center h-fit w-full" id='products'>
          <CollectionCards collectionHandle={handle}/>
        </div>
      </div>
      
    </main>
    </>
  );
}

export default CollectionPage;