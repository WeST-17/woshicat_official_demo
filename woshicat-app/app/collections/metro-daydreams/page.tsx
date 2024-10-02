'use client';

import CollectionCards from "@/app/components/collection-cards";
import CoverHeader from "@/app/components/heroImageInsert";

const Collections = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="col-span-8 relative h-96 mb-8">
        <CoverHeader
          src={'/media/collection_page_covers/s_k_pointnlook.JPG'} 
          alt={'models pointing out and wearing woshi cat shirts'}
          header={'Metro Daydreams'}
        />
        
      </div>
      <div className="grid col-span-8">
        <div className="flex justify-start h-fit w-full" id='products'>
          <CollectionCards collection={'metro-daydreams'}/>
        </div>
      </div>
      
    </main>
    </>
  );
}

export default Collections;