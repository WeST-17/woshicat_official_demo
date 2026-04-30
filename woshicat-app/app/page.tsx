'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TwoOneRect from "./components/bento-layout/two-one-rect";
import ShopNowButton from "./components/ShopNowButton";
import CollectionListing from "./components/collection-listings/collectionListing";
import { featuredProductsHelper, getFeaturedCollectionHelper } from "./server_actions/action";
import AutoCarousel from "./components/carousels/autoCarousel";
import Loader from "./components/transitions-navigation/LoadingScreen";
import FadeInImage from "./components/transitions-navigation/FadeInImages";
// import Notice from "./components/messageUpdates/websiteNotice";
import FeaturedPhotos from "./components/ProductComps-Layouts/featured-cards";
// import VideoHero from "./components/ProductComps-Layouts/videoHero"; work in progress
import { DarkMode } from "./components/toggles/Dark_Mode/darkModeContext";

const Home = () => {
  const [featured, setFeatured] = useState<any[]>([]);
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const { darkMode } = DarkMode();

  const currFormat = new Intl.NumberFormat('default', {
    style: 'currency',
    currency: 'USD',
  });
  
  useEffect(() => {
    const getFeaturedProducts = async (handle: string) => {
      const featuredProducts = await featuredProductsHelper(handle);
      if (featuredProducts) {
        setFeaturedItems(featuredProducts);
        //console.log(featuredProducts);
      } else {
        console.log(`couldn't get products from the featured collection...`)
      }
    }
    
    const getFeaturedCollection = async () => {
      const featuredCollection = await getFeaturedCollectionHelper();
      if (featuredCollection[0]) {
        setFeatured(featuredCollection);
        getFeaturedProducts((featuredCollection[0] as any).handle);
      } else {
        console.log(`couldn't get featured collection...`);
      }
    }
    
    getFeaturedCollection();
    return () => { console.log("unmount / cleanup") };
  }, [])

  return (
    <>
    <main className="relative flex justify-center w-full grid grid-cols-9">
      {/* Promotion Graphic Popup, need to figure out better way to flag. manual for now. */}
      {/* <Notice /> */}

      {/* Top of website */}
      <div className={`relative col-span-9 sticky top-0 transition transition-all duration-800 ease-in-out`}
      >
        <AutoCarousel>
          {/* Taiji - Fall 2025 */}
          <div className="flex relative justify-center items-center h-screen w-screen">
            <video className={`object-cover h-full w-full z-[-1]`}
              autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"
            >
                <source src="https://cdn.shopify.com/videos/c/o/v/a3d1138f7a52457ead9278adff9de19a.mp4" type="video/mp4" data-v-f518367b="" />
            </video> 
            <Link className="button-hover flex flex-col items-center justify-center absolute bottom-0 left-0 text-white w-full h-full p-12" href="/collections/taiji">
              <div className="relative h-full w-full lg:w-2/4 p-2 flex flex-col items-center justify-center font-bold text-center gap-10 pointer-events-none z-1">
                <section className="w-full flex justify-center ">
                  <Image 
                    src="/logo/TAIJI_LOGO.png"
                    alt="Logo for Taiji, our Winter 2025 Drop"
                    width={1750}
                    height={1}
                    className="w-4/5 object-contain brightness-0 invert"
                  />
                </section>
                <div className="">
                  <p className="lg:text-lg font-thin"> {`2025-26 Winter Collection`}</p>
                </div>
              </div>
              <div className="z-100 h-20 flex items-end justify-center font-bold mb-20">
                <ShopNowButton />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/60 hover:bg-black/30 transition duration-300 flex justify-center items-center" />
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
              <div className="w-full lg:w-2/4 h-full flex flex-col justify-center items-center text-2xl text-center lg:text-6xl font-bold z-100 gap-2 pointer-events-none mx-auto">
                <section className="w-full flex justify-center items-center gap-6">
                  <div className="flex justify-center items-center overflow-hidden">
                    <Image 
                      src="/logo/Logo Red Version Clean.png"
                      alt="WoShi Cat Seal Logo in white"
                      width={120}
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
              <div className="z-100 h-20 flex items-end justify-center font-bold mb-20">
                <ShopNowButton />
              </div>
              <div className="absolute bottom-0 left-0 w-screen h-full bg-black/60 hover:bg-black/30 transition duration-300 flex justify-center items-center" />
            </Link>
          </div>

          {/* SUMMER DREAM STATIONERY */}
          <div className="flex relative justify-center items-end h-screen w-screen">
            <video className="object-cover h-full w-full z-[-1]" 
              autoPlay loop muted playsInline={true} data-v-f518367b="" preload="metadata"
            >
                <source src="https://cdn.shopify.com/videos/c/o/v/838472fb185d4523808a4c785558a068.mov" type="video/mp4" data-v-f518367b="" />
            </video> 
            <Link className="button-hover flex flex-col items-center justify-center absolute bottom-0 left-0 text-white w-full h-full p-12" href="/collections/summer-dream-stationery">
              <div className="w-full lg:w-3/4 h-full flex flex-col justify-center items-center text-2xl text-center lg:text-6xl font-bold z-100 gap-2 pointer-events-none mx-auto">
                <section className="w-full flex justify-center items-center gap-6">
                  <div className="flex justify-center items-center overflow-hidden">
                    {/* <Image 
                      src="/logo/Logo Red Version Clean.png"
                      alt="WoShi Cat Seal Logo in white"
                      width={120}
                      height={1}
                      className="object-contain brightness-0 invert"
                    /> */}
                  </div>
                  <div className="text-center z-[-1]">
                    <p>{`SUMMER DREAM`}</p>
                    <p className="text-base">{`SUMMER STATIONERY COLLECTION`}</p>
                  </div>
                </section>
              </div>
              <div className="z-100 h-20 flex items-end justify-center font-bold mb-20">
                <ShopNowButton />
              </div>
              <div className="absolute bottom-0 left-0 w-screen h-full bg-black/60 hover:bg-black/30 transition duration-300 flex justify-center items-center" />
            </Link>
          </div>
        </AutoCarousel>
      </div>
      
      <div className={`relative flex flex-col w-full mx-auto col-span-9 rounded-lg ${darkMode ? 'dark-text bg-stone-900/95' : 'light-text bg-white/95'}`}>
        {/* Mid page Yoyo inspiration */}
        <section className="relative flex flex-col w-full mx-auto mb-4">
          <div className="w-full flex justify-start overflow-hidden">
            <Image
              src={'/media/corner-bright.png'}
              width={120}
              height={1}
              alt="Chinese style corner frame decoration/design"
              className={``}
            />
          </div>
          <div className="w-full h-fit flex justify-center items-center text-center">
            <div className={`w-full lg:w-[90vw] h-fit flex flex-col justify-center items-center`}>
              <Image
                src={'/media/misc/woshicat_script2b.png'}
                width={400}
                height={1}
                alt={'Chinese Phonetics: Wo Shi Cat'}
                className={`image ${darkMode ? 'invert' : ''}`}
              />
              <div className="w-full lg:w-4/5 flex flex-col justify-center items-center text-center p-2">
                <p className="text-2xl font-bold">{`Breaking the cycle, day by day.`}</p>
                <p className="text-base md:text-xl">
                {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge? Navigating the human world as a salarycat.`}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Image
              src={'/media/corner-bright.png'}
              width={120}
              height={1}
              alt="Chinese style corner frame decoration/design"
              className={`rotate-180`}
            />
          </div>
        </section>

        {/* Featured Collection Header */}
        <div className={`relative w-full lg:w-[90vw] col-span-9 mx-auto gap-2 mb-2 text-5xl font-normal flex flex-col`}>
          {/* Featured Collection Display */}
          <div className={`relative w-full grid grid-cols-8 mb-10 mx-auto rounded-lg gap-1 p-0.5 ${darkMode ? 'bg-stone-900/95 lg:bg-transparent' : 'bg-white/95 lg:bg-transparent'}`}>
            <h3 className="ps-2 w-full text-3xl sticky top-[50px] col-span-8">{`Shop Featured ฅ^•ﻌ•^ฅ`}</h3>
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
              <div className="object-contain relative col-span-8 lg:col-span-5 w-full overflow-hidden flex justify-center items-center">
                <Loader />
              </div>
            )}
          <div className={`rounded-[12px] relative col-span-8 rounded-[8px] lg:col-span-3 h-full overflow-hidden max-lg:pt-2 flex items-center grid grid-cols-2 gap-1 ${featuredItems ? "opacity-100" : "hidden"} ${darkMode ? 'bg-stone-900/95 lg:bg-transparent' : 'bg-white/95 lg:bg-transparent'}`}>
            {featuredItems && featuredItems.map((product, index: number) => (
              <div className="col-span-1 flex flex-col h-full rounded-[8px] overflow-hidden" key={index}>
                <FadeInImage key={product.handle}>
                <div className={`relative text-center h-full rounded-[8px] overflow-hidden ${darkMode ? 'dark-text' : 'light-text'}`}  
                  key={product.handle}
                >
                  <div className={`text-base z-101 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
                  <div className={`text-base z-101 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-amber-500 pointer-events-none ${product.lowStock && product.available ? '' : 'hidden'}`}>Only a few left!</div>
                  
                  <div className={`flex justify-center overflow-hidden`}>
                    <Link className='w-full flex justify-center' href={`/collections/${product.collection}/${product.handle}`} passHref>
                    {/* Render product details */}
                    <div className='relative aspect-9/10 flex justify-center items-center rounded-[8px]'>
                      {/* Default product image */}
                      <img 
                        src={product.images[0].url} 
                        alt={product.images[0].altText} 
                        className={`${!product.available ? 'grayscale-[0.75]' : ''} object-cover rounded-[8px] h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0`}
                      />
                      {/* Hover image */}
                      { product.images[2] && (<img 
                        src={product.images[2].url} 
                        alt={product.images[2].altText} 
                        className={`${!product.available ? 'grayscale-[0.75]' : ''} rounded-[8px] object-cover max-sm:hidden absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100`}
                      />) }
                    </div>
                    </Link>
                  </div>
                  <div className={`flex flex-col w-full p-2 text-xs gap-1 ${!product.available ? 'text-stone-500' : 'text-black'}`}>
                    <div className="lg:text-sm text-start">{product.title}</div>
                    <div className="lg:text-xs text-start">{currFormat.format(product.price)}</div>
                  </div>
                </div>
                </FadeInImage>
              </div>
            ))
            }
            </div>
        </div>
      </div>

        {/* Collection Carousel Display */}
        <div className={`w-full lg:w-[90vw] col-span-9 mx-auto mb-15`}>
          {/* Rest of the Collections */}
          <Link href="/collections" className="w-full text-3xl font-normal ps-1 mb-2">
            {`Yoyo's Collection List`}
          </Link>  
          <div className="relative w-full mx-auto flex">
              <CollectionListing addClass="w-full h-full"/>
          </div>
        </div>
        
        {/* Product Showcase */}
        <div className={`relative w-full col-span-9 mb-10 mx-auto flex flex-col justify-center items-center`}>
          <div className="relative w-full lg:w-[90%] h-fit mb-2 mx-auto">
            <Link href="/collections" className="flex w-full text-3xl font-normal ps-1">
              {`Benji's Styling Inspo`}
            </Link>
          </div>
          <FeaturedPhotos folder="styling-inspiration" auto={true}/>
        </div>
      </div>
    </main>
    </>
  );
}

export default Home;