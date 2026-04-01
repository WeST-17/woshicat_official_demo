'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getImagesCloudinary } from "@/app/components/cloudinaryImages/cloudinary";
import FadeInImage from "@/app/components/transitions-navigation/FadeInImages";
import NotFound from "@/app/not-found";
import Loader from "@/app/components/transitions-navigation/LoadingScreen";

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

    return () => { console.log("unmount / cleanup") };
  }, [])

  if (pageLoad) {
    return (
    <Loader />
    );
  }

      // Error handling
  if (error) {
    return <NotFound />;
  }

  return (
    <>
    <main className="flex flex-col justify-center w-screen mt-20 gap-1">
      {/* */}

      { images.length > 0 && (
        <div className="relative flex grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 grid-rows-auto w-full lg:w-[90vw] mx-auto gap-1 flex-wrap grow rounded-lg overflow-hidden">
        {images.map((image: any, index: number) => {
            return (
              <div className={`flex justify-center items-center overflow-hidden w-full relative ${image.width > image.height ? "col-span-2" : ""} ${images[index + 1] && images[index + 1].width > images[index + 1].height ? "row-span-2 col-span-2" : ""}`} key={index}>
              <FadeInImage>
                  <Image 
                    src={image.secure_url}
                    alt={image.altText} 
                    width={image.width} 
                    height={1} 
                    className={`z-1 object-cover h-full ${image.width > image.height ? "aspect-8/5" : "aspect-4/5"}`}
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