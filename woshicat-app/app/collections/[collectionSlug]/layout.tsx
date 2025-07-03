
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
        <Suspense 
          fallback={<div className="loader"/>}
        >
          {children}
        </Suspense>
        <TransitionSlide />
      </section>
    )
}