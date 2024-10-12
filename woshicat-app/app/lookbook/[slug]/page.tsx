'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getImagesCloudinary } from "@/app/components/animationComps/cloudinary";
import FadeInImage from "@/app/components/animationComps/FadeInImages";

const LookbookSlug = () => {
  const pathname = usePathname(); // get pathname: '/apparel/[handle]
  const folder = pathname.replace('/lookbook/', ''); // get handle from pathname for folder
  const [images, setImages] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [pageLoad, setPageLoading] = useState<boolean>(false);

  // const [selectedImage, setSelectedImage] = useState<string | null>(null); add to allow for image expand
  
  // const handleImageClick = (imageUrl: string) => {
  //   setSelectedImage(imageUrl);
  // };

  // const closeModal = () => {
  //   setSelectedImage(null);
  // };
  
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
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="loader-screen" />
    </div>
    );
  }

  // Error handling
  if (error) {
    return <div className='flex items-center h-[100vh]'>Something happened on our end!</div>;
  }

  if (!images) {
      return <div className='flex justify-center items-center p-8 h-[100vh]'>Huh, nothing here...</div>;
  }

  return (
    <>
    <main className="flex justify-center w-screen mt-3">
      {/* */}
      
      <div className="relative flex flex-col grid grid-cols-2 lg:grid-cols-3 w-full p-3 lg:w-3/4 mx-auto gap-1">
      {images.map((image: any, index: number) => (
        <>
        <FadeInImage>
            <Image 
              src={image.secure_url}
              alt={`Image ${index + 1}`} 
              width={image.width} 
              height={1} 
              className={`object-cover aspect-[3/4]`}
            />
        </FadeInImage>
        
        </>
        ))}
        
      </div>
    </main>
    </>
  );
}

export default LookbookSlug;