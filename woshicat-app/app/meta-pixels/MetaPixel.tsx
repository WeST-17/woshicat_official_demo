'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setup } from 'meta-pixel'
import { PIXEL_ID } from './pixel';
// import Script from 'next/script';
import Image from 'next/image';


const MetaPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const { $fbq } = setup()
        .init(`${PIXEL_ID}`)
        .pageView()

        $fbq('track', 'CompleteRegistration');
        // console.log('run complete');
        
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