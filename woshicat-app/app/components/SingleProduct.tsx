'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Suspense } from 'react';
import { addToCart, displayCart, getServerItemProps } from '@/app/action';
import LoadingScreen from './loading';
import ImgHolder from './heroImageInsert';
import { Carousel, IconButton } from "@material-tailwind/react";
import ProductDescription from './product-description';
import Image from 'next/image';
import { useCart } from './cart/cartContext';

interface Handle {
    handle: string
}

const SingleProductCard: React.FC<Handle> = ({ handle }) => {
    const { setCartOpen, setCartUpdated } = useCart();
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            console.error('Something went wrong!');
            setError(error);
        }
        };

        fetchData();
    }, []);
    
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
        const variant = item.variants.find((variant: { title: string; }) => variant.title === `${size} / ${selectedColor}` || variant.title === `${selectedColor} / ${size}`);
        // console.log(variant, size);
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

    const addItemToCart = async () => {
        setIsLoading(true);
        const selectedVariant = selectVariantByID;
        await addToCart(selectedVariant, 1);
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

    // Color adjust for off-white

// --------------------------------------------------------------------------------------------------------------------------

    return (
        <>
        <Suspense fallback={<LoadingScreen />}>
        <div className="relative flex justify-center items-center h-[100vh] w-full bg-stone-200">
            {/* Insert hero image for each product. Upload directly as part of code base in Vercel i.e., /[handle] */}
            <div className='absolute object-cover w-screen h-screen bg-black/25 z-[100] flex items-center justify-center'>
                <h1 className='text-[#FAF9F6] text-7xl'>{item.name}</h1>
            </div>
            <ImgHolder 
                imgSrc={item.image[0].url}
                altText={`Image of the ${handle}`}
            />
        </div>
        <div className='h-fit text-lg mb-8' key={item.id}>
            <div className='flex justify-center grid lg:grid-cols-2 lg:p-4'>
                {/* Apparel Images */}
                {item.image.length > 0 && (
                    <div className='relative lg:col-span-1 md:p-24 p-12'>
                        {/* Render product details */}
                        {/* Add a carousel for images inside current div */}
                        <Carousel
                            prevArrow={({ handlePrev }) => (
                                <IconButton
                                    variant="text"
                                    color="black"
                                    size="md"
                                    onClick={handlePrev}
                                    className="!absolute top-2/4 left-3 -translate-y-2/4 rounded-full" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 19.5L3 12l7.5-7.5"
                                    />
                                  </svg>
                                </IconButton>
                              )}
                              nextArrow={({ handleNext }) => (
                                <IconButton
                                  variant="text"
                                  color="black"
                                  size="md"
                                  onClick={handleNext}
                                  className="!absolute top-2/4 !right-3 -translate-y-2/4 rounded-full"
                                  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13.5 4.5L21 12l-7.5 7.5"
                                    />
                                  </svg>
                                </IconButton>
                            )}
                            className="flex overflow-hidden"
                            placeholder={undefined}
                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                    {new Array(length).fill("").map((_, i) => (
                                        <span
                                            key={i}
                                            className={`block flex justify-center items-center h-1 cursor-pointer transition-all content-[''] ${activeIndex === i ? "w-12 mb-8" : "w-12 mb-8 opacity-25"}`}
                                            onClick={() => setActiveIndex(i)}
                                        >
                                            <Image
                                                    key={i}
                                                    src={item.image[i].url}
                                                    alt={item.image[i].altText}
                                                    className={`aspect-square object-cover`}
                                                    width={100} height={1}
                                                />
                                        </span>
                                    ))}
                                </div>
                            )} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                            {item.image.map((image: {url: string, altText: string}, index: number) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={image.altText}
                                    className='mx-auto snap-center pointer-events-none object-contain h-full'
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
                
                    {/* Apparel Colors */}
                    {item.color?.length > 0 && (
                        <>
                            <div className='ms-8 my-2 flex items-center text-xl'>Color</div>
                            <div className='ms-8 flex items-center'>
                            {item.color.map((color: string, index: number) => {
                                let colorAdjust: string;
                                if (color === 'Off-white') {
                                    colorAdjust = '#FAF9F6'
                                } else {
                                    colorAdjust = color;
                                }
                                return (
                                <button
                                    key={index}
                                    style={{ backgroundColor: colorAdjust }}
                                    className={`rounded-full border-2 me-2 p-2 w-10 h-10 text-sm font-semibold text-black shadow-sm hover:bg-stone-300 transition duration-300 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${
                                        selectedColor === color ? 'border-stone-700' : 'border-stone-300'
                                    }`}
                                    onClick={() => handleColorSelection(color)}
                                >
                                    
                                </button>
                            )})}
                            </div>
                        </>
                    )}
                
                    {item.size?.length > 0 && (
                        <>
                            <div className='ms-8 mt-4 my-2 flex items-center text-xl'>Size</div>
                            {/* Apparel Sizing: SM, MD, LG, XL */}
                            <div className='ms-8 my-4 flex items-center'>
                                {item.size.map((sizing: string, index: number) => (
                                    <button
                                        key={index}
                                        className={`rounded-full border-2 border-stone-300 me-1 p-2 w-10 h-10 text-sm font-semibold shadow-sm 
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
                        className="rounded-full flex items-center justify-center grid grid-cols-6 bg-stone-400 w-3/5 ms-8 p-2 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                        disabled={
                            item.variants && item.variants.length === 0 
                            ? (!selectedSize || !selectedColor) 
                            : !selectedSize || !selectedColor
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            addItemToCart();
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

export default SingleProductCard;