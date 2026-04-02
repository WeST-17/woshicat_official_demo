'use client';
import Link from "next/link";
import { useEffect } from "react";
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Root error boundary caught:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <h2 className="mb-4 text-2xl">{`Oops! Something happened on our end`}</h2>
          <p className="mb-4 text-red-600">
          {error.message || 'An unexpected error occurred'}
        </p>
        {error.digest && (
          <p className="mb-4 font-mono text-red-400 text-xs">
            Error ID: {error.digest}
          </p>
        )}
          <button type="button" onClick={reset} className="border-[0.5px] text-black p-2 transition duration-300 hover:text-red-800 rounded-lg">Return to Home</button>
        </div>
      </body>
    </html>
  )
}