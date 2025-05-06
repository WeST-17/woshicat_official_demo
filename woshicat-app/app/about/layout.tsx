
import { Suspense } from "react";
import TransitionSlide from "@/app/components/transitionWipe";
import LoadingScreen from "@/app/components/loading";

export default function ApparelLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex w-full justify-center">
        <Suspense fallback={
          <div className="h-[100vh] w-screen flex justify-center items-center">
            <LoadingScreen />
          </div>}>
          {children}
        </Suspense>
        <TransitionSlide />
      </section>
    )
}