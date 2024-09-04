import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import { Suspense } from "react";
import LoadingScreen from "./components/loading";


export default function Home() {
  
  return (
    <>
    <Transition>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center items-center h-[100vh] w-full row-start-1 row-end-3 row-span-2 overflow-hidden">
          {/* Upload and replace video link */}
          <video className="max-md:p-4 w-[100vw] min-h-full" autoPlay loop muted playsInline={false} data-v-f518367b=""><source src="https://disguised.cdn.prismic.io/disguised/d5adde93-bc72-4e19-9eb6-bdceeed8de13_DSG+Launch+Video+-+15+sec.mp4" type="video/mp4" data-v-f518367b="" /></video>
        </div>
      </div>
      <div className="grid grid-rows-3 grid-flow-col col-span-8 mb-8">
        <Suspense fallback={<LoadingScreen />}>
        <div className="flex justify-center h-fit w-full p-4 col-span-8 row-start-1 row-end-3 row-span-2">
          <div className="relative col-span-3 flex justify-center items-center">
            <Image
              src={'/media/the-videographer-snowboard.png'}
              width={400}
              height={400}
              alt={'Shirts'}
            />
            <div className="absolute bottom-0">shirts</div>
          </div>
          <div className="relative col-span-3 flex justify-center items-center">
            <Image
              src={'/media/the-videographer-snowboard.png'}
              width={400}
              height={400}
              alt={'Accessories'}
            />
            <div className="absolute bottom-0">accessories</div>
          </div>
          <div className="relative col-span-3 flex justify-center items-center">
            <Image
              src={'/media/the-videographer-snowboard.png'}
              width={400}
              height={400}
              alt={'Stickers'}
            />
            <div className="absolute bottom-0">stickers</div>
          </div>
        </div>
        </Suspense>
      </div>
      {/* */}
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center h-fit w-full col-span-8 row-start-1 row-end-3 row-span-2">
        {/* Create another component for brand/product information on home page */}
        {/* Add Typescript/CSS animation to have component fade in when user scrolls down page */}
        </div>
      </div>
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}