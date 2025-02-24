'use client';
import React, { useState } from "react";
import Image from "next/image";
import AboutCarousel from "@/app/components/imageHolderAbout/ImageHolderAbout";

const About = () => {
  const [active, setActive] = useState(false);
  const [picIndex, setPicIndex] = useState(0);

  const openCarousel = (_e: any, key: number) => {
    setPicIndex(key);
    setTimeout(() => {
      setActive(true);
    }, 150)
    
  }

  const closeCarousel = () => {
    setActive(false);
    setPicIndex(0);
  }
  
  return (
    <>
    <main className="relative flex flex-col justify-center w-screen gap-4">
      {/* */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-8">
        <div className="flex justify-center items-center overflow-hidden">
          <Image 
            src={'/media/graphics/WoShi_Coming_Soon.png'}
            alt={'Yoyo looking at a calendar, WoShi Cat graphic'}
            width={1000}
            height={1}
            className='object-cover h-full'
            priority
          />
        </div>
        <div className="flex h-full justify-start items-start flex-col p-8 gap-1">
          <div className="flex max-md:flex-col max-md:items-start items-end gap-3">
            <h1 className="text-4xl font-bold">{`WoShi Cat:`}</h1>
            <h1 className="text-4xl">{`What's beyond the cycle?`}</h1>
          </div>
          <section className="grid gap-4 pt-3">
            <p>
              {`WoShi Cat (我是貓) was founded as an exploration into the pocket where Taiwanese-inspired streetwear, frustration with the cyclical nature of corporate life, and a love of cats can intertwine. "Wǒ shì," or “I am" in Mandarin, is more than a self-introduction; it encompasses limitless multifaceted identities that can exist in tandem, whether professional or personal. No one is confined to playing only one role in life—not even a cat.`}
            </p>
            <p>
              {`Our team comprises a group of college friends now faced with navigating the workforce. We wanted to design clothing that playfully sympathizes with the difficulty of the post-grad life shift, and above all, to make something we'd have fun wearing. As a result, our mascot Yoyo sprang forth to champion our 9-to-5 struggles.`}
            </p>
            <p>
              {`Yoyo and friends are newly-minted adult cats tackling their first full-time jobs. Confronted with corporate trials that feel worlds apart from his college party days, Yoyo finds his routine unfulfilling and begins searching for something new. As a salarycat in a human world, it won't be easy to forge a path outside the cycle, but he believes the journey is worth it.`}
            </p>
          </section>
        </div>
      </div>

      {/* {active && (
        <>
        <button className={`fixed z-[2005] bg-black/80 m-3 rounded-md top-0 right-0 text-white h-12 w-20 ${active ? '' : 'hidden'}`} onClick={closeCarousel}>
          close
        </button>
        <AboutCarousel classAdd={`transition-opacity duration-250 ${active ? '' : 'opacity-0'}`} passedIndex={picIndex}>
          <div className="w-full flex justify-center items-center">
            <Image
              src='/peoples/alvin cat.png'
              alt={`Alvin's cat persona`}
              width={300}
              height={1}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src='/peoples/Eliza cat.png'
              alt={`Eliza's cat persona`}
              width={300}
              height={1}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src='/peoples/Wes Cat.png'
              alt={`Wes' cat persona`}
              width={300}
              height={1}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src='/peoples/han cat.png'
              alt={`Han's cat persona`}
              width={300}
              height={1}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src='/peoples/Stag cat.png'
              alt={`Stag's cat persona`}
              width={300}
              height={1}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src='/peoples/kameel cat.png'
              alt={`Kameel's cat persona`}
              width={300}
              height={1}
            />
          </div>
        </AboutCarousel>
        </>
      )} */}

    </main>
    </>
  );
}

export default About;