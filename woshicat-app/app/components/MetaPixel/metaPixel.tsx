'use client';
import React, { useEffect, useState } from 'react';
import { addScriptDefault } from 'meta-pixel';
import { useMetaPixel } from './PixelContext';
import { usePathname } from 'next/navigation';
// import { PIXEL_ID } from './pixel';

interface MetaPixelProps {
    children: React.ReactNode;
};

const MetaPixel:React.FC<MetaPixelProps> = ({ children }) => {
    const pathname = usePathname();
    const { consent } = useMetaPixel();
    const pixel = process.env.NEXT_PUBLIC_FB_PIXEL_ID!
    // const [loaded, setLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        if (!pathname) return;

        if (consent !== 'grant' || pixel === null) {
            console.log('pixel not loaded.');
            // count += 1;
            // console.log(count);
            return;
        };
        // count += 2;
        // console.log(count, consent);
        // PIXEL_GET();
        const fbq = addScriptDefault();
        
        fbq('init' , pixel);
        console.log('pixel init')
        fbq('track', 'PageView');
        fbq('track', 'AddToCart');
        fbq('track', 'InitiateCheckout');
        console.log('run complete');

        return () => {};
        
    }, [consent, pathname]);
    

    return (
        <>
            { children }
        </>
    )
};

export default MetaPixel;