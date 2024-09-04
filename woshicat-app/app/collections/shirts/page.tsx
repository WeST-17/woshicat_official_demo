import CollectionCards from "@/app/components/collection-cards";
import React from "react";
import Link from "next/link";

const Collections = () => {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="grid grid-rows-3 grid-flow-col col-span-8 mt-8 mb-8">
        <div className="flex justify-center h-fit w-full p-1 col-span-8 row-start-1 row-end-3 row-span-2" id='products'>
          <CollectionCards collection={'apparel'}/> {/* adjust based on page layout finalizing. Currently works when using 'apparel' as the collection. Maybe just gotta wait for shopify to update... */}
        </div>
      </div>
      {/* */}
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center h-fit w-full col-span-8 row-start-1 row-end-3 row-span-2">

        </div>
      </div>
    </main>
    </>
  );
}

export default Collections;