'use client';

import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import Link from "next/link";
//import EmailList from "./components/emailList/emailList"; need to figure this out, is in woshicatv3.zip
import ShopNowButton from "./components/ShopNowButton";


const Home = () => {
  
  return (
    <>
    <Transition>
    <main className="relative flex justify-center w-screen grid grid-cols-9">
      <div className="col-span-9 w-full h-fit flex justify-center items-center bg-orange-100">
        <p className="m-1 font-thin max-sm:text-sm">Free shipping and sticker on orders over $70!</p>
      </div>
      <div className="relative grid grid-flow-col col-span-9">
        <div className="flex justify-center items-center h-[90vh] w-full overflow-hidden">
          {/* Upload and replace video link */}
          <video className="w-[100vw] object-cover min-h-full" autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"><source src="/media/video/Z06_1930.MP4" type="video/mp4" data-v-f518367b="" /></video> 
        </div>
        <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/15 w-full h-full"/>
      </div>
      
      <section className="w-screen">
        <div className="col-span-9 w-screen h-fit flex justify-center items-center text-center">
          <div className="w-1/2 h-fit flex justify-center items-center">
            <Image
              src={'/media/misc/woshicat_script2b.png'}
              width={400}
              height={1}
              alt={'Chinese Phonetics: Wo Shi Cat'}
            />
          </div>
        </div>
        <div className="col-span-9 w-screen md:text-xl font-thin flex flex-col justify-center items-center text-center mb-8">
          <p className="text-2xl font-bold">{`Breaking the cycle, day by day.`}</p>
          <div className="p-3 md:w-1/2">
          {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge: A salarycat in a human world.`}
          </div>
        </div>
      </section>
      <div className="w-full mx-auto col-span-9 grid grid-cols-9">
        <div className="relative col-span-9 md:col-span-3 aspect-square overflow-hidden flex items-end">
          <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank">
            {/* <video className="object-cover" autoPlay={true} muted loop preload="metadata">
              <source src="/media/video/WoShi_Insta_Train_Post.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <Image
              src={'/media/homepage/Alvin-WoshiCat-11.jpeg'}
              alt={'A guy sitting on a ledge, wearing the 5:06 Train Shirt'}
              fill={true}
              className="object-cover"
            />
            <div className="absolute top-0 right-0 w-full text-white h-full flex justify-end items-center p-8 bg-black/50 hover:bg-black/80 text-3xl md:text-xl transition duration-300 gap-4">
              <div className="flex flex-col text-end">
                <p>follow us for updates</p>
                <p>@woshicatofficial</p>
              </div>
              <Image 
                src={'/logo/instagram-white.svg'}
                alt={'Instagram - WoShi Cat Official!'}
                className=""
                width={40}
                height={1}
              />
              
            </div>
          </Link>
        </div>
        <div className="button-hover relative col-span-9 md:col-span-6 overflow-hidden md:aspect-[2/1] aspect-square"> {/* Remember to change back to square when we have more collections! */}
          <Link href={'/collections/metro-daydreams/'}>
            <div className="">
              <video className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"><source src="/media/homepage/Woshi Homepage Video.mp4" type="video/mp4" data-v-f518367b="" /></video> 
              
            </div>
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5 md:w-3/5 z-[100]">
              <h2 className="text-xl md:text-4xl ">Metro Daydreams</h2>
              <ShopNowButton />
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/15 w-full h-full"/>
          </Link>
        </div>
        {/* Next segment */}
      </div>  
      {/* */}
      <div className="col-span-9 flex justify-center items-center bg-stone-50 min-h-fit pt-8">
        {/* <EmailList /> */}
        
      </div>
      
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}

export default Home;