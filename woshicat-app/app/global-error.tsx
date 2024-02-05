'use client'
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
        <Suspense fallback={<div>Loading...</div>}>
          {/* Your code using useSearchParams() */}
          <h2>Something went wrong!</h2>
        </Suspense>
      </body>
    </html>
  )
}