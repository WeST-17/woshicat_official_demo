'use client';
import React from 'react';
import { setup } from 'meta-pixel'
import { PIXEL_ID } from './pixel';

interface MetaProps {
    children: React.ReactNode
}

const MetaPixel:React.FC<MetaProps> = ({ children }) => {

    const { $fbq } = setup()
    .init(`${PIXEL_ID}`)
    .pageView()

    $fbq('track', 'CompleteRegistration')

    return (
        <>
            {children}
        </>
    )
};

export default MetaPixel;