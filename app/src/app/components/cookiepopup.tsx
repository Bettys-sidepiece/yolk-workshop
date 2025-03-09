'use client'
import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
      <div className="bg-white p-8 max-w-2xl mx-4 rounded-lg">
        <h2 className="font-poppins font-bold text-2xl mb-4">Cookie Consent</h2>
        <p className="font-poppins text-lg mb-6">
          This website uses cookies to enhance your experience. By clicking <strong>'Accept'</strong> you agree to our use of cookies.
        </p>
        <div className="flex justify-end">
          <button
            onClick={acceptCookies}
            className="font-poppins font-bold px-8 py-3 bg-black text-white hover:bg-[--accent] hover:text-black transition-colors duration-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}