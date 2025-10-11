'use client';

const About = () => {
  
  return (
    <>
    <main className="relative w-full h-full">
      {/* */}
      <div className="flex h-full w-full bg-white/85 absolute right-0"/>
      <div className="relative flex justify-center items-center max-lg:flex-col w-full h-full">
        
        <div className="w-full absolute inset-0 z-[-1]">
          {/* {`About video or image`} */}
          <video 
            className={`h-full w-full object-cover`}
            autoPlay 
            loop 
            muted 
            playsInline={true} 
            data-v-f518367b="" 
            preload="metadata"
            
          >
              <source src="https://cdn.shopify.com/videos/c/o/v/f8b51e6a0c3a4e96a58162f39484980c.mov" type="video/mp4" data-v-f518367b="" />
          </video> 
        </div>

        <div className="relative flex justify-start mt-20 lg:mt-32 h-screen w-full ms-auto lg:w-1/2 lg:mx-auto flex-col p-4 gap-2">
          
          <div className="flex flex-col items-start justify-start gap-3">
            <h1 className="text-xl lg:text-3xl font-bold">{`WoShi Cat:`}</h1>
            <h1 className="text-xl lg:text-3xl">{`What's beyond the cycle?`}</h1>
          </div>
          <section className="flex flex-col justify-center items-center gap-2 text-black text-sm lg:text-base">
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

    </main>
    </>
  );
}

export default About;