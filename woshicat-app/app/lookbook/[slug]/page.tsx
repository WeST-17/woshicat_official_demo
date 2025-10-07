'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getImagesCloudinary } from "@/app/components/cloudinaryImages/cloudinary";
import FadeInImage from "@/app/components/transitions-navigation/FadeInImages";
import NotFound from "@/app/not-found";

const LookbookSlug = () => {
  const pathname = usePathname(); // get pathname: '/lookbook/[handle]
  const folder = pathname.replace('/lookbook/', 'lookbook/'); // get handle from pathname for folder
  const [images, setImages] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [pageLoad, setPageLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setPageLoading(true);
    const fetchImages = async () => {
      try {
        const response = await getImagesCloudinary(folder);
        if (response.length > 0) {
          setImages(response);
        } else {
          setError('Failed to fetch images');
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
    <div className="loader"/>
    );
  }

      // Error handling
  if (error) {
    return <NotFound />;
  }

  return (
    <>
    <main className="flex justify-center w-screen mt-20">
      {/* */}
      { images.length > 0 && (
        <div className="relative flex flex-col grid grid-cols-2 lg:grid-cols-3 w-full p-2 lg:w-[90vw] mx-auto gap-1">
        {images.map((image: any, index: number) => {
            return (
              <div className="" key={index}>
              <FadeInImage>
                  <Image 
                    src={image.secure_url}
                    alt={image.altText} 
                    width={image.width} 
                    height={1} 
                    className={`object-cover aspect-[4/5]`}
                  />
              </FadeInImage>
              </div>
            )
        })}
          
        </div>
      )
    }
    </main>
    </>
  );
}

export default LookbookSlug;