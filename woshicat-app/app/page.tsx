'use client';

import Image from "next/image";
import TransitionSlide from "./components/transitionWipe";
import Transition from "./components/transition";
import Link from "next/link";
import AutoCarousel from "./components/autoCarousel";
import Popup from "./components/popups/popupCard";
import Square from "./components/bento-layout/square";
import TwoOneRect from "./components/bento-layout/two-one-rect";
import ShopNowButton from "./components/ShopNowButton";


const homeBanner = [
  `Free shipping and one random sticker on orders over $50!`,
  `Sign up for our newsletter and get a discount code!`,
];

const Home = () => {

  return (
    <>
    <Transition>
    <main className="relative flex justify-center w-full grid grid-cols-9">
      <div className="text-center col-span-9 w-full h-fit flex-col justify-center items-center">
        <Link href="https://woshicat.com/collections/" target="_blank" className="w-full">
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
        
        <Link className="button-hover flex items-end justify-center absolute bottom-0 left-0 font-thin text-white w-full h-full p-12"
        href="/collections">
          <ShopNowButton />
          <div className="absolute bottom-0 left-0 w-full h-full hover:bg-black/30 transition duration-300"/>
        </Link>
        
      </div>
      
      <section className="w-full md:w-4/5 mx-auto col-span-9">
        <div className="w-full h-fit flex justify-center items-center text-center">
          <div className="w-1/2 h-fit flex justify-center items-center">
            <Image
              src={'/media/misc/woshicat_script2b.png'}
              width={400}
              height={1}
              alt={'Chinese Phonetics: Wo Shi Cat'}
            />
          </div>
        </div>
        <div className="w-full md:text-xl font-thin flex flex-col justify-center items-center text-center mb-12">
          <p className="text-2xl font-bold">{`Breaking the cycle, day by day.`}</p>
          <div className="p-3 md:w-4/5">
          {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge? Navigating the human world as a salarycat.`}
          </div>
        </div>
      </section>

      <div className="w-full md:w-4/5 col-span-9 mx-auto gap-2 text-3xl font-normal">
        {`Featured Arrivals`}
      </div>
      <div className="w-full md:w-4/5 col-span-9 grid grid-cols-9 mb-6 mx-auto gap-2 p-2">
        {/* Lunar New Year 2025 */}
        <TwoOneRect
          link={`/collections/stationary-and-accessories`}
          collectionName="Stationary and Accessories"
        >
          <Image 
            className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
            src={'/media/stationary-page/apr2025_506print1.jpg'} 
            alt={'A studio style photo of the WoShi Cat 5:06 Train Print'} 
            fill={true}
          />
        </TwoOneRect>
        
        <div className="relative col-span-9 md:col-span-3 aspect-square h-full overflow-hidden flex items-end">
          <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank">
            <Image
              src={'/media/homepage/Alvin-WoshiCat-11.jpeg'}
              alt={'A guy sitting on a ledge, wearing the 5:06 Train Shirt'}
              fill={true}
              className="object-cover"
            />
            <div className="absolute top-0 right-0 w-full text-white h-full flex flex-col justify-center items-center p-8 bg-black/50 hover:bg-black/80 text-3xl md:text-xl transition duration-300 gap-4">
              <div className="flex flex-col text-center">
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

      <div className="w-full md:w-4/5 col-span-9 mx-auto">
        {/* Rest of the Collections */}
        <Link href="/collections" className="w-full text-3xl font-normal">
          {`Yoyo's Collection List`}
        </Link>
        
        <div className="w-full mx-auto grid grid-cols-9 mb-3 p-2 gap-2">
          {/* Metro Daydreams */}
          <Square
            link={'/collections/metro-daydreams/'}
            collectionName={`Metro Daydreams`}
          > 
            <Image 
              className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
              src={'/media/homepage/woshi-hermanpark-05.jpg'} 
              alt={'photo of our lion dance pin on a bag'} 
              fill={true}
            />
          </Square>

          {/* Lunar New Year 2025 */}
          <Square
            link={`/collections/lunar-new-year`}
            collectionName={`Lunar New Year - 2025`}
          >
            <Image 
              className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
              src={'/media/collections-page/uniq bag pin.jpeg'} 
              alt={'photo of our lion dance pin on a bag'} 
              fill={true}
            />
          </Square>

          {/* Stationary and Accessories */}
          <Square
            link={'/collections/stationary-and-accessories/'}
            collectionName={`Stationary and Accessories`}
          > 
            <Image 
              className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
              src={'/media/stationary-page/apr2025_506print.jpg'} 
              alt={'picture of our 506 train print close up on caligraphy'} 
              fill={true}
            />
          </Square>
        </div>  
      </div>

      <Popup 
        PromoLink="https://www.tokyonightfest.com/" 
        imgSrc="" 
        video="/logo/tokyox2025/VERTICAL LAST 123.mp4"
        imgAlt="Tokyo X Promotion Video Showcase." 
        promoDesc={
          `
          Catch us at Tokyo X on June 14-15!!
          
          `} 
        code="@NRG Center - Houston, TX"
        extra="/logo/tokyox2025/Logo 2025.png"
        on={true}
      />
    </main>
    </Transition>
    <TransitionSlide />
    </>
  );
}

export default Home;