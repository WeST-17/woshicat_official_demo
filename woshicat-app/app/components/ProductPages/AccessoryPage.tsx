'use client';
import React, { useEffect, useState } from 'react';
import { addToCart, getServerItemProps } from '@/app/action';
import { Carousel } from "@material-tailwind/react";
import ProductDescription from '../product-description';
import Image from 'next/image';
import { useCart } from '../cart/cartContext';

interface Handle {
    handle: string,
}

const AccessoryCard: React.FC<Handle> = ({ handle }) => {
    const { setCartOpen, setCartUpdated, setCartItemsLoading } = useCart();
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const [pageLoad, setPageLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Product fetching
    useEffect(() => {
        setPageLoading(true);
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
        } finally {
            setPageLoading(false);
        }
        };

        fetchData();
    }, []);


// --------------------------------------------------------------------------------------------------------------------------
    // Handle quantity selection
    const handleQuantitySelection = (e: { target: { value: string; }; }) => {
        setQuantity(parseInt(e.target.value) || 1);
    }

    const addItemToCart = async (productID: string) => {
        setIsLoading(true);
        setCartItemsLoading(true);
        await addToCart(productID, quantity);
        setCartUpdated(true);
        setCartOpen(true);
        setIsLoading(false);
        setCartItemsLoading(false);
    }
// --------------------------------------------------------------------------------------------------------------------------
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

    if (!item || !item.image) {
        return <div className='flex justify-center items-center p-8 h-[100vh]'></div>;
    }

// --------------------------------------------------------------------------------------------------------------------------

    return (
        <>
        <div className={`relative flex justify-center items-center h-[80vh] w-full bg-stone-200 mb-8 fade-in ${!pageLoad ? 'show' : ''}`}>
            {/* Insert hero image for each product. Upload directly as part of code base in Vercel i.e., /[handle] */}
            <div className='absolute object-cover w-screen h-full bg-black/45 z-[100] flex items-center justify-center'>
                <h1 className='text-[#FAF9F6] text-7xl'>{item.name}</h1>
            </div>
            <Image 
                src={item.image[3] ? item.image[3].url : item.image[0].url}
                alt={`Image of the ${handle}`}
                fill={true}
                className='object-cover'
            />
        </div>
        <div className='h-full w-full xl:w-3/4 mx-auto text-lg p-5' key={item.id}>
            <div className='flex justify-center items-start grid lg:grid-cols-2 gap-8'>
                {/* Apparel Images */}
                {item.image.length > 0 && (
                    <div className='relative lg:col-span-1 aspect-square'>
                        {/* Render product details */}
                        {/* Add a carousel for images inside current div */}
                        <Carousel
                            prevArrow={({ handlePrev }) => (
                                <button
                                    color="black"
                                    onClick={handlePrev}
                                    className="absolute top-2/4 left-3 -translate-y-2/4 rounded-full p-6 hover:bg-black/20 transition duration-200"
                                >
                                  <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={8} height={1}/>
                                </button>
                              )}
                              nextArrow={({ handleNext }) => (
                                <button
                                    color="black"
                                    onClick={handleNext}
                                    className="absolute top-2/4 right-3 -translate-y-2/4 rounded-full p-6 hover:bg-black/20 transition duration-200"
                                >
                                  <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={8} height={1}/>
                                </button>
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
                                    className='mx-auto snap-center pointer-events-none object-contain h-full aspect-square bg-white'
                                />
                            ))}
                        </Carousel>
                    </div>
                )}
                    
                <div className='lg:col-span-1 h-full w-full'>
                    <div className='w-full'>
                        <h3 className="text-4xl font-bold text-black">{item.name}</h3>
                        <p className="my-8 text-lg text-stone-900">${item.price}</p>
                    </div>

                    {/* Product Description: Need to make components for product description and add to cart button */}
                    <div className='my-8 flex flex-col items-start text-lg gap-4'>
                        <ProductDescription description={item.description}/>
                    </div>
                    <div className='flex gap-2'>
                        {/* Quantity Selector Dropdown */}
                        <div className="mt-4 flex items-center">
                            <select
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantitySelection}
                            className="w-16 border border-gray-300 rounded-sm p-1 text-center"
                            >
                            {/* Dropdown options for quantities */}
                            {[...Array(5)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                {i + 1}
                                </option>
                            ))}
                            </select>
                        </div>
                    <button
                        className="rounded-sm flex items-center justify-center grid grid-cols-6 bg-stone-400 w-3/5 p-2 mt-4 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                        disabled={
                            item.available === false
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            addItemToCart(item.variants[0].id);
                        }}
                        >
                        <div className='col-span-6 flex justify-center items-center min-h-full'>
                            {isLoading ? <div className="loader"></div> : 'Add to Cart'}
                        </div>
                    </button>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    );
}

export default AccessoryCard;