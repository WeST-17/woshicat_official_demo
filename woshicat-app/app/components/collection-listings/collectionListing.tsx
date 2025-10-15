'use client';

import React, { useEffect, useState } from "react";
import Square from "../bento-layout/square";
import Image from "next/image";
import { getCollectionInfoHelper } from "@/app/server_actions/action";
import Loader from "../transitions-navigation/LoadingScreen";
import ScrollingCarousel from "../carousels/Carousel";

interface DisplayProps {
  addClass: string,
  
}

const CollectionListing: React.FC<DisplayProps> = ({ addClass }) => {
  const [collectionList, setCollectionList] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
  
      const fetchData = async () => {
        setLoading(true);
        const collectionInfo = await getCollectionInfoHelper();
        try {
          setCollectionList(collectionInfo);
        } catch (error) {
          console.error('Error fetching server component props:', error);
          setError(error);
        } 
        setLoading(false);
      };
      
      fetchData();
      console.log('Products Gallery loaded.');
    }, []);

  return (
    <>
      { loading && (
        <div className="object-contain relative w-full overflow-hidden flex justify-center items-end">
          <Loader />
        </div>
      )}
      
      { !loading && !error && (
        <ScrollingCarousel addClass="" numPerSlide={3} mobileSlide={1} length={collectionList.length}>
          { collectionList.map((collection) => (
              <section className={`mx-auto lg:px-0.5 ${addClass}`} key={collection.handle}>
                <Square
                link={`/collections/${collection.handle}`}
                collectionName={`${collection.title}`}
                shopNow={true}
                > 
                  <Image 
                    className="object-cover h-full" 
                    src={collection.imgSrc} 
                    alt={collection.imgAlt || ''} 
                    fill={true}
                  />
                  
                </Square>
              </section>
            ))
          }
        </ScrollingCarousel>
      )}
    </>
  )
}

export default CollectionListing;