'use client';

import Loader from "./LoadingScreen";

export default function Transition({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <div className="bg-white absolute top-0 w-full h-full justify-center items-center pointer-events-none fadeout">
        
      </div>
      <div className="w-full h-full">
        {children}
      </div>
    </>
  )
}