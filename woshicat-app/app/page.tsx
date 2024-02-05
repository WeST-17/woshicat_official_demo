
import Image from "next/image";
import ProductCards from "./components/product-cards";

export default function Home() {

  return (
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center items-center h-[100vh] w-full col-span-8 row-start-1 row-end-3 row-span-2">
          Hero Header Placeholder
        </div>
      </div>
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
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
  );
}