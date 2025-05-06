
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
        <Suspense fallback={
            <div className="loader"></div>}>
          {children}
        </Suspense>
        <TransitionSlide/>
      </section>
    )
}