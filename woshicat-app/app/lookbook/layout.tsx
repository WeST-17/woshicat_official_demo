
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";
import Loader from "../components/transitions-navigation/LoadingScreen";

export default function LookbookLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="relative flex flex-col items-center bg-stone-900 w-full min-h-[100vh] mx-auto pt-5 lg:pt-10">
        <Suspense fallback={
          <Loader />}>
                {children}
        </Suspense>
        <TransitionSlide/>
      </section>
    )
}