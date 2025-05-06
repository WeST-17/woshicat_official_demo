'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { addToCart, getServerItemProps } from '@/app/action';
import { Carousel } from "@material-tailwind/react";
import ProductDescription from '../product-description';
import Image from 'next/image';
import { useCart } from '../cart/cartContext';
import LoadingIcon from '../loading';

interface Handle {
    handle: string
}

const SingleProductCard: React.FC<Handle> = ({ handle }) => {
    const { setCartOpen, setCartUpdated, setCartItemsLoading } = useCart();
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const [pageLoad, setPageLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const currFormat = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'USD',
    });

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
                if (item?.color?.length === 1) {
                    setSelectedColor(item.color[0]);
                }
            }
        } catch (error) {
            console.error('Something went wrong!');
            setError(error);
        } finally {
            setPageLoading(false);
        }
        };

        fetchData();
    }, [handle]);
    
// --------------------------------------------------------------------------------------------------------------------------
    // Handle quantity selection
    const handleQuantitySelection = (e: { target: { value: string; }; }) => {
        setQuantity(parseInt(e.target.value) || 1);
    }

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
        setCartItemsLoading(true);
        const selectedVariant = selectVariantByID;
        await addToCart(selectedVariant, quantity);
        setCartUpdated(true);
        setCartOpen(true);
        setIsLoading(false);
        setCartItemsLoading(false);
    }
// --------------------------------------------------------------------------------------------------------------------------
    if (pageLoad) {
        return (
        <></>
        );
    }

    // Error handling
    if (error) {
        return <div className='flex h-32 w-full justify-center items-center'>Error fetching products: {"Oops! Something happened on our end!"}</div>;
    }

    if (!item || !item.image) {
        return <div className='flex justify-center items-center p-8 h-[100vh]'></div>;
    }

// --------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------

    return (
        <>
        <div className={`relative flex justify-center items-center h-[50vh] md:h-[80vh] w-full bg-stone-200 mb-8 fade-in ${!pageLoad ? 'show' : ''}`}>
            {/* Insert hero image for each product. Upload directly as part of code base in Vercel i.e., /[handle] */}
            <div className='absolute object-cover w-screen h-full bg-black/25 z-[100] flex items-center justify-center'>
                <h1 className='text-[#FAF9F6] text-7xl'>{item.name}</h1>
            </div>
            <Image 
                src={item.image[2] ? item.image[2].url : item.image[0].url}
                alt={`Image of the ${handle}`}
                fill={true}
                priority
                className='object-cover'
            />
        </div>
        <div className='h-full w-full text-lg p-5 xl:w-3/4 mx-auto flex items-center' key={item.id}>
            <div className='flex justify-center items-center grid md:grid-cols-2 gap-8'>
                {/* Apparel Images */}
                {item.image.length > 0 && (
                    <div className='relative md:col-span-1 bg-white rounded-md'>
                        {/* Render product details */}
                        {/* Add a carousel for images inside current div */}
                        <Carousel
                            prevArrow={({ handlePrev }) => (
                                <button
                                    color="black"
                                    onClick={handlePrev}
                                    className="absolute top-2/4 left-3 -translate-y-2/4 rounded-md p-3 hover:bg-black/20 transition duration-200"
                                >
                                  <Image src={'/icons/caret-left-solid.svg'} alt={'left arrow'} width={8} height={1}/>
                                </button>
                              )}
                              nextArrow={({ handleNext }) => (
                                <button
                                    color="black"
                                    onClick={handleNext}
                                    className="absolute top-2/4 right-3 -translate-y-2/4 rounded-md p-3 hover:bg-black/20 transition duration-200"
                                >
                                  <Image src={'/icons/caret-right-solid.svg'} alt={'right arrow'} width={8} height={1}/>
                                </button>
                            )}
                            className="flex items-center overflow-hidden"
                            placeholder={undefined}
                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 max-sm:hidden">
                                    {new Array(length).fill("").map((_, i) => (
                                        <span
                                            key={i}
                                            className={`block flex justify-center items-center h-1 cursor-pointer transition-all content-[''] ${activeIndex === i ? "w-12 mb-4" : "w-12 mb-4 opacity-25"}`}
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
                                    className='mx-auto snap-center pointer-events-none'
                                />
                            ))}
                        </Carousel>
                        
                    </div>
                    
                )}
                    
                <div className='lg:col-span-1 h-full w-full'>
                    <div className='w-full'>
                        <h3 className="text-4xl font-bold text-black">{item.name}</h3>
                        <p className="my-8 text-lg font-medium text-stone-900">{currFormat.format(Number(item.price))}</p>
                    </div>
                
                    {/* Apparel Colors */}
                    {item.color?.length > 0 && (
                        <>
                            <div className='my-2 flex items-center text-xl'>Color</div>
                            <div className='flex items-center'>
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
                            <div className='mt-4 my-2 flex items-center text-xl'>Size</div>
                            {/* Apparel Sizing: SM, MD, LG, XL */}
                            <div className='my-4 flex items-center'>
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
                    <div className='flex gap-2'>
                        {/* Quantity Selector Dropdown */}
                        <div className="mt-4 flex items-center">
                            <select
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantitySelection}
                            className="w-16 h-full border border-gray-300 rounded-sm p-1 text-center"
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
                            className="rounded-sm flex items-center justify-center grid grid-cols-6 bg-stone-400 w-3/5 mt-4 p-2 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
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
                                {isLoading ? <LoadingIcon/> : 'Add to Cart'}
                            </div>
                        </button>
                    </div>
                    {/* Product Description: Need to make components for product description and add to cart button */}
                    <div className='my-8 flex flex-col items-start text-lg gap-4'>
                        <ProductDescription description={item.description}/>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default SingleProductCard;