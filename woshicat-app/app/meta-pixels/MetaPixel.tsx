'use client';

import { setup } from 'meta-pixel'
import { PIXEL_ID } from './pixel';

const MetaPixel = ({}) => {

    const { $fbq } = setup()
    .init(`${PIXEL_ID}`)
    .pageView()

    $fbq('track', 'CompleteRegistration')

    return (
        <>
            
        </>
    )
};

export default MetaPixel;