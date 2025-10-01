
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center mt-16">
        <Suspense fallback={
          <div className="loader"></div>}>
          {children}
        </Suspense>
        <TransitionSlide/>
      </section>
    )
}