'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TwoOneRect from "./components/bento-layout/two-one-rect";
import ShopNowButton from "./components/ShopNowButton";
import CollectionListing from "./components/collection-listings/collectionListing";
import { getFeaturedCollectionHelper } from "./server_actions/action";
import AutoCarousel from "./components/carousels/autoCarousel";
import Loader from "./components/transitions-navigation/LoadingScreen";
import Notice from "./components/messageUpdates/websiteNotice";
import FeaturedCards from "./components/ProductComps-Layouts/featured-cards";
// import VideoHero from "./components/ProductComps-Layouts/videoHero"; work in progress

const Home = () => {
  const [featured, setFeatured] = useState<any[]>([]);
  
  useEffect(() => {
    const getFeaturedCollection = async () => {
      const featured = await getFeaturedCollectionHelper();
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
      <div className={`relative col-span-9 sticky top-0 transition transition-all duration-500 ease-in-out`}
      >
        <AutoCarousel>
          {/* Taiji - Fall 2025 */}
          <div className="flex relative justify-center items-center h-screen w-screen">
            <video className={`object-cover h-full w-full z-[-1]`}
              autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"
            >
                <source src="https://cdn.shopify.com/videos/c/o/v/a3d1138f7a52457ead9278adff9de19a.mp4" type="video/mp4" data-v-f518367b="" />
            </video> 
            <Link className="button-hover flex items-center justify-center absolute bottom-0 left-0 font-thin text-white w-full h-full p-12" href="/collections">
              <div className="relative h-full w-full lg:w-2/4 p-2 flex flex-col items-center justify-center font-bold text-center gap-2 pointer-events-none z-1">
                <section className="w-full flex justify-center ">
                  {/* <Image 
                    // REPLACE WITH TAIJI LOGO
                    src="/logo/Singularity logo light.png"
                    alt="Logo for Taiji, our Fall 2025 Drop"
                    width={2000}
                    height={1}
                    className="w-4/5 object-contain"
                  /> */}
                  <p className="text-3xl lg:text-6xl">{`COMING SOON`}</p>
                </section>
                <div className="text-center">
                  <p className="text-xl lg:text-2xl">{`WINTER SEASON DROP`}</p>
                </div>
                
              </div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/35 hover:bg-black/60 transition duration-300 flex justify-center items-center" />
            </Link>
          </div>

          {/* Metro Daydreams */}
          <div className="flex relative justify-center items-end h-screen w-screen">
            <video className="object-cover h-full w-full z-[-1]" 
              autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"
            >
                <source src="https://cdn.shopify.com/videos/c/o/v/002d5285f13644a3a4b4ae49a2dc2d8e.mov" type="video/mp4" data-v-f518367b="" />
            </video> 
            <Link className="button-hover flex flex-col items-center justify-center absolute bottom-0 left-0 text-white w-full h-full p-12" href="/collections/metro-daydreams">
              <div className="w-full lg:w-2/4 h-full flex flex-col justify-center items-center text-2xl text-center lg:text-5xl font-bold z-100 gap-2 pointer-events-none mx-auto">
                <section className="w-full flex justify-center items-center gap-6">
                  <div className="flex justify-center items-center overflow-hidden">
                    <Image 
                      src="/logo/Logo Red Version Clean.png"
                      alt="WoShi Cat Seal Logo in white"
                      width={80}
                      height={1}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="text-start z-[-1]">
                    <p>{`METRO`}</p>
                    <p>{`DAYDREAMS`}</p>
                  </div>
                </section>
              </div>
              <div className="z-100 h-20 flex items-end justify-center font-bold mb-20 z-[-1]">
                <ShopNowButton />
              </div>
              <div className="absolute bottom-0 left-0 w-screen h-full bg-black/35 hover:bg-black/60 transition duration-300 flex justify-center items-center z-[-1]" />
            </Link>
          </div>
        </AutoCarousel>
        
      </div>
      
      <div className="relative flex flex-col w-full mx-auto col-span-9 bg-white/95 rounded-lg">
        {/* Mid page Yoyo inspiration */}
        <section className="relative flex flex-col w-full mx-auto col-span-9 mb-4">
          <div className="w-full flex justify-start overflow-hidden">
            <Image
              src={'/media/corner-bright.png'}
              width={120}
              height={1}
              alt="Chinese style corner frame decoration/design"
              className=""
            />
          </div>
          <div className="w-full h-fit flex justify-center items-center text-center">
            <div className={`w-full lg:w-[90vw] h-fit flex flex-col justify-center items-center`}>
              <Image
                src={'/media/misc/woshicat_script2b.png'}
                width={400}
                height={1}
                alt={'Chinese Phonetics: Wo Shi Cat'}
                className="image"
              />
              <div className="w-full md:text-2xl flex flex-col justify-center items-center text-center p-2">
                <p className="text-2xl md:text-3xl font-bold">{`Breaking the cycle, day by day.`}</p>
                <div className="">
                {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge? Navigating the human world as a salarycat.`}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Image
              src={'/media/corner-bright.png'}
              width={120}
              height={1}
              alt="Chinese style corner frame decoration/design"
              className="rotate-180"
            />
          </div>
        </section>

        {/* Featured Collection Header */}
        <div className={`relative w-full lg:w-[90vw] col-span-9 mx-auto gap-2 mb-2 text-5xl font-normal flex flex-col`}>
          <h3 className="ps-1">{`Featured Arrivals`}</h3>
          {/* Featured Collection Display */}
          <div className={`relative w-full grid grid-cols-10 mb-10 mx-auto rounded-lg gap-1`}>
            {featured[0] ? (
              <>
                <TwoOneRect
                link={`/collections/${featured[0].handle}`}
                collectionName={`${featured[0].title}`}
                >
                  <Image 
                    className="object-cover w-full h-full" 
                    src={featured[0].imgSrc} 
                    alt={featured[0].imgAlt || 'Photo of featured collection'} 
                    fill={true}
                  />
                </TwoOneRect>
              </>
            ) : (
            <div className="object-contain relative col-span-10 md:col-span-5 w-full overflow-hidden flex justify-center items-center">
              <Loader />
            </div>
          )}
            <div className="relative col-span-10 md:col-span-5 h-full overflow-hidden rounded-lg flex items-center aspect-[3/2] md:aspect-[9/10]">
              <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank" className="h-full w-full">
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
      </div>

        {/* Collection Carousel Display */}
        <div className={`w-full lg:w-[90vw] col-span-9 mx-auto mb-10`}>
          {/* Rest of the Collections */}
          <Link href="/collections" className="w-full text-5xl font-normal ps-1 mb-2">
            {`Yoyo's Collection List`}
          </Link>
          
          <div className="relative w-full mx-auto flex">
            {/* Begin section */}
              <CollectionListing addClass="w-full h-full"/>
            {/* End section */}
          </div>
        </div>

        {/* Product Showcase */}
        {/* <div className={`relative w-full col-span-9 mb-10 mx-auto flex flex-col justify-center items-center`}>
          <div className="relative w-full lg:w-[90%] h-fit mb-2 mx-auto">
            <Link href="/collections" className="flex w-full text-5xl font-normal ps-1">
              {`Benji's Styling Inspo`}
            </Link>
          </div>
          <FeaturedCards folder="styling-inspiration" auto={true}/>
        </div> */}
      </div>
    </main>
    </>
  );
}

export default Home;