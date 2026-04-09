"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { addScriptDefault } from "./mpixel_script";
import { useMetaPixel } from "./PixelContext";

const META_PIXEL_ID = process.env.FB_PIXEL_ID!;

interface FacebookPixelProps {
    event_type?: string,
};

const MetaPixel:React.FC<FacebookPixelProps> = ({ event_type }) => {
  const [loaded, setLoaded] = useState(false);
  const { consent } = useMetaPixel();
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;
    const fbq = addScriptDefault();
    fbq('consent', 'revoke');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
    if (event_type === 'AddToCart') fbq('track', event_type);
    if (event_type === 'InitiateCheckout') fbq('track', event_type);
    if(consent === 'grant') fbq('consent', consent);

    return () => {};

  }, [pathname, loaded, consent]);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/mpixel_script.ts"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={META_PIXEL_ID}
      />
    </div>
  );
};

export default MetaPixel;