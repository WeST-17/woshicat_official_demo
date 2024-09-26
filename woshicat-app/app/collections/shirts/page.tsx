import CollectionCards from "@/app/components/collection-cards";
import React from "react";
import Link from "next/link";

const Collections = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="col-span-8 mt-20 flex justify-start">
        <div className="flex justify-start m-12 h-fit w-full text-6xl">
          Shirts
        </div>
      </div>
      <div className="grid grid-rows-1 grid-flow-col col-span-8">
        <div className="flex justify-start h-fit w-full" id='products'>
          <CollectionCards collection={'shirts'}/>
        </div>
      </div>
      
    </main>
    </>
  );
}

export default Collections;