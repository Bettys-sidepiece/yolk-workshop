'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Desktop footer
  if (!isMobile) {
    return (
      <footer className="w-full text-black bg-[--foreground] py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-poppins text-lg mb-4 md:mb-0 hover:text">
              {currentYear} Yolk Workshop
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-0 md:space-x-12">
              <a
                href="/terms"
                className="font-poppins text-lg hover:text-[--accent] transition-colors duration-100"
              >
                TERMS
              </a>
              <a
                href="https://github.com/Yolk-Workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-lg hover:text-[--accent] transition-colors duration-100"
              >
                GITHUB
              </a>
              <a
                href="https://instagram.com/yolkworkshop"
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-lg hover:text-[--accent] transition-colors duration-100"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  // Mobile footer that matches the navbar footer style
  return (
    <footer style={{
      width: '100%',
      padding: '1.5rem 0',
      backgroundColor: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        {/* Terms Link */}
        <a 
          href="/terms" 
          style={{
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            textDecoration: 'none'
          }}
        >
          TERMS
        </a>
        
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
      
      {/* Copyright */}
      <div style={{
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
        opacity: '0.8'
      }}>
        {currentYear} Yolk Workshop
      </div>
    </footer>
  )
}