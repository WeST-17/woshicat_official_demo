import Transition from "@/app/components/transition"
import { Suspense } from "react"

export default function ItemLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
    <section className="flex justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Transition>{children}</Transition>
      </Suspense>
    </section>
    )
}