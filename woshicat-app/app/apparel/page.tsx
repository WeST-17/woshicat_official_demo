import ProductCards from "../components/product-cards";
import React from "react";

export default function Apparel() {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="text-6xl text-center col-span-8">
        <h1>Apparel</h1>
      </div>
      <div className="grid grid-rows-3 grid-flow-col col-span-8 mt-8 mb-8">
        <div className="flex justify-center h-fit w-full p-1 col-span-8 row-start-1 row-end-3 row-span-2">
          <ProductCards />
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