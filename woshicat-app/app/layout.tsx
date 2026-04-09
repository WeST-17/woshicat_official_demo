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
        <PixelProvider>
        <CartProvider>
        <ToggleProvider>
          <Header />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Footer />
        </ToggleProvider>
        </CartProvider>
          <UserConsent />
        <TransitionSlide />
        <MetaPixel />
        </PixelProvider>
      </body>
    </html>
  );
}
