'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TwoOneRect from "./components/bento-layout/two-one-rect";
import ShopNowButton from "./components/ShopNowButton";
import CollectionListing from "./components/collection-listings/collectionListing";
import { getFeaturedCollectionHelper } from "./server_actions/action";
import ScrollingCarousel from "./components/carousels/Carousel";
import AutoCarousel from "./components/carousels/autoCarousel";
import Loader from "./components/transitions-navigation/LoadingScreen";
import Notice from "./components/messageUpdates/websiteNotice";
// import VideoHero from "./components/ProductComps-Layouts/videoHero"; work in progress

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
      {/* Promotion Graphic Popup, need to figure out better way to flag. manual for now. */}
      {/* <Notice /> */}

      {/* Top of website */}
      <div className="relative col-span-9">
        <AutoCarousel>
          {/* Fall 2025 Drop Sweater/Hoodie */}
          <div className="flex relative justify-center items-center h-[100vh] w-screen">
            <video 
              className="object-cover xl:w-full max-xl:h-full" 
              autoPlay 
              loop 
              muted 
              playsInline={true} 
              data-v-f518367b="" 
              preload="metadata"
              
            >
                <source src="https://cdn.shopify.com/videos/c/o/v/a3d1138f7a52457ead9278adff9de19a.mp4" type="video/mp4" data-v-f518367b="" />
            </video> 
            <Link className="button-hover flex items-center justify-center absolute bottom-0 left-0 font-thin text-white w-full h-full p-12" href="/collections">
              <div className="relative z-[100] h-full w-full lg:w-2/4 p-2 w-full flex flex-col items-center justify-center text-xl lg:text-3xl font-bold text-center gap-2 pointer-events-none">
                <section className="w-full flex justify-center">
                  {/* <Image 
                    src="/logo/Singularity logo light.png"
                    alt="Logo for Singularity, our Fall 2025 Drop"
                    width={2000}
                    height={1}
                    className="w-full object-contain"
                  /> */}
                  <p className="text-3xl lg:text-6xl">{`COMING SOON`}</p>
                </section>
                <p className="">{`FALL 2025`}</p>
                
              </div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/35 hover:bg-black/60 transition duration-300 flex justify-center items-center" />
            </Link>
          </div>

          {/* Metro Daydreams */}
          <div className="flex relative justify-center items-end h-[100vh] w-screen">
            <video 
              className="object-cover xl:w-full max-xl:h-full" 
              autoPlay 
              loop 
              muted 
              playsInline={true} 
              data-v-f518367b="" 
              preload="metadata"
            >
                <source src="https://cdn.shopify.com/videos/c/o/v/002d5285f13644a3a4b4ae49a2dc2d8e.mov" type="video/mp4" data-v-f518367b="" />
            </video> 
            <Link className="button-hover flex flex-col items-center justify-center absolute bottom-0 left-0 text-white w-full h-full p-12" href="/collections/metro-daydreams">
              <div className="w-full lg:w-2/4 h-full flex flex-col justify-center items-center text-2xl text-center lg:text-5xl font-bold z-[100] gap-2 pointer-events-none mx-auto">
                <section className="w-full flex justify-center items-center gap-6">
                  <div className="flex justify-center items-center">
                    <Image 
                      src="/logo/Logo Red Version Clean.png"
                      alt="WoShi Cat Seal Logo in white"
                      width={80}
                      height={1}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="text-start">
                    <p>{`METRO`}</p>
                    <p>{`DAYDREAMS`}</p>
                  </div>
                </section>
              </div>
              <div className="z-[100] h-20 flex items-end justify-center font-bold mb-20">
                <ShopNowButton />
              </div>
              <div className="absolute bottom-0 left-0 w-screen h-full bg-black/35 hover:bg-black/60 transition duration-300 flex justify-center items-center" />
            </Link>
          </div>
        </AutoCarousel>
        
      </div>

      <section className="relative flex flex-col w-full mx-auto col-span-9 mb-4">
        <div className="w-full flex">
          <Image
            src={'/media/corner-bright.png'}
            width={120}
            height={1}
            alt="Chinese style corner frame decoration/design"
            className="mb-auto"
          />
        </div>
        <div className="w-full h-fit flex justify-center items-center text-center">
          <div className="w-full md:w-4/5 h-fit flex flex-col justify-center items-center">
            <Image
              src={'/media/misc/woshicat_script2b.png'}
              width={400}
              height={1}
              alt={'Chinese Phonetics: Wo Shi Cat'}
            />
            <div className="w-full md:text-2xl flex flex-col justify-center items-center text-center p-2">
              <p className="text-2xl md:text-3xl font-bold">{`Breaking the cycle, day by day.`}</p>
              <div className="">
              {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge? Navigating the human world as a salarycat.`}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <Image
            src={'/media/corner-bright.png'}
            width={120}
            height={1}
            alt="Chinese style corner frame decoration/design"
            className="mt-auto ms-auto rotate-180"
          />
        </div>
      </section>

      <div className="w-full md:w-4/5 col-span-9 mx-auto gap-2 ps-1 text-3xl font-normal">
        {`Featured Arrivals`}
      </div>
      <div className="w-full md:w-4/5 col-span-9 grid grid-cols-9 mb-6 mx-auto gap-2 px-1">
        {/* Featured Collection */}
          {featured[0] ? (
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
          ) : (
          <div className="object-contain relative col-span-9 md:col-span-6 w-full overflow-hidden flex justify-center items-center">
            <Loader />
          </div>
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
        <Link href="/collections" className="w-full text-3xl font-normal ps-1">
          {`Yoyo's Collection List`}
        </Link>
        
        <div className="w-full mx-auto flex">
          {/* Begin section */}
            <ScrollingCarousel addClass="" numPerSlide={3} mobileSlide={1} length={3} type={'collection'}>
              <CollectionListing addClass="w-full h-full px-1"/>
            </ScrollingCarousel>
          {/* End section */}
        </div>
      </div>
    </main>
    </>
  );
}

export default Home;