import Transition from "@/app/components/transition";
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";

export default function ComicLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
        <Suspense fallback={
          <div className="h-[100vh] w-screen flex justify-center items-center">
            <div className="loader-screen"></div>
          </div>}>
          <Transition>{children}</Transition>
        </Suspense>
        <TransitionSlide />
      </section>
    )
}