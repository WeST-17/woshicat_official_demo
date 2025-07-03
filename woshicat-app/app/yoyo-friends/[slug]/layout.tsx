
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";
import Loader from "@/app/components/transitions-navigation/LoadingScreen";

export default function ComicLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
        <Suspense fallback={
          <Loader/>}>
          {children}
        </Suspense>
        <TransitionSlide />
      </section>
    )
}