import Transition from "@/app/components/transition";
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";
import Loader from "../components/LoadingScreen";

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