'use client';
import TransitionSlide from "@/app/components/transitionWipe";

export default function LookbookLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
            {children}
        <TransitionSlide />
      </section>
    )
};