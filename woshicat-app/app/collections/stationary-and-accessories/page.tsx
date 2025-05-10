'use client';

import CollectionCards from "@/app/components/collection-cards";
import CoverHeader from "@/app/components/heroImageInsert";

const Stationary = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="col-span-8 relative h-64 mb-8 overflow-hidden">
        <CoverHeader
          src={'/media/stationary-page/apr2025_506print.jpg'}  //change to lunar new year photo
          alt={''}
          header={'Stationary and Accessories'}
          additional="object-cover inset-0 h-full w-full"
        />
        
      </div>
      <div className="flex col-span-8">
        <div className="flex justify-start h-fit w-full p-1" id='products'>
          <CollectionCards collection={'stationary-and-accessories'}/>
        </div>
      </div>
      
    </main>
    </>
  );
}

export default Stationary;