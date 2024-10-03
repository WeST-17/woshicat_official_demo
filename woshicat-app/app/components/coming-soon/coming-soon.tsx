'use client';
import Link from "next/link";
import Image from "next/image";
import EmailList from "../emailList/emailList";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ComingSoon() {
  const pathname = usePathname();
    useEffect(() => {
        // If the current path is not the coming soon page, redirect
        if (pathname !== '/') {
            window.location.href = '/'; // Redirects to the coming soon page
        }
    }, [pathname]); // Only re-run the effect if the pathname changes

  return (
    <div className="z-[1000] flex justify-center items-center w-full h-screen grid grid-cols-8 bg-stone-100 text-black">
      <div className="relative col-span-8 flex flex-col justify-start items-center h-full">
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
        <div className="z-[100] text-center rounded-md p-2 mb-2">
            <Link href='https://instagram.com/woshicatofficial' target='_blank' className="flex justify-center items-center gap-2 ">
                <Image 
                    src={'/logo/instagram-brands-solid.svg'}
                    alt={'Instagram'}
                    className="text-stone-700"
                    width={25}
                    height={25}
                />
                <div className="z-[999] text-stone-500 hover:text-stone-900 transition duration-300">@woshicatofficial</div>
            </Link>
        </div>
        <div className="z-[100] px-6 py-2 max-sm:mx-1 w-fit h-fit rounded-md flex justify-center items-center">
          <EmailList />
        </div>
      </div>
    </div>
  );
}