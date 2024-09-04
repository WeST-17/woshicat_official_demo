
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "../components/loading";

export default function Collections() {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="grid grid-rows-3 grid-flow-col col-span-8 mt-32 mb-8">
        <div className="flex justify-center h-fit w-full col-span-8 row-start-1 row-end-3 row-span-2">
          <div className="col-span-8 flex gap-8">
          <Suspense fallback={<LoadingScreen />}>
          <div className="flex justify-center w-screen col-span-8 row-start-1 row-end-3 row-span-2">
            <div className="relative col-span-3 flex justify-center items-center">
              <Link href={'/collections/shirts/'}>
              <Image
                src={'/media/the-videographer-snowboard.png'}
                width={400}
                height={400}
                alt={'Shirts'}
              />
              </Link>
              <div className="absolute bottom-0">shirts</div>
            </div>
            <div className="relative col-span-3 flex justify-center items-center">
              <Link href={'/collections/accessories/'}>
              <Image
                src={'/media/the-videographer-snowboard.png'}
                width={400}
                height={400}
                alt={'Accessories'}
              />
              </Link>
              <div className="absolute bottom-0">accessories</div>
            </div>
            <div className="relative col-span-3 flex justify-center items-center">
              <Link href={'/collections/stickers/'}>
              <Image
                src={'/media/the-videographer-snowboard.png'}
                width={400}
                height={400}
                alt={'Stickers'}
              />
              </Link>
              <div className="absolute bottom-0">stickers</div>
            </div>
            </div>
          </Suspense>
          </div>
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