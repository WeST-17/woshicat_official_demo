import Transition from "@/app/components/transition";
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";

export default function ItemLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center pt-32 p-4">
        <Suspense fallback={
          <div className="h-[100vh] w-screen flex justify-center items-center">
            <div>Loading...</div>
          </div>}>
          <Transition>{children}</Transition>
        </Suspense>
        <TransitionSlide />
      </section>
    )
}