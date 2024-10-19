'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagesCloudinary } from "@/app/components/animationComps/cloudinary";
import FadeInImage from "../animationComps/FadeInImages";

interface ComicSource {
    title: string;
    date: string;
    folder: string;
    link?: string;
    dateID: string;
    nextDate?: string;
    prevDate?: string;
}

const ComicHolder: React.FC<ComicSource> = ({title, date, folder, link, dateID, nextDate, prevDate}) => {
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
      <div className="grid grid-cols-2 md:grid-cols-4 mx-auto w-full gap-2 mt-8" id={dateID}>
        <Link 
            href={link!}
            target="_blank"
            className="relative w-fit h-full col-span-2 md:col-span-4 flex flex-col justify-center items-center px-3 gap-1"
        >
            <h2 className="text-4xl w-full text-start">{title}</h2>
            <p className="text-lg w-full text-start">{date}</p>
        </Link>
        <div className="col-span-2 md:col-span-4 w-fit flex px-3 gap-3">
            <Link href={`#${prevDate}`} className={`flex gap-1 hover:opacity-100 transition-opacity duration-200 ease-in-out ${prevDate ? 'opacity-80' : 'pointer-events-none opacity-10'}`}>
                <Image src={'/icons/caret-left-solid.svg'} alt={'previous arrow'} width={8} height={1}/>
                {prevDate}
            </Link>
            <Link href={`#${nextDate}`} className={`flex gap-1 hover:opacity-100 transition-opacity duration-200 ease-in-out ${nextDate ? 'opacity-80' : 'pointer-events-none opacity-10'}`}>
                {nextDate}
                <Image src={'/icons/caret-right-solid.svg'} alt={'next arrow'} width={8} height={1}/>
            </Link>

        </div>
        
        {images.map((image: any, index: number) => (
            <>
                <FadeInImage key={index}>
                <Image 
                src={image.secure_url}
                alt={`Image ${index + 1}`} 
                width={image.width} 
                height={1} 
                className={`aspect-square`}
                priority
                />
                </FadeInImage>
            </>
            ))}
        
      </div>
    </>
  );
}

export default ComicHolder;