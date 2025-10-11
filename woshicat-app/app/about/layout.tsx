
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitions-navigation/transitionWipe";
import LoadingScreen from "@/app/components/transitions-navigation/loading";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex w-full h-fit justify-center items-center">
        <Suspense fallback={
          <div className="h-full w-screen flex justify-center items-center">
            <LoadingScreen />
          </div>}>
          {children}
        </Suspense>
        <TransitionSlide />
      </section>
    )
}