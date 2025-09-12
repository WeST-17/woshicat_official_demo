import type { Metadata } from "next";
import "./globals.css";
import { Lato } from 'next/font/google';
import Header from "./components/header";
import Footer from "./components/footer";
import TransitionSlide from "./components/transitions-navigation/transitionWipe";
import { CartProvider } from "./components/cart/cartContext";
import { ToggleProvider } from "./components/toggles/toggleContext";
import SmoothScroll from "./components/toggles/SmoothScroll";


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
  keywords: ['Apparel', 'Hoodies', 'T-shirts', 'Sweatshirts', 'pants', 'Comfort', 'Quality', 'cat', 'loungewear', 'chinese', 'japanese', 'asian', 'anime', 'subway', 'japan', 'work culture', 'hustle', 'tired','streetwear']
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      
      <body className={`${lato.className} text-stone-800 w-full mx-auto`}>
            <CartProvider>
            <ToggleProvider>
            <Header />
            <SmoothScroll>
            <div className="w-full mt-[70px]"/>
              {children}
            </SmoothScroll>
            <Footer />
            </ToggleProvider>
            </CartProvider>
        <TransitionSlide />
      </body>
      
    </html>
  );
}
