// app/not-found.tsx
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[--foreground] flex items-center justify-center py-32">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-[12rem] font-poppins font-light text-black mb-4">
          404
        </h1>
        
        <h2 className="text-4xl font-poppins font-light mb-8 text-black">
          Page Not Found
        </h2>
        
        <p className="text-xl font-poppins font-light mb-12 text-black max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-6">
          <Link 
            href="/"
            className="px-8 py-3 bg-black text-white font-poppins font-light hover:bg-[--accent] hover:text-black transition-colors duration-300"
          >
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 border border-black text-black font-poppins font-light hover:bg-black hover:text-white transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  )
}