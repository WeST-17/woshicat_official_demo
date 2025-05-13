'use client';

import React from "react";
import Square from "../bento-layout/square";
import Image from "next/image";
import { collection_listing } from "./collectionListingData";

interface DisplayProps {
  addClass: string
}

const CollectionListing: React.FC<DisplayProps> = ({ addClass }) => {

    return (
        <>
          {
          collection_listing.map((collection, index) => (
            
            <section className={`w-full ${addClass}`} key={index}>
              <Square
              link={collection.link}
              collectionName={collection.collectionName}
              > 
                <Image 
                  className="aspect-square object-cover absolute top-0 left-0 bottom-0 right-0" 
                  src={collection.imgSrc} 
                  alt={collection.imgAlt} 
                  fill={true}
                />
              </Square>
            </section>
          ))
          }
        </>
    )
}

export default CollectionListing;