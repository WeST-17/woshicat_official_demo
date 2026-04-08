'use client';

import { useEffect } from 'react';
import { PIXEL_ID } from './pixel';
import Image from 'next/image';
import { useMetaPixel } from './PixelContext';


const MetaPixel = () => {
    const { consent, fbq, loaded, setLoaded } = useMetaPixel();

    useEffect(() => {
        if (!loaded) return;
        if (consent === false) {
            // console.log('user rejected analytics tracking.');
            return () => {};
        };
        
        if (consent === true && fbq) {
            fbq('track', 'PageView');
            fbq('track', 'InitiateCheckout');
        } 
        

        return () => { console.log('cleanup') };
        
    }, [loaded, consent, fbq]);
    

    return (
        <>
        { consent && (
            <Image
                alt="meta-pixel"
                height={1}
                width={1}
                style={{ display: 'none' }}
                className=''
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                onLoad={() => { if (consent === true) {setLoaded(true)} }}
            />
        )}
        </>
    )
};

export default MetaPixel;