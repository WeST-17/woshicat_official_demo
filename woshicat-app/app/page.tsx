import Image from "next/image";
import ProductCards from "./components/product-cards";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";

export default function Home() {
  
  return (
    <>
    <Transition>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center items-center h-[100vh] w-full col-span-8 row-start-1 row-end-3 row-span-2 bg-stone-200 mb-8">
          <Image 
            src='/next.svg'
            alt='placeholder image'
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="grid grid-rows-2 grid-flow-col col-span-8 mb-8">
        <div className="flex justify-center h-fit w-full col-span-8 row-start-1 row-end-3 row-span-2">
          <ProductCards />
        </div>
      </div>
      {/* */}
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center h-fit w-full col-span-8 row-start-1 row-end-3 row-span-2">

        </div>
      </div>
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}