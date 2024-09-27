import type { Metadata } from "next";
import "./globals.css";
import { Changa } from 'next/font/google';
import Header from "./components/header";
import Footer from "./components/footer";
import Transition from "./components/transition";
import TransitionSlide from "./components/transitionWipe";
import { CartProvider } from "./components/cart/cartContext";
import LayoutWrapper from "./components/pathnameCheck";

const changa = Changa({
    weight: ['300', '400', '600'],
    subsets: ['latin-ext']
})

export const metadata: Metadata = {
  title: "WoShi Cat",
  description: "WoShi Cat Apparel Site",
  keywords: ['Apparel', 'Hoodies', 'T-shirts', 'Sweatshirts', 'Comfort', 'Quality', 'cat', 'loungewear', 'chinese', 'japanese', 'asian', 'anime', 'subway', 'japan', 'work culture', 'hustle', 'tired']
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body className={changa.className}>
          <LayoutWrapper>
            <CartProvider>
            <Header />
              <Transition>
              {children}
              </Transition>
            <Footer />
            </CartProvider>
          </LayoutWrapper>
        <TransitionSlide />
      </body>
    </html>
  );
}
