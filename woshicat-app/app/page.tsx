'use client';

import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import { useState, useEffect } from "react";
import Link from "next/link";
import EmailList from "./components/emailList/emailList";
import ShopNowButton from "./components/ShopNowButton";


export default function Home() {
  const [visited, setVisited] = useState(false);
  
  useEffect(() => {
      
  }, []);
  
  return (
    <>
    <Transition>
    <main className="relative flex justify-center w-screen grid grid-cols-9">
      <div className="col-span-9 w-full h-fit flex justify-center items-center bg-orange-100">
        <p className="m-1 font-thin">Free shipping on orders over $70!</p>
      </div>
      <div className="grid grid-flow-col col-span-9">
        <div className="flex justify-center items-center h-[100vh] w-full overflow-hidden">
          {/* Upload and replace video link */}
          <video className="w-[100vw] object-cover min-h-full" autoPlay loop muted playsInline={false} data-v-f518367b=""><source src="/media/video/Z06_1930.MP4" type="video/mp4" data-v-f518367b="" /></video> 
        </div>
      </div>
      
      <div className="col-span-9 w-screen h-fit flex justify-center items-center text-center mt-8">
        <div className="w-1/2 h-fit flex justify-center items-center">
          <Image
            src={'/media/misc/woshicat_script2b.png'}
            width={400}
            height={1}
            alt={'Chinese Phonetics: Wo Shi Cat'}
          />
        </div>
      </div>
      <div className="col-span-9 w-screen md:text-xl font-thin flex justify-center items-center text-center mb-12">
        <div className="p-8 md:w-1/2 border-b">Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge: A Salary Cat in a human world.
        
        </div>
      </div>
      
      <div className="relative col-span-9 md:col-span-3 aspect-square overflow-hidden mx-2">
        {/* <Link href={'/collections/metro-daydreams/'}> */}
          <div className="button-hover">
          <video className="object-cover -translate-y-20" autoPlay={true} muted loop preload="none">
            <source src="/media/video/WoShi_Insta_Train_Post.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
            
          </div>
        {/* </Link> */}
      </div>
      <div className="relative col-span-9 md:col-span-3 aspect-square mx-2">
        <Link href={'/collections/metro-daydreams/'}>
          <div className="button-hover">
              <Image
                src={'/media/collection_page_covers/s_k_pointnlook.JPG'}
                fill={true}
                alt={'Metro DayDreams Collection'}
                className="object-cover"
              />
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/25 w-4/5">
                <h2 className="md:text-4xl ">Metro Daydreams</h2>
                <ShopNowButton />
              </div>
          </div>
        </Link>
      </div>
      <div className="relative col-span-9 md:col-span-3 aspect-square mx-2">
        <Link href={'/collections/woshi-cat/'}>
          <div className="button-hover">
              <Image
                src={'/media/graphics/WoShi_Coming_Soon.png'}
                fill={true}
                alt={'The WoShi Cat Collection'}
                className="object-cover"
              />
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/25 w-4/5">
                <h2 className="md:text-4xl ">WoShi Cat Collection</h2>
                <ShopNowButton />
              </div>
          </div>
        </Link>
      </div>
      
      {/* */}
      <div className="col-span-9 flex justify-center items-center bg-stone-50 min-h-full p-8">
        {/*<EmailList />*/}
        
      </div>
      
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}