import type { Metadata } from "next";
import "./globals.css";
import { Lato } from 'next/font/google';
import Header from "./components/header";
import Footer from "./components/footer";
import TransitionSlide from "./components/transitions-navigation/transitionWipe";
import { CartProvider } from "./components/cart/cartContext";
import { ToggleProvider } from "./components/toggles/toggleContext";
import SmoothScroll from "./components/toggles/SmoothScroll";
import Script from "next/script";
import { PIXEL_ID } from "./scripts/pixel";
import MetaPixel from "./components/metaPixel";


const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin-ext']
})

export const metadata: Metadata = {
  title: {
    template: '%s | WoShi Cat',
    default: 'WoShi Cat'
  },
  description: "WoShi Cat",
  keywords: ['Apparel', 'Hoodies', 'T-shirts', 'Sweatshirts', 'pants', 'Comfort', 'Quality', 'cat', 'cats', 'loungewear', 'chinese', 'japanese', 'asian', 'anime', 'subway', 'japan', 'work culture', 'hustle', 'tired','streetwear', 'small business', ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={`${lato.className} text-black w-full mx-auto bg-white`}>
            <CartProvider>
            <ToggleProvider>
            <Header />
            <SmoothScroll>
              {children}
            </SmoothScroll>
            <Footer />
            </ToggleProvider>
            </CartProvider>
        <TransitionSlide />
        <Script
          id="facebook-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
            `,
          }}
        />
        <Script
          id="facebook-pixel-pageview"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" className="hidden"
          src="https://www.facebook.com/tr?id=1622880498925402&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
