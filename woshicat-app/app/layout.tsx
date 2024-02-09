import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Sofia_Sans_Semi_Condensed } from 'next/font/google';
import Header from "./components/header";
import Footer from "./components/footer";
import SmoothScroll from "./components/SmoothScroll";

const sofia_sans = Sofia_Sans_Semi_Condensed({
    weight: ['100', '200', '400'],
    subsets: ['latin-ext']
})

export const metadata: Metadata = {
  title: "Wo Shi Cat",
  description: "Wo Shi Cat Apparel Site",
  keywords: ['Apparel', 'Hoodies', 'T-shirts', 'Sweatshirts', 'Comfort', 'Quality', 'cat', 'loungewear',]
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en"> 
      <body className={sofia_sans.className}>
        <Header />

            {children}
          <Footer />

      </body>
    </html>
  );
}
