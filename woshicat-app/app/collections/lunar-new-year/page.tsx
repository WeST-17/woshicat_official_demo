'use client';

import CollectionCards from "@/app/components/collection-cards";
import CoverHeader from "@/app/components/heroImageInsert";

const LunarNewYear = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="col-span-8 relative h-64 mb-8 overflow-hidden">
        <CoverHeader
          src={'/media/LNY2025/IMG_1130header.jpg'}  //change to lunar new year photo
          alt={'lunar new year collection header full of red packets'}
          header={'Lunar New Year'}
          additional="object-cover inset-0 h-full w-full"
        />
        
      </div>
      <div className="grid col-span-8">
        <div className="flex justify-start h-fit w-full p-1" id='products'>
          <CollectionCards collection={'lunar-new-year'}/>
        </div>
      </div>
      
    </main>
    </>
  );
}

export default LunarNewYear;