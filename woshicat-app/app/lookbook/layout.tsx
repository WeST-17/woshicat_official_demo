'use client';
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";
import Loader from "../components/transitions-navigation/LoadingScreen";
import { DarkMode } from "../components/toggles/Dark_Mode/darkModeContext";

export default function LookbookLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { darkMode } = DarkMode();

    return ( 
      <section className={`relative flex flex-col items-center w-full min-h-[100vh] mx-auto pt-5 lg:pt-10 ${darkMode ? "bg-stone-900/95 dark-text" : "bg-stone-200 light-text"}`}>
        <Suspense fallback={
          <Loader />}>
                {children}
        </Suspense>
        <TransitionSlide/>
      </section>
    )
}