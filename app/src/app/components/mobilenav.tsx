'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function BlackSquareNavbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  // Handle closing the menu
  const closeMenu = () => {
    setIsOpen(false)
  }
  
  // Check if we're on the home page
  const isHomePage = pathname === '/'
  
  // Choose navigation items based on current page
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
  
  return (
    // Only display this component on mobile/tablet screens
    <div className="block md:hidden">
      {/* Rounded corner button with black lines */}
      <div 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          width: '40px',
          height: '40px',
          background: 'white',
          borderRadius: '8px',
          zIndex: 9999,
          display: isOpen ? 'none' : 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ width: '24px', height: '2px', backgroundColor: 'black', marginBottom: '6px' }}></div>
        <div style={{ width: '24px', height: '2px', backgroundColor: 'black', marginBottom: '6px' }}></div>
        <div style={{ width: '24px', height: '2px', backgroundColor: 'black' }}></div>
      </div>

      {/* Menu overlay - inverted colors */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'black',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '100px',
          paddingBottom: '30px'
        }}>
          {/* Close button - always visible */}
          <div 
            onClick={closeMenu}
            style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              background: 'black',
              borderRadius: '8px',
              zIndex: 10000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid white'
            }}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              position: 'relative',
            }}>
              <div style={{ 
                position: 'absolute',
                width: '24px', 
                height: '2px', 
                backgroundColor: 'white',
                transform: 'rotate(45deg)',
                top: '11px'
              }}></div>
              <div style={{ 
                position: 'absolute',
                width: '24px', 
                height: '2px', 
                backgroundColor: 'white',
                transform: 'rotate(-45deg)',
                top: '11px'
              }}></div>
            </div>
          </div>

          {/* Top part with logo and nav */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%'
          }}>
            {/* Logo - inverted */}
            <div style={{ 
              position: 'relative', 
              width: '160px', 
              height: '80px',
              marginBottom: '40px',
              filter: 'invert(1)'
            }}>
              <Image
                src="/yolkworkshop_logo_black.png"
                alt="Yolk Workshop"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            {/* Navigation links - white text */}
            <nav style={{ width: '100%' }}>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '35px'
              }}>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      style={{ 
                        color: 'white', 
                        fontSize: '28px',
                        textDecoration: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '0.05em'
                      }}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer with social links */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'auto',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'center'
            }}>
              {/* Terms Link */}
              <Link 
                href="/terms" 
                style={{
                  color: 'white',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  textDecoration: 'none'
                }}
                onClick={closeMenu}
              >
                TERMS
              </Link>
              
              {/* GitHub Logo */}
              <a 
                href="https://github.com/Yolk-Workshop" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" />
                </svg>
              </a>
              
              {/* Instagram Logo */}
              <a 
                href="https://instagram.com/yolkworkshop" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}