'use client';
import { Suspense } from "react";
import TransitionSlide from "../components/transitions-navigation/transitionWipe";
import Loader from "../components/transitions-navigation/LoadingScreen";
import { DarkMode } from "../components/toggles/Dark_Mode/darkModeContext";

export default function ComicLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { darkMode } = DarkMode();

    return ( 
      <section className={`flex justify-center py-20 ${darkMode ? 'bg-stone-900/95 dark-text' : 'bg-white light-text'}`}>
        <Suspense fallback={
          <Loader/>}>
          {children}
        </Suspense>
        <TransitionSlide />
      </section>
    )
}