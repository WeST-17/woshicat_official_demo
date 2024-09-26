
import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Brand() {
  
  return (
    <>
    <main className="flex justify-center w-full grid grid-cols-8">
      <div className="grid grid-rows-3 grid-flow-col col-span-8 mt-32 mb-8">
        <div className="flex justify-center h-screen w-full col-span-8 row-start-1 row-end-3 row-span-2">
          <div className="col-span-8 flex gap-8">
            WoShi Cat !!!
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