import React from "react";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-2">
      {/* */}
      <div className="col-span-2 grid grid-cols-2 gap-1">
        <div className="flex flex-col">
          <Image 
            src={'/media/graphics/WoShi_Coming_Soon.png'}
            alt={'Image of WoShi Cat models posing'}
            width={1000}
            height={1}
            className='object-cover'
          />
        </div>
        <div className="flex h-full justify-start items-start flex-col p-8 gap-4">
          <h1 className="text-5xl">What is WoShi Cat?</h1>
          <p>
            Yoyo and his friends are new post grad cats who have just entered the workforce. Faced with a whole new set of challenges different from their college party days, he finds his systematic and routine days to be a bore. His newest challenge: A Salary Cat in a human world.
          </p>
          <p>
            WoShi Cat was founded by two post grads and their friends. WoShi Cat&apos;s identity draws from the Asian American experience and a love of cats. We wanted to create something we would have fun wearing and share the experience of a sudden post grad life shift. WoShi Cat is meant to represent an appreciation for different life experiences and recent travel obsessions.
          </p>
        </div>
      </div>
    </main>
    </>
  );
}

export default About;