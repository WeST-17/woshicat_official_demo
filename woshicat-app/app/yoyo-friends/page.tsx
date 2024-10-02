import React from "react";
import Link from "next/link";
import Image from "next/image";

const Collections = () => {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8 mx-auto">
      {/* */}
      <div className="flex col-span-8 p-8 gap-4">
        <Image
          src={'/media/graphics/WoShi_Coming_Soon.png'}
          alt={'web series strip!'}
          width={300}
          height={1}
        />
        
      </div>
      
    </main>
    </>
  );
}

export default Collections;