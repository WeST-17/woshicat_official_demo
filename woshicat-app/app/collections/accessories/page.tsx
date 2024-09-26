import CollectionCards from "@/app/components/collection-cards";
import React from "react";
import Link from "next/link";

const Collections = () => {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      {/* */}
      <div className="grid col-span-8 mt-32">
        <div className="flex justify-start mt-12 ms-12 h-fit w-full col-span-8 text-6xl">
          Accessories
        </div>
      </div>
      <div className="grid grid-rows-3 grid-flow-col col-span-8">
        <div className="flex justify-center h-fit w-full p-1 col-span-8" id='products'>
          <CollectionCards collection={'accessories'}/> {/* adjust based on page layout finalizing. Currently works when using 'apparel' as the collection. Maybe just gotta wait for shopify to update... */}
        </div>
      </div>
      
    </main>
    </>
  );
}

export default Collections;