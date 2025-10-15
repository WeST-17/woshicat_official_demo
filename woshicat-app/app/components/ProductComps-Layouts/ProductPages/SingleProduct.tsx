'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { getProductByHandleHelper, addToCart } from '@/app/server_actions/action';
import ProductCarousel from '../../carousels/productCarousel';
import ScrollingCarousel from '../../carousels/Carousel';
import { getProductRecommendationsHelper } from '@/app/server_actions/action';
import Image from 'next/image';
import { useCart } from '../../cart/cartContext';
import LoadingIcon from '../../transitions-navigation/loading';
import Loader from '../../transitions-navigation/LoadingScreen';
import NotFound from '@/app/not-found';
import FadeInImage from '../../transitions-navigation/FadeInImages';
import Link from 'next/link';
import MainProductDescription from '../components/main-product-description';

interface Handle {
    handle: string
}

const SingleProductCard: React.FC<Handle> = ({ handle }) => {
    const { setCartOpen, setCartUpdated, setCartItemsLoading, colorList } = useCart();
    const [item, setItem] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [pageLoad, setPageLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<any[]>([]);
    
    const colors: Set<string> = new Set();
    const sizes: Set<string> = new Set();
    const variantAvailable: Map<string, number> = new Map();

    const currFormat = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'USD',
    });

    // Product fetching
    useEffect(() => {
        setPageLoading(true);
        const fetchData = async (): Promise<void> => {
            try { 
                const productListing = await getProductByHandleHelper(handle);
                setItem(productListing);
                if (!productListing.tags.includes('no-variants')) {
                    productListing.variants.map((variant: any) => {
                        variantAvailable.set(variant.title, variant.quantity)
                    });
                }
                
            } catch (error) {
                console.error('Something went wrong!', error);
                setError(error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchData();
    }, []);

    // Product recommendations fetching
    useEffect(() => {
        setPageLoading(true);
        const fetchRecommendationData = async (): Promise<void> => {
            try { 
                const productRecommendations = await getProductRecommendationsHelper(handle);
                setRecommendations(productRecommendations);
                
            } catch (error) {
                console.error('Something went wrong!', error);
                setError(error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchRecommendationData();
    }, []);

    
// --------------------------------------------------------------------------------------------------------------------------

    const checkColor = (color: string) => {
        return colors.has(color)
    }
    const checkSize = (size: string) => {
        return sizes.has(size);
    }
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
    
    // Return selected variant to add to cart
    const selectVariantByID = useMemo(() => {
        
        if (!selectedColor && !selectedSize) return null;

        const selectedVariant = item.variants.find(
            (variant: { title: string; }) => variant.title === `${selectedSize} / ${selectedColor}`
        );

        return selectedVariant ? selectedVariant.id : null;

    },[selectedSize, selectedColor]);

    function selectAccessoryID(): string {
        console.log(item.variants.id)
        return item.variants.id;
    }
// --------------------------------------------------------------------------------------------------------------------------

    const hasNoVariants = () => {
        const noVariants: boolean = item.tags.includes('no-variants');
        return noVariants;
    }

    const hasNoSizeOptions = () => {
        const noSizings: boolean = item.tags.includes('no-sizings');
        return noSizings;
    }

    const addItemToCart = async () => {
        setIsLoading(true);
        setCartItemsLoading(true);
        if (hasNoVariants()) {
            const selectedItem = selectAccessoryID();
            await addToCart(selectedItem, quantity);
            console.log(selectedItem)
            setCartUpdated(true);
            setCartOpen(true);
            setIsLoading(false);
            setCartItemsLoading(false);
        } else {
            const selectedItem = await selectVariantByID;
            console.log(selectedItem);
            await addToCart(selectedItem, quantity);
            console.log(selectedItem)
            setCartUpdated(true);
            setCartOpen(true);
            setIsLoading(false);
            setCartItemsLoading(false);
        }
        
    }
// --------------------------------------------------------------------------------------------------------------------------
    if (pageLoad) {
        return (
        <>
        <div className="object-contain relative w-full h-[100vh] overflow-hidden flex justify-center items-center">
            <Loader />
        </div>
        </>
        );
    }

    // Error handling
    if (error) {
        return <NotFound />;
    }

    if (!item || !item.images) {
        return <div className='flex justify-center items-center h-[100vh]'></div>;
    }

// --------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------
    return (
        <>
        <div className={`relative flex justify-center items-center h-[50vh] w-screen bg-stone-200 mb-8 fade-in ${!pageLoad ? 'show' : ''}`}>
            {/* Insert hero image for each product.*/}
            <div className='absolute w-full h-full bg-black/25 z-[100] flex items-center justify-center'>
                <h1 className='text-[#FAF9F6] text-4xl lg:text-7xl mt-[70px]'>{item.title}</h1>
            </div>
            <Image 
                src={item.images[2] ? item.images[2].url : item.images[0].url}
                alt={`Image of the ${handle}`}
                fill={true}
                priority
                className='object-cover w-full'
            />
        </div>
        <div className='relative h-fit w-full text-lg lg:w-[90vw] mx-auto flex flex-col justify-start items-center' key={item.id}>
            <div className='relative flex justify-center items-start grid lg:grid-cols-8 mb-20 gap-4'>
                {/* Apparel Images */}
                {item.images.length > 0 && (
                    <>
                    <div className='relative col-span-8 rounded-md lg:hidden flex justify-center'>
                        {/* Render product details */}
                        {/* Add a carousel for images inside current div */}
                        <ProductCarousel images={item.images}>
                            {item.images.map((image: {url: string, altText: string}, index: number) => (
                                <div key={index} className='w-full h-full aspect-[4/5] flex justify-center items-center relative'>
                                    <img
                                        src={image.url}
                                        alt={image.altText || `Image of the ${item.title}`}
                                        className='pointer-events-none object-contain w-full h-full'
                                    />
                                    {image.altText && image.altText.includes('Size') && (
                                        <div className='bg-white/60 rounded-md flex justify-end items-center absolute bottom-0 right-0 h-fit w-fit text-sm p-1'>
                                            {image.altText.split('/')[0]}
                                            <br></br>
                                            {image.altText.split('/')[1]}
                                        </div>
                                    )}
                                    
                                </div>
                            ))}
                        </ProductCarousel>
                    </div>

                    {/* Large screen size and up */}
                    <div className='relative col-span-5 rounded-md max-lg:hidden grid grid-cols-2 flex justify-center items-center'>
                        {/* Render product details */}
                            {item.images.map((image: {url: string, altText: string}, index: number) => (
                                <div key={index} className={`w-full h-full aspect-[5/7] flex justify-center items-center relative`}>
                                    <img
                                        src={image.url}
                                        alt={image.altText || `Image of the ${item.title}`}
                                        className='mx-auto pointer-events-none object-cover h-full w-full'
                                    />
                                    {image.altText && image.altText.includes('Size') && (
                                        <div className='flex justify-end items-center absolute bottom-0 right-0 h-fit w-fit text-xs p-1 bg-white/60 rounded-md'>
                                            {image.altText.split('/')[0]}
                                            <br></br>
                                            {image.altText.split('/')[1]}
                                        </div>
                                    )}
                                    
                                </div>
                            ))}
                        
                    </div>
                    </>
                )}
                    
                <div className={`sticky top-20 max-lg:mt-16 p-2 lg:p-0 col-span-8 lg:col-span-3 h-fit lg:h-1/3 w-full relative gap-4`}>
                    <div className='w-full'>
                        <h3 className="text-3xl font-bold text-black">{item.title}</h3>
                        <p className={`my-3 text-xl text-stone-900 ${Number(item.price) > 0 ? '':'hidden'}`}>{currFormat.format(Number(item.price))}</p>
                        <p className={`my-3 text-xl text-stone-900 ${Number(item.price) <= 0.00 ? '':'hidden'}`}>{`A Gift from Yoyo! a.k.a it's Free!`}</p>
                    </div>
                
                    {/* Apparel Colors */}
                    {item.variants?.length > 0 && !hasNoVariants() && (
                        <>
                            <div className={`flex items-center text-lg gap-2`}>
                                {`Color: `}
                                <p className={`${!selectedColor ? 'hidden':''}`}>{selectedColor}</p>
                            </div>
                            <div className='flex items-center'>
                            {item.variants.map((variant: any, index: number) => {
                                if (!checkColor(variant.color)) {
                                    colors.add(variant.color);
                                    const color: any = colorList.get(variant.color);
                                    return (
                                        <button
                                            key={index}
                                            style={{ backgroundColor: color }}
                                            className={`bg-[${color}] rounded-full border-2 me-2 p-2 w-10 h-10 text-sm font-semibold text-black shadow-sm hover:bg-stone-300 transition duration-300 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${
                                                selectedColor === variant?.color ? 'border-stone-700' : 'border-stone-300'
                                            }`}
                                            onClick={
                                                () => {
                                                    handleColorSelection(variant.color)
                                                    }
                                            }
                                        >  
                                        </button>
                                    );
                                }
                                })}
                            </div>
                        </>
                    )}
                
                    {item.variants?.length > 0 && !hasNoVariants() && (
                        <>
                            <div className={`flex items-center text-lg gap-2`}>
                                {`Size: `}
                                <p className={`${!selectedSize ? 'hidden':''}`}>{selectedSize}</p>
                            </div>
                            <div className='flex items-center'>
                                {item.variants.map((variant: any, i: number) => {
                                    const sizing: string = variant.size;
                                    if (!checkSize(sizing)) {
                                        sizes.add(sizing)
                                        return (
                                            <button
                                                key={i}
                                                className={`rounded-full border-2 border-stone-300 me-1 p-2 w-10 h-10 text-sm font-semibold shadow-sm 
                                                ${
                                                    variant.quantity <= 0 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-stone-200 hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600'
                                                } ${
                                                    selectedSize === sizing ? 'bg-stone-500 text-white' : ''
                                                }`
                                                }
                                                disabled={!(variant.quantity > 0)}
                                                onClick={() => handleSizeSelection(sizing)}
                                            >
                                                {sizing}
                                            </button>
                                        )
                                    }
                                    }
                                )
                                }
                            </div>
                        </>
                    )}
                    <div className='w-full flex gap-2 mt-8'>
                        {!hasNoVariants() && (
                            <>
                            <div className="flex items-center">
                                <select
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleQuantitySelection}
                                className="w-16 h-full border border-gray-300 rounded-sm p-1 text-center"
                                >
                                {[...Array(5)].map((_, i) => {
                                    const quantity = i + 1;
                                    const inventory = item.variants.filter((variant: any) => variant.title === `${selectedSize} / ${selectedColor}`);
                                    
                                    return (
                                        <option
                                        key={quantity}
                                        value={quantity}
                                        disabled={(!selectedColor && !selectedSize) || (inventory[0] && inventory[0].quantity < quantity)}
                                        >
                                        {quantity}
                                        </option>
                                    );
                                    })}

                                </select>
                            </div>
                            <button
                                className={`rounded-sm flex items-center justify-center grid grid-cols-6 w-2/5 p-2 text-md font-semibold text-white shadow-sm bg-stone-400 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${selectedColor && selectedSize ? 'opacity-100 hover:bg-stone-500' : 'opacity-50 pointer-events-none'}`}
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
                                    {isLoading ? <LoadingIcon/> : `${item.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}`}
                                </div>
                            </button>
                            </>
                        )}
                        {hasNoVariants() && (
                            <>
                            <div className="flex items-center">
                                <select
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleQuantitySelection}
                                className="w-16 h-full border border-gray-300 rounded-sm p-1 text-center"
                                >
                                {[...Array(5)].map((_, i) => {
                                    const quantity = i + 1;
                                    
                                    return (
                                        <option
                                        key={quantity}
                                        value={quantity}
                                        disabled={(item.inventoryAvailable && item.inventoryAvailable < quantity)}
                                        >
                                        {quantity}
                                        </option>
                                    );
                                    })}

                                </select>
                            </div>
                            <button
                                className={`rounded-sm flex items-center justify-center grid grid-cols-6 bg-stone-400 w-3/5 p-2 text-md font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${quantity === 0 || item.quantity < quantity ? 'opacity-50 pointer-events-none':'opacity-100'}`}
                                disabled={
                                    item.quantity < quantity
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    addItemToCart();
                                }}
                                >
                                <div className='col-span-6 flex justify-center items-center min-h-full'>
                                    {isLoading ? <LoadingIcon/> : `${item.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}`}
                                </div>
                            </button>
                            </>
                        )}
                    </div>
                    {/* Product Description: Need to make components for product description and add to cart button */}
                    
                    <div className='w-full h-full mt-6 mb-3 flex flex-col items-start'>
                        <MainProductDescription description={item.description}/>
                    </div>
                </div>
            </div>
            {/*  */}
            {/* Product Recommendations */}
            <div className='h-fit w-full text-lg mx-auto hidden lg:flex items-start mb-6 px-1'>
                <div className="w-full text-3xl font-normal">
                    {`Yoyo's Recommendations`}
                </div>
            </div>
            <FadeInImage>
            <div className={`grid grid-cols-1 h-full w-full text-lg mx-auto flex justify-center items-start`}>
                <ScrollingCarousel addClass='' numPerSlide={5} mobileSlide={2} length={10}>
                {recommendations.map((product: any) => (
                    <div className={`px-0.5 w-full h-full`} key={product.id}>
                        <div className={`relative text-center h-full`} 
                            key={product.id}
                        >
                            <div className={`z-[1000] w-1/2 rounded-md absolute top-0 right-0 p-2 m-1 text-white bg-red-800 pointer-events-none ${!product.available ? '' : 'hidden'}`}>Sold Out!</div>
                            
                            <div className={`flex justify-center overflow-hidden`}>
                            <Link className='w-full flex justify-center' href={`/collections/${product.collection}/${product.handle}`} passHref>
                            
                            <div className={`relative flex justify-center items-center aspect-[9/10] h-full`}>
                                
                                <img 
                                src={product.images[0].url} 
                                alt={product.images[0].altText} 
                                className={`${product.handle.includes('shirt', 'hoodie', 'sweater') ? 'object-contain' : 'object-cover'} h-full w-full transition-opacity duration-500 ease-in-out sm:hover:opacity-0`}
                                />
                                
                                <img 
                                src={product.images[1].url} 
                                alt={product.images[1].altText} 
                                className={`object-contain max-sm:hidden absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-125 ease-in-out bg-white sm:hover:opacity-100`}
                                />
                            </div>
                            </Link>
                            </div>
                            <div className='flex w-full p-1 text-sm gap-2'>
                            <div className="text-stone-700 me-auto lg:text-sm text-start">{product.name}</div>
                            <div className="text-stone-700 ms-auto lg:text-sm">{currFormat.format(Number(product.price))}</div>
                            </div>
                        </div>
                    </div>
                ))}
                </ScrollingCarousel>
            </div>
            </FadeInImage>
        </div>
        </>
    );
}

export default SingleProductCard;