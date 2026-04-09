'use client';
import React, { useEffect } from 'react';
import { addScriptDefault } from 'meta-pixel';
import { useMetaPixel } from './PixelContext';
import { usePathname } from 'next/navigation';
import { PIXEL_ID } from './pixel';

interface MetaPixelProps {
    children: React.ReactNode;
}

const MetaPixel:React.FC<MetaPixelProps> = ({ children }) => {
    const pathname = usePathname();
    const { consent } = useMetaPixel();

    useEffect(() => {
        if (!pathname || consent !== 'grant') return;
        const fbq = addScriptDefault();
        fbq('init' ,`${PIXEL_ID}`);
        fbq('track', 'PageView');
        fbq('track', 'AddToCart');
        fbq('track', 'InitiateCheckout');
        console.log('run complete');
        
    }, [pathname, consent]);
    

    return (
        <>
            { children }
        </>
    )
};

export default MetaPixel;