'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scroll, setScroll] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [navRef, setNavRef] = useState(null)
  const [_isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleScroll = () => {
      const position = window.scrollY
      setScroll(position)
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Function to check if mouse is near navigation
  const isMouseNear = () => {
    if (!navRef) return false
    const rect = navRef.getBoundingClientRect()
    const proximity = 100 // Distance in pixels to trigger visibility

    return mousePosition.y <= (rect.bottom + proximity) &&
      mousePosition.y >= (rect.top - proximity) &&
      mousePosition.x >= (rect.left - proximity) &&
      mousePosition.x <= (rect.right + proximity)
  }

  const isHomePage = pathname === '/'
  
  // Don't render navbar on home page since it has its own
  if (isHomePage) return null

  const navItems = [
    { name: 'HOME', href: '/#designs' },
    { name: 'DESIGNS', href: '/designs' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'RECORD', href: '/record' },
  ]

  // Get nav opacity based on scroll position and mouse proximity
  const getNavOpacity = () => {
    if (scroll <= 50) return 'opacity-100' // Always visible at top
    return isMouseNear() ? 'opacity-100' : 'opacity-10' // Fade based on mouse proximity when scrolled
  }

  return (
    <div className="fixed w-full flex flex-col items-center pointer-events-none z-50">
      {/* Logo container */}
      <div
        className="relative transition-all duration-400 cursor-pointer pointer-events-auto"
        style={{
          width: '150px',
          height: '150px',
          marginTop: '-2rem'
        }}
      >
        <Link href="/">
          <Image
            src="/yolkworkshop_logo_black.png"
            alt="Yolk Workshop"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav
        ref={setNavRef}
        className="transition-all duration-300 pointer-events-auto -mt-4"
      >
        <ul className={`flex flex-row items-center space-x-20 transition-opacity duration-300 ${getNavOpacity()}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-poppins text-black hover:text-[--accent] transition-colors duration-100 text-3xl"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}