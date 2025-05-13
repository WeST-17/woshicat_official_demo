'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PopupProps {
    PromoLink?: string;
    imgSrc?: string,
    imgAlt?: string,
    video?: string,
    promoDesc?: string,
    code?: string,
    extra?: string,
    on: boolean,
}

const Popup: React.FC<PopupProps> = ({ PromoLink, imgSrc, video, imgAlt, promoDesc, code, extra, on }) => {
    const [popup, setPopup] = useState<boolean>(false);

    const closeConfirmation = () => {
        sessionStorage.setItem('popup','visited');
        setPopup(false);
    }

    useEffect(() => {
        const storedValue = sessionStorage.getItem('popup');
        setTimeout(() => {
            if (storedValue !== 'visited' && on) {
                setPopup(true);
              }
        }, 1000)
        
    }, []);

    return (
        <>
        <div className={`z-[2000] fixed top-0 right-0 w-screen h-screen bg-black/50 ${popup ? '' : 'hidden'}`} />
        <div className={`transition-opacity duration-500 fixed inset-y-20 w-full h-1/2 lg:h-[500px] flex justify-center items-center z-[2000] modal overflow-hidden ${popup === true ? 'open' : 'close pointer-events-none'}`}>
            <div className="relative w-4/5 md:w-[600px] flex justify-center items-center h-full bg-white z-[1001] text-white shadow-xl">
            <Link 
                href={PromoLink || ''}
                className='relative absolute w-full h-full flex justify-center items-center z-[1004] overflow-hidden'
                onClick={closeConfirmation}
            >
                {
                    imgSrc && popup && (
                        <Image 
                            src={imgSrc || '/media/graphics/Yoyo happy.png'}
                            alt={imgAlt || ''}
                            width={1000}
                            height={1}
                            className="w-full h-full object-cover inset-0"
                        />
                    )
                }
                {
                    video && popup &&(
                        <video 
                            className="aspect-square object-cover h-full w-full absolute top-0 left-0 bottom-0 right-0" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            preload="metadata"
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    )
                }

                <div className='absolute h-full w-full top-0 bg-black/60'/>
                
            </Link>
            
            <div
                className='overflow-hidden absolute w-full h-full flex flex-col justify-center items-center z-[2004]'
            >
                { PromoLink && popup && (
                <>
                    <Link 
                        href={PromoLink} 
                        className="text-white text-xl xl:text-3xl z-[2006] text-center w-full p-2 flex flex-col justify-center items-center"
                        onClick={closeConfirmation}
                    >
                        <p className='text-xl lg:text-3xl transition-all duration-250 mb-8'>{promoDesc}</p>
                        {extra && 
                            (<Image
                                src={extra}
                                width={125}
                                height={1}
                                alt=''
                            />)
                        }
                        { code && 
                        (<p className='font-bold text-xl mt-2 p-2 hover:bg-[#8B0000] hover:text-white transition duration-250 rounded-md'>{code}</p>)
                        }
                    </Link>
                    {/* Bottom right cat */}
                    <Image src={'/peoples/alvin cat.png'} alt="Alvin cat persona" width={120} height={1} className="max-lg:hidden absolute -bottom-5 -right-4 object-cover -rotate-45 rounded-lg" />
                    {/* Bottom left cat */}
                    <Image src={'/peoples/kameel cat.png'} alt="Kameel cat persona" width={120} height={1} className="max-lg:hidden absolute -bottom-5 -left-5 object-cover rotate-45 rounded-lg" />
                    {/* Top left cat */}
                    <Image src={'/peoples/han cat.png'} alt="Stag cat persona" width={120} height={1} className="max-lg:hidden absolute -top-4 -left-5 rotate-[135deg] rounded-lg" />

                </>
                )
                }
                
            </div>
            
            <button onClick={closeConfirmation} className="text-white absolute top-0 right-0 m-4 z-[2005]">close</button>
            </div>
        </div>
        </>
    )
}

export default Popup;