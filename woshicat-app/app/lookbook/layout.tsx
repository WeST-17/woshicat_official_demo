'use client';
import Transition from "@/app/components/transition";
import TransitionSlide from "@/app/components/transitionWipe";

export default function LookbookLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
          <Transition>
            {children}
          </Transition>
        <TransitionSlide />
      </section>
    )
};