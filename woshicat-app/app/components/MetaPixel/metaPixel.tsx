'use client';
import React, { useState, useEffect } from 'react';
import { addScriptDefault, setup } from 'meta-pixel';
import { useMetaPixel } from './PixelContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const PIXEL_ID = process.env.FB_PIXEL_ID;

const MetaPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();
    const { consent } = useMetaPixel();

    useEffect(() => {
        if (!loaded || consent !== 'grant') return;
        const fbq = addScriptDefault();
        fbq('init' ,`${PIXEL_ID}`);
        fbq('track', 'PageView');

        fbq('track', 'InitiateCheckout');
        console.log('run complete');
        
    }, [pathname, loaded]);
    

    return (
        <>
            <Image
                alt="meta-pixel"
                height={1}
                width={1}
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                onLoad={() => setLoaded(true)}
            />
        </>
    )
};

export default MetaPixel;