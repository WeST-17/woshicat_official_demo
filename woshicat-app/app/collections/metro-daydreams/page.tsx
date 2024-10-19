'use client';

import CollectionCards from "@/app/components/collection-cards";
import CoverHeader from "@/app/components/heroImageInsert";

const MetroDaydreams = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="col-span-8 relative h-96 mb-8 overflow-hidden">
        <CoverHeader
          src={'/media/graphics/Metro Header.png'} 
          alt={'metro daydreams header'}
          header={'Metro Daydreams'}
          additional="object-cover inset-0 h-full w-full"
        />
        
      </div>
      <div className="grid col-span-8">
        <div className="flex justify-start h-fit w-full p-1" id='products'>
          <CollectionCards collection={'metro-daydreams'}/>
        </div>
      </div>
      
    </main>
    </>
  );
}

export default MetroDaydreams;