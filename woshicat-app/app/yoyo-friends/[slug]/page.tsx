'use client';
import React from "react";
import ComicEps from "../comic";
import ComicHolder from "@/app/components/comic-episodes/ComicEpisodeHolder";
import { notFound, usePathname } from "next/navigation";

const YoyoComicSlug = () => {
  const pathname = usePathname();
  const episodeID = pathname.replace('/yoyo-friends/', ''); // get handle from pathname for folder

  const getEpisodeById = (epID: string) => {
    return ComicEps.find((ep) => ep.epID === epID);
  };

  const episode = getEpisodeById(episodeID);

  if (!episode) {
    notFound();
  }

  return (
    
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="flex flex-col col-span-8 gap-4">
        {episode && (
          <ComicHolder 
            title={episode.title}
            date={episode.date}
            folder={episode.folder}
            link={episode.link}
            epID={episode.epID}
            nextID={episode.nextID}
            prevID={episode.prevID}
            key={episode.epID}
          />
        )}
        

      </div>
      
      
    </main>
    </>
  );
}

export default YoyoComicSlug;