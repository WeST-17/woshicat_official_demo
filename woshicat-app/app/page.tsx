'use client';
import { useState } from "react";

import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import Link from "next/link";
import ShopNowButton from "./components/ShopNowButton";
import AutoCarousel from "./components/autoCarousel";
import Popup from "./components/popups/popupCard";


const homeBanner = [
  `Free shipping and one random sticker on orders over $50!`,
  `Get 10% off your order with the code YOYO10`,
  `Get our new 2025 Lunar New Year collection!`,
];

const Home = () => {
  const [promo, setPromo] = useState<boolean>(false);

  return (
    <>
    <Transition>
    <main className="relative flex justify-center w-full grid grid-cols-9">
      <div className="text-center col-span-9 w-full h-fit flex-col justify-center items-center">
        <Link href="https://woshicat.com/collections/lunar-new-year/" target="_blank" className="w-full">
          <AutoCarousel messages={homeBanner}/>
        </Link>
      </div>
      <div className="relative grid grid-flow-col col-span-9">
        <div className="flex justify-center items-center h-[90vh] w-full overflow-hidden">
          {/* Upload and replace video link */}
          <video 
            className="w-full object-cover h-full" 
            autoPlay 
            loop 
            muted 
            playsInline={true} 
            data-v-f518367b="" 
            preload="metadata"
          >
              <source src="/media/homepage/Woshi Homepage Video 2.mov" type="video/mp4" data-v-f518367b="" />
          </video> 
        </div>
        <div className="absolute bottom-0 left-0 font-thin text-white w-full h-full"/>
      </div>
      
      <section className="w-full">
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
          {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge? Navigating the human world as a salarycat.`}
          </div>
        </div>
      </section>
      <div className="w-full col-span-9 grid grid-cols-9 mb-6 mx-auto gap-2 p-2">
        {/* Change to Lunar New Year 2025 */}
        <div className="button-hover relative col-span-9 md:col-span-6 overflow-hidden md:aspect-[2/1] aspect-square"> {/* Remember to change back to square when we have more collections! */}
          <Link href={'/collections/lunar-new-year/'}>
            <div className="">
              <Image 
                className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
                src={'/media/LNY2025/dome of light.jpg'} 
                alt={'photo of guy in the Taiwan Dome of Light'} 
                fill={true}
              />
              
            </div>
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5 z-[100]">
              <h2 className="text-3xl ">Lunar New Year - 2025</h2>
              <ShopNowButton />
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/15 w-full h-full"/>
          </Link>
        </div>
        
        <div className="relative col-span-9 md:col-span-3 aspect-square h-full overflow-hidden flex items-end">
          <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank">
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
      </div>

      {/* Rest of the Collections */}
      <Link href="/collections" className="w-full col-span-9 text-3xl font-normal p-8">{`Yoyo's Collection List`}</Link>
      <div className="w-full mx-auto col-span-9 grid grid-cols-9 mb-3 p-2 gap-2">
        {/* Metro Daydreams */}
        <div className="h-full button-hover relative col-span-9 md:col-span-3 overflow-hidden aspect-square"> {/* Remember to change back to square when we have more collections! */}
          <Link href={'/collections/metro-daydreams/'}>
            <div className="">
              <video className="aspect-square object-cover h-full w-full absolute top-0 left-0 bottom-0 right-0" autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"><source src="/media/homepage/Woshi Homepage Video.mp4" type="video/mp4" data-v-f518367b="" /></video> 
              
            </div>
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5 z-[100]">
              <h2 className="text-3xl ">Metro Daydreams</h2>
              <ShopNowButton />
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/15 w-full h-full"/>
          </Link>
        </div>

        {/* Lunar New Year 2025 */}
        <div className="h-full button-hover relative col-span-9 md:col-span-3 overflow-hidden aspect-square"> {/* Remember to change back to square when we have more collections! */}
          <Link href={'/collections/lunar-new-year/'}>
            <div className="">
              <Image 
                className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
                src={'/media/collections-page/uniq bag pin.jpeg'} 
                alt={'photo of guy in the Taiwan Dome of Light'} 
                fill={true}
              />
              
            </div>
            <div className="absolute bottom-0 left-0 p-3 m-3 font-thin text-white bg-black/45 w-4/5 z-[100]">
              <h2 className="text-3xl ">Lunar New Year - 2025</h2>
              <ShopNowButton />
            </div>
            <div className="absolute bottom-0 left-0 font-thin text-white bg-amber-50/15 w-full h-full"/>
          </Link>
        </div>
      </div>  

      {promo && 
        (
        <Popup 
          PromoLink="" 
          imgSrc="/media/homepage/woshi-hermanpark-05.jpg" 
          imgAlt="Two people sitting on a window ledge in a park" 
          promoDesc="Add description here" 
          code="Add Promo Here"/>
        )
      }
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}

export default Home;