'use client';

import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import Link from "next/link";
import EmailList from "./components/emailList/emailList";
import ShopNowButton from "./components/ShopNowButton";


const Home = () => {
  
  return (
    <>
    <Transition>
    <main className="relative flex justify-center w-screen grid grid-cols-9">
      <div className="col-span-9 w-full h-fit flex justify-center items-center bg-orange-100">
        <p className="m-1 font-thin max-sm:text-sm">Free shipping and sticker on orders over $70!</p>
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
      
      <div className="relative col-span-9 md:col-span-3 aspect-square overflow-hidden mx-1 flex items-end">
        <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank">
          <video className="object-cover" autoPlay={true} muted loop preload="none">
            <source src="/media/video/WoShi_Insta_Train_Post.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </Link>
      </div>
      <div className="button-hover relative col-span-9 md:col-span-6 overflow-hidden max-md:aspect-square mx-1"> {/* Remember to change back to square when we have more collections! */}
        <Link href={'/collections/metro-daydreams/'}>
          <div className="">
              <Image
                src={'/media/collection_page_covers/s_k_pointnlook.JPG'}
                fill={true}
                alt={'Metro DayDreams Collection'}
                className="object-cover"
              />
            
          </div>
          <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/25 w-4/5 md:w-3/5">
              <h2 className="text-xl md:text-4xl ">Metro Daydreams</h2>
              <ShopNowButton />
            </div>
        </Link>
      </div>
      {/* Next segment */}
      
      {/* */}
      <div className="col-span-9 flex justify-center items-center bg-stone-50 min-h-fit pt-8">
        <EmailList />
        
      </div>
      
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}

export default Home;