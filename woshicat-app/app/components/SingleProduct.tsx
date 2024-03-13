'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Suspense } from 'react';
import { getServerItemProps } from '@/app/action';
import LoadingScreen from './loading';
import ImgHolder from './heroImageInsert';
import { Carousel } from "@material-tailwind/react";
import type { CarouselProps } from "@material-tailwind/react";
import ProductDescription from './product-description';

interface Handle {
    handle: string
}

const SingleProductCard: React.FC<Handle> = ({ handle }) => {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
            console.error('Error fetching server component props:', error);
            setError(error);
        }
        };

        fetchData();
    }, []);
    
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------

    // Size and color selection and add to cart by variant:
    const handleColorSelection = (color: string) => {
        setSelectedColor(color);
    }

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size)
    }

    const isSizeAvailable = (size: string) => {
        if (!selectedColor) return false;
        const variant = item.variants.find((variant: { title: string; }) => variant.title === `${size} / ${selectedColor}`);
        return variant ? variant.available : false;
    }

    // Return selected variant to add to cart
    const selectVariantByID = useMemo(() => {
        if (!selectedColor && !selectedSize) return null;

        const selectedVariant = item.variants.find(
            (variant: { title: string; }) => variant.title === `${selectedSize} / ${selectedColor}`
        );

        return selectedVariant ? selectedVariant.id : null;

    },[selectedSize, selectedColor, item.variants]);

// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------

    // Error handling
    if (error) {
        return <div className='flex items-center h-[100vh]'>Error fetching products: {error.message}</div>;
    }

    if (!item || !item.image) {
        return <div className='flex justify-center items-center p-8 h-[100vh]'></div>;
    }

// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------

    return (
        <Suspense fallback={<LoadingScreen />}>
        <div className="relative flex justify-center items-center h-[100vh] w-full bg-stone-200 mb-8">
            {/* Insert hero image for each product. Upload directly as part of code base in Vercel */}
            <ImgHolder 
                imgSrc='/vercel.svg'
                altText='placeholder image for now'
            />
        </div>
        <div className='h-fit text-lg' key={item.id}>
            <div className='flex justify-center grid lg:grid-cols-3 lg:p-12'>
                {/* Apparel Images */}
                {item.image.length > 0 && (
                    <div className='lg:col-span-2 p-8'>
                        {/* Render product details */}
                        {/* Add a carousel for images inside current div */}
                        <Carousel
                            className="rounded-xl flex overflow-hidden"
                            placeholder={undefined}
                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                {new Array(length).fill("").map((_, i) => (
                                    <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                        activeIndex === i ? "w-8 h-2 bg-black" : "w-4 h-2 bg-black/50"
                                    }`}
                                    onClick={() => setActiveIndex(i)}
                                    />
                                ))}
                                </div>
                            )}
                        >
                            {item.image.map((image: {url: string, altText: string}, index: number) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.altText}
                                />
                            ))}
                        </Carousel>
                    </div>
                )}
                    
                <div className='lg:col-span-1 self-center justify-self-start h-fit w-full'>
                    <div className='w-full'>
                        <h3 className="m-8 text-4xl font-bold text-stone-700">{item.name}</h3>
                        <p className="m-8 text-lg font-medium text-stone-900">${item.price}</p>
                    </div>
                
                    {/* Apparel Colors */}
                    {item.color.length > 0 && (
                        <>
                            <div className='ms-8 my-2 flex items-center text-xl'>Color</div>
                            <div className='ms-8 flex items-center'>
                            {item.color.map((color: string, index: number) => (
                                <button
                                    key={index}
                                    className={`rounded-md bg-stone-200 me-2 p-2 w-28 h-10 text-sm font-semibold text-black shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${
                                        selectedColor === color ? 'bg-stone-500 text-white' : ''
                                    }`}
                                    onClick={() => handleColorSelection(color)}
                                >
                                    {color}
                                </button>
                            ))}
                            </div>
                        </>
                    )}
                
                    {item.size.length > 0 && (
                        <>
                            <div className='ms-8 mt-10 my-2 flex items-center text-xl'>Size</div>
                            {/* Apparel Sizing: XS, SM, MD, LG, XL */}
                            <div className='ms-8 my-4 flex items-center'>
                                {item.size.map((sizing: string, index: number) => (
                                    <button
                                        key={index}
                                        className={`rounded-md me-1 p-2 w-10 h-10 text-sm font-semibold shadow-sm 
                                        ${
                                            !isSizeAvailable(sizing) ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-stone-200 hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600'
                                        } ${
                                            selectedSize === sizing ? 'bg-stone-500 text-white' : ''
                                        }`
                                        }
                                        disabled={!isSizeAvailable(sizing)}
                                        onClick={() => handleSizeSelection(sizing)}
                                    >
                                        {sizing}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}


                    {/* Product Description: Need to make components for product description and add to cart button */}
                    <div className='ms-8 my-10 flex items-center text-xl'>
                        <ProductDescription description={item.description}/>
                    </div>
                    <button
                        className="rounded-full flex items-center grid grid-cols-6 bg-stone-400 w-3/5 ms-8 p-2 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                        >
                        <div className='col-span-1'>&#43;</div><div className='col-span-4'>Add to Cart</div>
                    </button>
                </div>
                
            </div>
        </div>
        </Suspense>
    );
}

export default SingleProductCard;