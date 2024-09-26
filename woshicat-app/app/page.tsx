'use client';
/*import { useState, useEffect } from "react";*/
import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import { Suspense } from "react";
import LoadingScreen from "./components/loading";
import Link from "next/link";
import EmailList from "./components/emailList/emailList";


export default function Home() {
  /*const [visited, setVisited] = useState(false);
  
  useEffect(() => {
      
  }, []);*/
  
  return (
    <>
    <Transition>
    <main className="flex justify-center w-screen grid grid-cols-8">
      <div className="grid grid-rows-2 grid-flow-col col-span-8">
        <div className="flex justify-center items-center h-[100vh] w-full row-start-1 row-end-3 row-span-2 overflow-hidden">
          {/*<ImgHolder 
            imgSrc={`/media/cover/home/s_k_pointnlook.JPG`}
            altText={`Image of woshi cat models pointing and looking at the distance`}
          />*/}
          {/* Upload and replace video link */}
          <video className="w-[100vw] object-cover min-h-full" autoPlay loop muted playsInline={false} data-v-f518367b=""><source src="/media/video/Z06_1930.MP4" type="video/mp4" data-v-f518367b="" /></video> 
        </div>
      </div>
      
      <div className="col-span-8 w-screen h-fit flex justify-center items-center text-center mt-8">
        <div className="w-1/2 h-fit flex justify-center items-center">
          <Image
            src={'/media/misc/woshicat_script2b.png'}
            width={350}
            height={350}
            alt={'Chinese Phonetics: Wo Shi Cat'}
          />
        </div>
      </div>
      <div className="col-span-8 w-screen text-xl font-thin flex justify-center items-center text-center">
        <div className="p-8 w-1/2">Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge: A Salary Cat in a human world.
        
        </div>
      </div>
      
      <div className="grid col-span-8">
        <Suspense fallback={<LoadingScreen />}>
        
        <div className="flex h-[100vh] w-screen grid grid-cols-2 text-white">
          <div className="relative flex justify-start items-center">
            <Link href={'/collections/shirts/'}>
              <Image
                src={'/media/collection_page_covers/s_k_pointnlook.JPG'}
                fill={true}
                alt={'Shirts'}
                className="object-cover"
              />
              <div className="absolute bottom-0 p-8">shop shirts</div>
            </Link>
          </div>
          <div className="relative flex justify-start items-center bg-black/50">
            <Link href={'/collections/accessories/'}>
              <Image
                src={'/media/yoyo_yellow_sticker.png'}
                fill={true}
                alt={'Accesories'}
                className="object-cover"
              />
              <div className="absolute bottom-0 p-8">shop accessories</div>
            </Link>
          </div>
          
        </div>
        </Suspense>
      </div>
      {/* */}
      <div className="col-span-8 flex justify-center items-center bg-stone-50 min-h-full p-8">
        <EmailList />
      </div>
      
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}