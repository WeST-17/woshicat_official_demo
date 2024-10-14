import React from "react";
import Image from "next/image";
import AboutImage from "@/app/components/imageHolderAbout/ImageHolderAbout";

const About = () => {
  
  return (
    <>
    <main className="flex flex-col justify-center w-screen gap-4">
      {/* */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex justify-center items-center overflow-hidden">
          <Image 
            src={'/media/graphics/WoShi_Coming_Soon.png'}
            alt={'Yoyo looking at a calendar, WoShi Cat graphic'}
            width={1000}
            height={1}
            className='object-cover'
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
      {/* <div className="grid grid-cols-2 md:grid-cols-3 p-3 gap-2 lg:w-3/4 mx-auto">
        <div className="col-span-2 md:col-span-3 text-center text-4xl">Meet the team!</div>
        <AboutImage 
          imgSrc={'/media/homepage/Alvin-WoshiCat-11.jpeg'}
          altSrc={''}
          nickname="Alvin"
          dayJob='Engineering Analyst'
          bio={'Owner and Founder'}
        />
        <AboutImage 
          imgSrc={'/media/graphics/WoShi_Coming_Soon.png'}
          altSrc={''}
          nickname="Eliza"
          dayJob="Production Assistant"
          bio={'Co-Founder and Marketing Coordinator'}
        />
        <AboutImage 
          imgSrc={'/media/graphics/WoShi_Coming_Soon.png'}
          altSrc={''}
          nickname="Wes"
          dayJob="Advisor at a Glasses Shop"
          bio={'Web Developer and IT Coordinator'}
        />
        <AboutImage 
          imgSrc={'/media/graphics/WoShi_Coming_Soon.png'}
          altSrc={''}
          nickname="Han"
          dayJob="Chemist"
          bio={'Creative Director, Editor'}
        />
        <AboutImage 
          imgSrc={'/media/graphics/WoShi_Coming_Soon.png'}
          altSrc={''}
          nickname="Stag"
          bio={'Lead Designer, Editor'}
          dayJob="People Operations"
          social='ig @zetonakai'
          url='https://www.instagram.com/zetonakai'
        />
        
      </div> */}
    </main>
    </>
  );
}

export default About;