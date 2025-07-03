'use client';

import React, { useEffect, useState } from "react";
import Square from "../bento-layout/square";
import Image from "next/image";
import { getCollectionInfoHelper } from "@/app/server_actions/action";

interface DisplayProps {
  addClass: string,
  
}

const CollectionListing: React.FC<DisplayProps> = ({ addClass }) => {
  const [collectionList, setCollectionList] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
  
      const fetchData = async () => {
        const collectionInfo = await getCollectionInfoHelper();
        try {
          setCollectionList(collectionInfo);
        } catch (error) {
          console.error('Error fetching server component props:', error);
          setError(error);
        } 
      };
      console.log('Products Gallery loaded.');
      fetchData();
    }, []);

  return (
      <>
        { !error && collectionList.map((collection) => (
            
            <section className={`w-full ${addClass}`} key={collection.handle}>
              <Square
              link={`/collections/${collection.handle}`}
              collectionName={`${collection.title}`}
              shopNow={true}
              > 
                <Image 
                  className="aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
                  src={collection.imgSrc} 
                  alt={collection.imgAlt || ''} 
                  fill={true}
                />
              </Square>
            </section>
          ))}
      </>
  )
}

export default CollectionListing;