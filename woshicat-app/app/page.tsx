'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AutoCarousel from "./components/carousels/autoCarousel";
import Popup from "./components/popups/popupCard";
import TwoOneRect from "./components/bento-layout/two-one-rect";
import ShopNowButton from "./components/ShopNowButton";
import CollectionListing from "./components/collection-listings/collectionListing";
import { getFeaturedCollectionHelper } from "./server_actions/action";
import ScrollingCarousel from "./components/carousels/Carousel";

const homeBanner = [
  `Free shipping and one random sticker on orders over $50!`,
  `Sign up for our newsletter and get a 10% off code!`,
  `Our team will be out until August 5th. Please expect shipping delays when ordering.`
];

const Home = () => {
  const [featured, setFeatured] = useState<any[]>([]);
  
  useEffect(() => {
    const getFeaturedCollection = async () => {
      const featured = await getFeaturedCollectionHelper();
      console.log(featured)
      if (featured) {
        setFeatured(featured);
      } else {
        console.log("couldn't get featured collection...");
      }
    }
    getFeaturedCollection();
  }, [])

  return (
    <>
    <main className="relative flex justify-center w-full grid grid-cols-9">
      <div className="absolute top-0 text-center col-span-9 w-full h-fit flex-col justify-center items-center">
        <AutoCarousel messages={homeBanner} link="https://manage.kmail-lists.com/subscriptions/subscribe?a=U8rDsa&g=YvUXMs"/>
      </div>
      <div className="relative grid grid-flow-col col-span-9">
        <div className="flex justify-center items-center h-[91vh] w-full overflow-hidden">
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
              <source src="https://cdn.shopify.com/videos/c/o/v/002d5285f13644a3a4b4ae49a2dc2d8e.mov" type="video/mp4" data-v-f518367b="" />
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
      <div className="w-full md:w-4/5 col-span-9 grid grid-cols-9 mb-6 mx-auto gap-2 px-1">
        {/* Featured Collection */}
        {featured[0] && (
          <TwoOneRect
          link={`/collections/${featured[0].handle}`}
          collectionName={`${featured[0].title}`}
          >
            <Image 
              className="max-md:aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
              src={featured[0].imgSrc} 
              alt={featured[0].imgAlt || 'Photo of featured collection'} 
              fill={true}
            />
          </TwoOneRect>
        )}
        
        <div className="relative col-span-9 md:col-span-3 aspect-[9/10] h-full overflow-hidden flex items-center">
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

      <div className="w-full md:w-4/5 col-span-9 mx-auto mb-6">
        {/* Rest of the Collections */}
        <Link href="/collections" className="w-full text-3xl font-normal">
          {`Yoyo's Collection List`}
        </Link>
        
        <div className="w-full mx-auto flex">
          {/* Begin section */}
            <ScrollingCarousel addClass="" numPerSlide={3} length={3} type={'collection'}>
              <CollectionListing addClass="w-full h-full px-1"/>
            </ScrollingCarousel>
          {/* End section */}
        </div>
      </div>

      <Popup 
        PromoLink="/" 
        imgSrc="/media/graphics/Yoyo happy.png" 
        video=""
        imgAlt="" 
        promoDesc={
          `
          Hi team! I'm currently out of office on PTO and will be back on Aug 5th. Please expect shipping delays until then.
          `} 
        promoDescLine2="Thanks, Yoyo"
        code=""
        extra=""
        on={true}
      />
    </main>
    </>
  );
}

export default Home;