import type { Metadata } from "next";
import "./globals.css";
import { Lato } from 'next/font/google';
import Header from "./components/header";
import Footer from "./components/footer";
import TransitionSlide from "./components/transitions-navigation/transitionWipe";
import { CartProvider } from "./components/cart/cartContext";
import { ToggleProvider } from "./components/toggles/toggleContext";
import SmoothScroll from "./components/toggles/SmoothScroll";
import UserConsent from "./components/MetaPixel/userConsent";
import { PixelProvider } from "./components/MetaPixel/PixelContext";
import MetaPixel from "./components/MetaPixel/metaPixel";
import { DarkModeProvider } from "./components/toggles/Dark_Mode/darkModeContext";


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
      
      <body className={`${lato.className} w-full mx-auto`}>
        <PixelProvider>
        <DarkModeProvider>
        <CartProvider>
        <ToggleProvider>
          
          <Header />
          <SmoothScroll>
            <MetaPixel>
              {children}
            </MetaPixel>
          </SmoothScroll>
          <Footer />
          
        </ToggleProvider>
        </CartProvider>
          <UserConsent />
        <TransitionSlide />
        </DarkModeProvider>
        </PixelProvider>
      </body>
    </html>
  );
}
