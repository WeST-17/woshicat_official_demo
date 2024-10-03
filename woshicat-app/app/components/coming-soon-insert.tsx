'use client';
import Link from "next/link";
import Image from "next/image";

export default function ComingSoonInsert() {

  return (
    <>
    <div className="flex justify-center items-center w-full h-screen grid grid-cols-8 bg-stone-100">
      <div className="relative col-span-8 grid-flow-col flex flex-col justify-start items-center h-full">
        <Image
          src={'/media/graphics/WoShi_Coming_Soon.png'}
          alt={'WoShi Cat Launch Page Coming Soon'}
          fill={true}
          className="pointer-events-none object-cover"
        />
        <Link href='https://www.woshicat.com' className="z-[100]">
          <Image
            src={'/logo/Logo Red Version.png'}
            alt={'WoShi Cat Stamp Logo'}
            width={200}
            height={1}
            className="pointer-events-none"
          />
        </Link>
        <div className="z-[100] text-center rounded-md hover:text-stone-900 transition duration-300 p-2 mb-8">
            <Link href='https://instagram.com/woshicatofficial' target='_blank'>
                <Image 
                    src={'/logo/instagram-brands-solid.svg'}
                    alt={'Instagram'}
                    className="text-stone-700"
                    width={25}
                    height={25}
                />
            </Link>
        </div>
        <div className="z-[100]">Coming Soon...</div>
      </div>
    </div>
    </>
  );
}