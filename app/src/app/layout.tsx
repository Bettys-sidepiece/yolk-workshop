import React from 'react'
import type { Metadata } from "next"
import CookieConsent from './components/cookiepopup'
import Navbar from './components/navbar'
import MobileNavbar from './components/mobilenav'
import Footer from './components/footer'
import "./globals.css"

export const metadata: Metadata = {
  title: "Yolk Workshop",
  description: "Design and Development Studio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className="bg-white text-black">
        <CookieConsent />
        
        {/* Desktop navbar - hidden on mobile */}
        <div className="hidden md:block">
          <Navbar />
        </div>
        
        {/* Mobile navbar - shown only on mobile */}
        <MobileNavbar />
        
        {children}
        <Footer />
      </body>
    </html>
  )
}