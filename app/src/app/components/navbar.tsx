/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scroll, setScroll] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [navRef, setNavRef] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const initialLogoOpacity = 0
  const animationTimerRef = useRef(null)
  
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
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
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

  // Check if we're on the homepage
  const isHomePage = pathname === '/'
  
  // Define nav items based on current page
  const navItems = isHomePage 
    ? [
        { name: 'ABOUT', href: '#about' },
        { name: 'DESIGNS', href: '/designs' },
        { name: 'CONTACT', href: '/contact' },
        { name: 'RECORD', href: '/record' },
      ]
    : [
        { name: 'HOME', href: '/' },
        { name: 'DESIGNS', href: '/designs' },
        { name: 'CONTACT', href: '/contact' },
        { name: 'RECORD', href: '/record' },
      ]

  // For the homepage, handle scrolling logo
  const MIN_LOGO_SIZE = 150
  const MAX_LOGO_SIZE = 285
  
  // Calculate scroll ratio for a smoother transition (used for homepage)
  const pageHeight = isClient ? window.innerHeight : 1000
  const rawScrollRatio = Math.min(scroll / pageHeight, 1)
  const scrollRatio = 1 - Math.pow(1 - rawScrollRatio, 3)
  
  // Calculate logo size based on scroll position (for homepage)
  const logoSize = isHomePage 
    ? Math.max(MAX_LOGO_SIZE - (scrollRatio * (MAX_LOGO_SIZE - MIN_LOGO_SIZE)), MIN_LOGO_SIZE)
    : 150 // Fixed size for non-homepage
  
  // Calculate opacity for homepage logo
  const shrinkProgress = isHomePage
    ? (MAX_LOGO_SIZE - logoSize) / (MAX_LOGO_SIZE - MIN_LOGO_SIZE)
    : 1
  const calculatedLogoOpacity = Math.min(initialLogoOpacity + shrinkProgress, 1)
  
  // Position calculation for homepage
  const topPercentage = isHomePage 
    ? Math.max(50 - (scrollRatio * 50), 0) // Starts at 50%, goes toward 0%
    : 0 // Fixed at top for non-homepage
  
  // Position calculation with proper values
  const position = isClient
    ? {
        top: `${topPercentage}%`,
        transform: topPercentage > 0 ? 'translateY(-50%)' : 'translateY(0)',
        transition: 'top 0.5s ease-out, transform 0.5s ease-out'
      }
    : { top: isHomePage ? '50%' : '0', transform: isHomePage ? 'translateY(-50%)' : 'none' }
  
  // Get nav opacity based on scroll position and mouse proximity
  const getNavOpacity = () => {
    if (isHomePage) {
      return shrinkProgress >= 0.5 ? (isMouseNear() ? 'opacity-100' : 'opacity-5') : 'opacity-0'
    } else {
      if (scroll <= 50) return 'opacity-100' // Always visible at top
      return isMouseNear() ? 'opacity-100' : 'opacity-10' // Fade based on mouse proximity when scrolled
    }
  }
  
  // Scroll to top function for homepage logo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  return (
    <div 
      className="fixed w-full flex flex-col items-center pointer-events-none z-50"
      style={position}
    >
      {/* Logo container */}
      <div
        className="relative transition-all duration-700 cursor-pointer pointer-events-auto"
        style={{
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          opacity: logoLoaded ? calculatedLogoOpacity : 0,
          marginTop: isHomePage && topPercentage === 0 ? '-3rem' : (isHomePage ? '0' : '-2rem'),
          transition: 'opacity 0.7s ease, width 0.6s ease-out, height 0.6s ease-out, margin-top 0.6s ease-out'
        }}
        onClick={scrollToTop}
      >
        <Image
          src="/yolkworkshop_logo_black.png"
          alt="Yolk Workshop"
          fill
          className="object-contain"
          style={{
            borderRadius: '10px'
          }}
          priority
          onLoad={() => setLogoLoaded(true)}
        />
      </div>

      {/* Navigation */}
      <nav
        ref={setNavRef}
        className={`transition-all duration-700 pointer-events-auto ${
          isHomePage 
            ? shrinkProgress >= 0.5 ? 'opacity-100 -mt-6' : 'opacity-0 -mt-10'
            : '-mt-4'
        }`}
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