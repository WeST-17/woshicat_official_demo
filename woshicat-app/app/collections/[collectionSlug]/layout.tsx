'use client';
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";
import { DarkMode } from "@/app/components/toggles/Dark_Mode/darkModeContext";
import Loader from "@/app/components/transitions-navigation/LoadingScreen";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { darkMode } = DarkMode();

    return ( 
      <section className={`flex justify-center ${darkMode ? "bg-stone-900/95 dark-text" : "bg-white/95 light-text"}`}>
        <Suspense 
          fallback={<Loader />}
        >
          {children}
        </Suspense>
        <TransitionSlide />
      </section>
    )
}