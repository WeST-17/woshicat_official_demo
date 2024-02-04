
import Image from "next/image";
import { Metadata } from "next";

import Navigation from "./components/navbar";
import Footer from "./components/footer";
import ProductCards from "./components/product-cards";


export const metadata: Metadata = {
  title: "Wo Shi Cat",
  description: "Wo Shi Cat Apparel Site",
  keywords: 'Apparel, Hoodies, T-shirts, Sweatshirts, Comfort, Quality',
};

export default function Home() {

  return (
    <main className="flex justify-center w-full grid grid-cols-8">
      <header className="sticky top-0 flex self-start justify-end items-center col-span-8 h-[120px] bg-stone-50 text-base text-stone-700 p-2 z-[1000]">
        <div className="border-test p-4 me-auto text-4xl">
          {/* Logo Placeholder */}
          WS
        </div>
        <Navigation />
      </header>
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
      {/* Footer */}
      <Footer />
    </main>
  );
}