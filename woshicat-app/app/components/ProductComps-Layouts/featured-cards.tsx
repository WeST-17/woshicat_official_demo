'use client';
// ProductCards.tsx
import React, { useEffect, useState } from 'react';
import { getImagesCloudinary } from '../cloudinaryImages/cloudinary';
import Link from 'next/link';
import FadeInImage from '../transitions-navigation/FadeInImages';
import Image from 'next/image';
import ScrollingCarousel from '../carousels/Carousel';
import Loader from '../transitions-navigation/LoadingScreen';

interface FeaturedType {
    folder: string,
    auto?: boolean
}

const FeaturedPhotos:React.FC<FeaturedType> = ({ folder, auto }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setLoading(true);
    const fetchImages = async () => {
      try {
        const response = await getImagesCloudinary(folder);
        if (response.length > 0) {
          setPhotos(response);
        } else {
          setError('Failed to fetch images');
        }
      } catch (error) {
          console.error('Something went wrong!');
          setError(error);
      } finally {
        setLoading(false);
        console.log("Photos loaded.")
      }
    };
    fetchImages();
  }, [])
  

  if (error) {
    return <div className='flex h-32 w-full justify-center items-center'>{"Oops! Something happened on our end!"}</div>;
  }
  
  return (
    <>
      <FadeInImage>
        {loading ? ( <Loader /> )
          : 
          (
            <div className='relative w-full'>
              { photos.length > 0 && (
                  <ScrollingCarousel addClass="" numPerSlide={5} mobileSlide={2} length={photos.length} autoPlay={auto}>
                  {photos.map((image: any, index: number) => {
                      return (
                        <div className="relative flex justify-center items-center w-full mx-auto aspect-4/5" key={index}>
                            <Image 
                              src={image.secure_url}
                              alt={image.altText || 'images of prosperity/seredipity apparel and models'} 
                              width={image.width}
                              height={1}
                              className={`object-cover h-full`}
                            />
                        </div>
                      )
                  })}
                  </ScrollingCarousel>
                )
              }
            </div>
          )
        }
      </FadeInImage>
    </>
  );
};

export default FeaturedPhotos;