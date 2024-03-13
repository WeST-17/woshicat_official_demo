import ProductCards from "../components/product-cards";
import React from "react";
import Link from "next/link";

export default function Apparel() {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="flex justify-center items-center h-[100vh] col-span-8">
        <div className="absolute top-0 right-0 bg-black/25 h-full w-full"></div>
        <div className="grid grid-rows-3 h-full">
          <div className="z-[900] row-start-2 flex justify-center items-center">
            <h1 className="p-4 text-[200px]">Apparel</h1>
          </div>
          <div className="z-[900] flex justify-center items-end self-end row-start-3 h-fit">
            <Link 
              href='/apparel/#products'
            >
              <h1 className="p-4">Down</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-3 grid-flow-col col-span-8 mt-8 mb-8">
        <div className="flex justify-center h-fit w-full p-1 col-span-8 row-start-1 row-end-3 row-span-2" id='products'>
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