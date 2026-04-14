'use client';
import React, { useEffect } from 'react';
import { addScriptDefault } from 'meta-pixel-custom-wt-2026';
import { useMetaPixel } from './PixelContext';
import { usePathname } from 'next/navigation';
import { useCart } from '../cart/cartContext';

interface MetaPixelProps {
    children: React.ReactNode;
};

const MetaPixel:React.FC<MetaPixelProps> = ({ children }) => {
    const pathname = usePathname();
    const { consent, pixelActive, setPixelActive, checkoutClick } = useMetaPixel();
    const { currentItem } = useCart();
    const pixel = process.env.NEXT_PUBLIC_FB_PIXEL_ID!
    
    useEffect(() => {
        if (!pathname) return;

        if (consent !== 'grant' || pixel === null) {
            console.log('pixel not loaded.');
            return;
        };
        
        const fbq = addScriptDefault();

        if (pixelActive === false) {
            fbq('consent', 'revoke');
            fbq('init' , pixel);
            console.log('pixel init');

            setPixelActive(true);
            console.log('pixel active');
        };

        fbq('trackCustom', 'PageView', {content_name: pathname});
        fbq('track', 'ViewContent', {content_name: pathname});
        console.log('tracking path ', pathname);
        
        if (checkoutClick) {
            fbq('track', 'InitiateCheckout');
            console.log('checkout initiated');
        };
        
        if (currentItem) {
            fbq('trackCustom', 'AddToCart', {content_name: pathname, contents: [currentItem]});
            console.log(currentItem, " added");
        } else {
            fbq('track', 'AddToCart');
        }
        
        console.log('run complete');
        if (consent === 'grant') fbq('consent', consent);
        return () => {};
        
    }, [consent, pathname, currentItem, checkoutClick]);
    

    return (
        <>
            { children }
        </>
    )
};

export default MetaPixel;