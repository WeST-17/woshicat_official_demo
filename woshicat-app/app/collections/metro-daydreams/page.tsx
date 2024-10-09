'use client';

import CollectionCards from "@/app/components/collection-cards";
import CoverHeader from "@/app/components/heroImageInsert";

const Collections = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="col-span-8 relative h-fit md:h-96 mb-8 overflow-hidden">
        <CoverHeader
          src={'/media/metro-daydreams-landing/s_k_pointnlook.JPG'} 
          alt={'models pointing out and wearing woshi cat shirts'}
          header={'Metro Daydreams'}
          additional="lg:-translate-y-28"
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

export default Collections;