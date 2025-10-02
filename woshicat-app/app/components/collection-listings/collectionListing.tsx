'use client';

import React, { Suspense, useEffect, useState } from "react";
import Square from "../bento-layout/square";
import Image from "next/image";
import { getCollectionInfoHelper } from "@/app/server_actions/action";
import Loader from "../transitions-navigation/LoadingScreen";

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
      console.log('Products Gallery loaded.');
      fetchData();
    }, []);

  return (
      <>
        { loading && (
          <div className="object-contain relative w-full overflow-hidden flex justify-center items-end">
            <Loader />
          </div>
        )}
        { !loading && !error && collectionList.map((collection) => (
            
            <section className={`${addClass}`} key={collection.handle}>
              <Square
              link={`/collections/${collection.handle}`}
              collectionName={`${collection.title}`}
              shopNow={true}
              > 
                <Image 
                  className="object-cover absolute top-0 left-0 bottom-0 right-0" 
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