'use client';
import Link from "next/link";
 
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
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <h2 className="mb-4 text-2xl">{`Oops! Something happened on our end`}</h2>
          <Link href={'/'} className="bg-black/50 text-white p-2 hover:bg-black transition duration-250">Back to Home</Link>
        </div>
      </body>
    </html>
  )
}