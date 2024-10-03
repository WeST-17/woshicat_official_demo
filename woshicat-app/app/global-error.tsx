'use client'
import Link from "next/link"
import { Suspense } from "react"
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="w-screen h-[100vh] flex flex-col justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          {/* Your code using useSearchParams() */}
          <h2>Something went wrong!</h2>
          <Link href={'/'} className="bg-black/50 text-white p-2 hover:bg-black transition duration-250">Back to Home</Link>
        </Suspense>
        </div>
      </body>
    </html>
  )
}