import React from 'react'
import type { Metadata } from "next"
import CookieConsent from './components/cookiepopup'
import Navbar from './components/navbar'
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
      <body className="bg-white text-black">
        <CookieConsent />
        <Navbar />
        {children}
         <Footer />
      </body>
    </html>
  )
}