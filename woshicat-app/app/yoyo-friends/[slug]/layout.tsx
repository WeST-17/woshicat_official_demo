
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";
import Loader from "@/app/components/LoadingScreen";

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