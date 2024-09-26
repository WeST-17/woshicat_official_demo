
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "../components/loading";

export default function Collections() {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="col-span-8 mt-[100px]">
        <div className="flex justify-center">
          <div className="">
            <Suspense fallback={<LoadingScreen />}>
              <div className="flex justify-center grid grid-cols-2 w-[100vw] h-[100vh]">
                <div className="w-full relative flex justify-center items-center">
                  <Link href={'/collections/shirts/'}>
                    <Image
                      src={'/media/collection_page_covers/s_k_pointnlook.jpg'}
                      fill={true}
                      alt={'Shirts'}
                      className="object-cover"
                    />
                  
                    <div className="absolute bottom-0 left-0 p-3 font-thin text-6xl text-white">Shirts</div>
                  </Link>
                </div>
                <div className="relative flex justify-center items-center bg-black/50">
                  <Link href={'/collections/accessories/'}>
                    <Image
                      src={'/media/yoyo_yellow_sticker.png'}
                      width={400}
                      height={400}
                      alt={'Accessories'}
                      className="object-cover"
                    />
                    
                    <div className="absolute bottom-0 left-0 p-3 font-thin text-white text-6xl w-full">Accessories</div>
                  </Link>
                </div>
                
              </div>
            </Suspense>
          </div>
        </div>
        {/* Next spot for additions */}
        {/* */}
        <div className="p-8 col-span-8">
          <div className="flex justify-center h-fit w-full col-span-8">
            testing stuff here!
          </div>
        </div>
      </div>
      
    </main>
    </>
  );
}