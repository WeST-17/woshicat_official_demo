'use client';
import React from "react";
import ComicHolder from "../components/comic-episodes/ComicEpisodeHolder";
import ComicEps from "./comic";

const YoyoComic = () => {
  
  return (
    <>
    <main className="flex justify-center w-screen grid grid-cols-8">
      {/* */}
      <div className="flex flex-col col-span-8 gap-4">
        {ComicEps.map((episode) => (
          <ComicHolder 
            title={episode.title}
            date={episode.date}
            folder={episode.folder}
            link={episode.link}
            dateID={episode.dateID}
            nextDate={episode.nextDate}
            prevDate={episode.prevDate}
            key={episode.dateID}
          />
        ))}

      </div>
      
      
    </main>
    </>
  );
}

export default YoyoComic;