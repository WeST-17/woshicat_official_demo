'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setup } from 'meta-pixel'
import { useMetaPixel } from './PixelContext';
import Image from 'next/image';

const PIXEL_ID = process.env.FB_PIXEL_ID;

const MetaPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();
    const { consent } = useMetaPixel();

    useEffect(() => {
        if (!loaded || consent === 'revoke') return;

        const { $fbq } = setup()
        .init(`${PIXEL_ID}`)
        .pageView()

        $fbq('track', 'InitiateCheckout');
        console.log('run complete');
        
    }, [pathname, loaded]);
    

    return (
        <>
            {consent === 'grant' && (<Image
                alt="meta-pixel"
                height={1}
                width={1}
                style={{ display: 'none' }}
                // className='border-test'
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                onLoad={() => setLoaded(true)}
            />)}
        </>
    )
};

export default MetaPixel;