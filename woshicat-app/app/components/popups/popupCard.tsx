'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PopupProps {
    PromoLink?: string;
    imgSrc: string,
    imgAlt?: string,
    promoDesc?: string,
    code?: string,
    extra?: string
}

const Popup: React.FC<PopupProps> = ({ PromoLink, imgSrc, imgAlt, promoDesc, code, extra }) => {
    const [popup, setPopup] = useState<boolean>(false);

    const closeConfirmation = () => {
        sessionStorage.setItem('popup','visited');
        setPopup(false);
    }

    useEffect(() => {
        const storedValue = sessionStorage.getItem('popup');
        setTimeout(() => {
            if (storedValue !== 'visited') {
                setPopup(true);
              }
        }, 1000)
        
    }, []);

    return (
        <>
        <div className={`absolute top-0 right-0 w-screen h-screen bg-black/50 ${popup ? '' : 'hidden'}`} />
        <div className={`transition-opacity duration-500 fixed inset-y-40 w-full h-1/2 lg:h-[500px] flex justify-center items-center z-[1000] modal overflow-hidden ${popup === true ? 'open' : 'close pointer-events-none'}`}>
            <div className="relative w-4/5 md:w-[600px] flex justify-center items-center h-full bg-white z-[1001] text-white shadow-xl">
            <Link 
                href={PromoLink || ''}
                className='relative lg:hidden max-lg:absolute w-full h-full flex justify-center items-center z-[1004] overflow-hidden'
                onClick={closeConfirmation}
            >
                <Image 
                    src={imgSrc || '/media/graphics/Yoyo happy.png'}
                    alt={imgAlt || ''}
                    width={1000}
                    height={1}
                    className="w-full h-full object-cover inset-0 lg:hidden"
                />
                <div className='lg:hidden absolute h-full w-full top-0 bg-black/50'/>
                
            </Link>
            
            <div
                className='overflow-hidden relative w-full h-full flex flex-col justify-center items-center z-[1004]'
            >
                { PromoLink && (
                <>
                    <Link 
                        href={PromoLink} 
                        className="text-white lg:text-stone-600 text-xl xl:text-3xl z-[1006] text-center w-full p-2"
                        onClick={closeConfirmation}
                    >
                        <p className='lg:hover:text-black transition-all duration-250'>{promoDesc}</p>
                        <p className='font-bold text-5xl mt-2 p-2 hover:bg-[#8B0000] hover:text-white transition duration-250 rounded-md'>{code}</p>
                        
                    </Link>
                    {/* Bottom right cat */}
                    <Image src={'/peoples/alvin cat.png'} alt="Alvin cat persona" width={120} height={1} className="max-lg:hidden absolute -bottom-5 -right-4 object-cover -rotate-45" />
                    {/* Bottom left cat */}
                    <Image src={'/peoples/kameel cat.png'} alt="Kameel cat persona" width={120} height={1} className="max-lg:hidden absolute -bottom-4 -left-5 object-cover rotate-45" />
                    {/* Top left cat */}
                    <Image src={'/peoples/Stag cat.png'} alt="Stag cat persona" width={120} height={1} className="max-lg:hidden absolute -top-4 -left-5 rotate-[135deg]" />

                </>
                )
                }
                
            </div>
            
            <button onClick={closeConfirmation} className="text-white lg:text-black absolute top-0 right-0 m-4 z-[1005]">close</button>
            </div>
        </div>
        </>
    )
}

export default Popup;