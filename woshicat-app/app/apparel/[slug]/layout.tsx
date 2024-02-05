import Transition from "@/app/components/transition"

export default function ItemLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
    <section className="flex justify-center">
        <Transition>{children}</Transition>
    </section>
    )
}