import React from "react";
import Link from "next/link";
import Image from "next/image";
import ComingSoonInsert from "../components/coming-soon-insert";

const Yoyo = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="flex col-span-8 gap-4">
        <ComingSoonInsert />
        
      </div>
      
    </main>
    </>
  );
}

export default Yoyo;