'use client';

export default function ComingSoonLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return ( 
      <section className="flex justify-center">
          {children}
      </section>
    )
}