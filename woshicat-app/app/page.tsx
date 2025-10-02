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

const Home = () => {
  const [featured, setFeatured] = useState<any[]>([]);
  const [notice, setNotice] = useState<boolean>(true);

  const closeNotice = () => {
    const noticeContainer = document.getElementsByClassName('notice-container')[0];
    noticeContainer.classList.toggle("close-notice");
    setTimeout(() => {
      setNotice(false);
    }, 500);
    
  };
  
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
      {/* Promotion Graphic Popup */}
      {notice && (
        <>
        <div className="z-[2005] fixed inset-0 w-full h-[100vh] flex justify-center items-center transition duration-500 notice-container" onClick={closeNotice}>
          <div className="relative lg:w-2/3 lg:h-2/3 w-4/5 h-fit flex max-md:flex-col justify-center items-center overflow-hidden rounded-md">
            <button className="absolute top-0 right-1 w-fit h-fit m-2 z-[100]" onClick={closeNotice}>close</button>
            <section className="relative w-fit md:w-1/3 h-full flex flex-col justify-center items-center text-center md:text-start p-5 gap-4 shrink">
              <Image
                src="/logo/Logo Red Version Clean.png"
                alt="WoShi Cat Red Logo"
                width={80}
                height={1}
                className="z-[100]"
              />
              <p className="lg:text-xl text-base z-[100] text-black w-full">{`Our online store will be closed until Oct 6, 2025`}</p>
              <p className="lg:text-base text-sm z-[100] text-black w-full">{`We'll be at Asia Times Square's 18th Annual Mid-Autumn Festival. Meet us there !!`}</p>
              <Link href={"https://linktr.ee/asiatimessquare"} target="_blank" className="z-[100] w-full opacity-75 hover:opacity-100 transition duration-450 text-black flex justify-center items-center">
                <p className="w-full text-xs p-2 border-2 border-red-900/20 hover:border-red-900 hover:bg-red-900/50 rounded-md transition duration-450 text-center">
                  {`linktr.ee.com/asiatimessquare`}
                </p>
              </Link>
              
            </section>
            <section className="relative w-full md:w-2/3 h-full flex justify-center items-center p-5">
              <Image
                src={"https://asiatimessquare.com/wp-content/uploads/2025/06/3.png"}
                alt="Asia Times Square 18th Annual Mid-Autumn Festival Promotion graphic"
                width={400}
                height={1}
                className="object-contain w-full rounded-md"
              />
            </section>
            <div className="absolute top-0 right-0 w-full h-full bg-white/90 z-[-1]" />
          </div> 
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-black/50 z-[2000]" />
        </>
      )}

      {/* Top of website */}
      <div className="relative col-span-9">
        <AutoCarousel>
          {/* Singularity */}
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
                <source src="https://cdn.shopify.com/videos/c/o/v/17a26dcfdd034c1a9a47d9daa4df1baa.mp4" type="video/mp4" data-v-f518367b="" />
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
            <Link className="button-hover flex flex-col items-center justify-center absolute bottom-0 left-0 text-white w-full h-full p-12" href="/collections">
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

      <section className="relative flex flex-col w-full mx-auto col-span-9">
        <div className="w-full flex">
          <Image
            src={'/media/corner-bright.png'}
            width={140}
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
            <div className="w-full md:text-2xl flex flex-col justify-center items-center text-center mb-12">
              <p className="text-2xl md:text-3xl font-bold">{`Breaking the cycle, day by day.`}</p>
              <div className="p-3">
              {`Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge? Navigating the human world as a salarycat.`}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <Image
            src={'/media/corner-bright.png'}
            width={140}
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