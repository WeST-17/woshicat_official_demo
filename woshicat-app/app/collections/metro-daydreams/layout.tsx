import Transition from "@/app/components/transition";
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";
import Loader from "@/app/components/LoadingScreen";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
        <Suspense 
          fallback={<Loader/>}
        >
          <Transition>{children}</Transition>
        </Suspense>
        <TransitionSlide />
      </section>
    )
}