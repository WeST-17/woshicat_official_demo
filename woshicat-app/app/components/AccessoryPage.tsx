'use client';
import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { addToCart, displayCart, getServerItemProps } from '@/app/action';
import LoadingScreen from './loading';
import ImgHolder from './heroImageInsert';
import { Carousel } from "@material-tailwind/react";
import ProductDescription from './product-description';
import Image from 'next/image';
import { useCart } from './cart/cartContext';

interface Handle {
    handle: string,
}

const AccessoryCard: React.FC<Handle> = ({ handle }) => {
    const { setCartOpen, setCartUpdated } = useCart();
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Product fetching
    useEffect(() => {
        
        const fetchData = async () => {
        try {
            const { item, error } = await getServerItemProps({ params: { handle } });
            if (error) {
            setError(error);
            } else {
            setItem(item);
            }
        } catch (error) {
            console.error('Something went wrong!');
            setError(error);
        }
        };

        fetchData();
    }, []);


// --------------------------------------------------------------------------------------------------------------------------

    const addItemToCart = async (productID: string) => {
        setIsLoading(true);
        await addToCart(productID, 1);
        await displayCart();
        setCartUpdated(true);
        setIsLoading(false);
        setCartOpen(true);
    }
// --------------------------------------------------------------------------------------------------------------------------

    // Error handling
    if (error) {
        return <div className='flex items-center h-[100vh]'>Something happened on our end!</div>;
    }

    if (!item || !item.image) {
        return <div className='flex justify-center items-center p-8 h-[100vh]'></div>;
    }

// --------------------------------------------------------------------------------------------------------------------------

    return (
        <>
        <Suspense fallback={<LoadingScreen />}>
        <div className="flex justify-center items-center h-[100vh] w-full bg-stone-200 mb-8">
            {/* Insert hero image for each product. Upload directly as part of code base in Vercel i.e., /[handle] */}
            <ImgHolder 
                imgSrc={`/media/${handle}.png`}
                altText={`Image of the ${handle}`}
            />
        </div>
        <div className='h-fit text-lg' key={item.id}>
            <div className='flex justify-center grid lg:grid-cols-3 lg:p-12'>
                {/* Apparel Images */}
                {item.image.length > 0 && (
                    <div className='lg:col-span-2 md:p-32 p-12'>
                        {/* Render product details */}
                        {/* Add a carousel for images inside current div */}
                        <Carousel
                                className="flex overflow-hidden"
                                placeholder={undefined}
                                navigation={({ setActiveIndex, activeIndex, length }) => (
                                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                        {new Array(length).fill("").map((_, i) => (
                                            <span
                                                key={i}
                                                className={`block h-1 cursor-pointer transition-all content-[''] ${activeIndex === i ? "w-24 mb-20" : "w-24 mb-20 opacity-50"}`}
                                                onClick={() => setActiveIndex(i)}
                                            >
                                                <Image
                                                    key={i}
                                                    src={item.image[i].url}
                                                    alt={item.image[i].altText}
                                                    className={`${activeIndex === i ? "border-2 border-stone-400" : "border-2 border-transparent"}`}
                                                    width={100} height={1}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                )} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            {item.image.map((image: {url: string, altText: string}, index: number) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.altText}
                                    className='mx-auto snap-center pointer-events-none'
                                />
                            ))}
                        </Carousel>
                    </div>
                )}
                    
                <div className='lg:col-span-1 self-center justify-self-start h-fit w-full'>
                    <div className='w-full'>
                        <h3 className="m-8 text-4xl font-bold text-black">{item.name}</h3>
                        <p className="m-8 text-lg font-medium text-stone-900">${item.price}</p>
                    </div>

                    {/* Product Description: Need to make components for product description and add to cart button */}
                    <div className='ms-8 my-10 flex items-center text-xl'>
                        <ProductDescription description={item.description}/>
                    </div>
                    <button
                        className="rounded-full flex items-center justify-center grid grid-cols-6 bg-stone-400 w-3/5 ms-8 p-2 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                        disabled={
                            !item.available
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            addItemToCart(item.id);
                        }}
                        >
                        <div className='col-span-6 flex justify-center items-center min-h-full'>
                            {isLoading ? <div className="loader"></div> : 'Add to Cart'}
                        </div>
                    </button>
                </div>
                
            </div>
        </div>
        </Suspense>
        </>
    );
}

export default AccessoryCard;