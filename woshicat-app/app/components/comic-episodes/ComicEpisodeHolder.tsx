'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagesCloudinary } from "@/app/components/cloudinaryImages/cloudinary";
import FadeInImage from "../transitions-navigation/FadeInImages";
import ComicEps from "@/app/yoyo-friends/comic";

interface ComicSource {
    title: string;
    date: string;
    folder: string;
    link?: string;
    epID: string;
    nextID?: string;
    prevID?: string;
}

const ComicHolder: React.FC<ComicSource> = ({title, date, folder, link, epID, nextID, prevID}) => {
  const [images, setImages] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [pageLoad, setPageLoading] = useState<boolean>(false);  
  
  useEffect(() => {
    setPageLoading(true);
    const fetchImages = async () => {
      try {
        const response = await getImagesCloudinary(folder);
        if (response) {
          setImages(response);
        } else {
          setError(response || 'Failed to fetch images');
        }
      } catch (error) {
          console.error('Something went wrong!');
          setError(error);
      } finally {
        setPageLoading(false);
      }
    };
    fetchImages();
  }, [])

  if (pageLoad) {
    return (
    <div className="w-full h-[400px] flex justify-center items-center">
        <div className=""></div>
    </div>
    );
  }

  if (!images || error) {
      return <div className='flex justify-center items-center p-8 h-[100vh]'>Huh, nothing here...</div>;
  }

  return (
    <>
    <div className="w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:w-1/2 mx-auto w-full h-fit gap-2" id={epID}>
        <Link 
            href={link || 'https://woshicat.com/collections'}
            target="_blank"
            className="relative w-fit h-full md:col-span-2 flex flex-col justify-center items-center px-3 gap-1 text-stone-500 hover:text-black transition-all duration-300"
        >
            <h2 className="text-4xl w-full text-start">{title}</h2>
            <p className="text-lg w-full text-start">{date}</p>
        </Link>
        <div className="md:col-span-2 w-fit flex px-3 gap-3 py-1">
            <Link href={`/yoyo-friends/${prevID}`} className={`flex gap-1 hover:opacity-100 transition-opacity duration-200 ease-in-out ${prevID ? 'opacity-80' : 'pointer-events-none opacity-10'}`}>
                <Image src={'/icons/caret-left-solid.svg'} alt={'previous arrow'} width={10} height={1}/>
                
            </Link>
            <Link href={`/yoyo-friends/${nextID}`} className={`flex gap-1 hover:opacity-100 transition-opacity duration-200 ease-in-out ${nextID ? 'opacity-80' : 'pointer-events-none opacity-10'}`}>
                
                <Image src={'/icons/caret-right-solid.svg'} alt={'next arrow'} width={10} height={1}/>
            </Link>

        </div>
        
        {images && images.map((image: any, index: number) => (
            <>
                <FadeInImage key={index}>
                <Image 
                src={image.secure_url}
                alt={`Image ${index + 1}`} 
                width={image.width} 
                height={1} 
                className={`aspect-square pointer-events-none`}
                priority
                />
                </FadeInImage>
            </>
            ))}
        
      </div>
    </div>
    </>
  );
}

export default ComicHolder;