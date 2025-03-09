'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from './components/footer'

export default function Home() {
  const [scroll, setScroll] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [navRef, setNavRef] = useState(null)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    setIsClient(true)
    setWindowHeight(window.innerHeight)

    const handleScroll = () => {
      const position = window.scrollY
      setScroll(position)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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

  const MIN_LOGO_SIZE = 200

  const logoSize = Math.max(1000 - scroll * 2, MIN_LOGO_SIZE)
  const logoOpacity = logoSize === MIN_LOGO_SIZE ? 1 : Math.max(1 - scroll / 500, 0.5)
  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'DESIGNS', href: '/designs' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'RECORD', href: '/record' },
  ]

  // Default position for server-side rendering
  const initialPosition = {
    top: '50%',
    transform: 'translateY(-50%)'
  }

  // Calculate position only on client side
  const position = isClient ? {
    top: logoSize === MIN_LOGO_SIZE ? '0' : '40%',
    transform: logoSize === MIN_LOGO_SIZE ? 'translateY(0)' : 'translateY(-50%)'
  } : initialPosition

  return (
    <div className='flex flex-col min-h-screen'>
      <main>
        <section className="relative h-[100vh]">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/sunny_side_down_close_top.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Center container for logo and nav */}
          <div
            className="fixed w-full flex flex-col items-center pointer-events-none z-50 transition-all duration-400"
            style={position}
          >
            {/* Logo container */}
            <div
              className="relative transition-all duration-400 cursor-pointer"
              style={{
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                opacity: logoOpacity,
                marginTop: isClient && logoSize === MIN_LOGO_SIZE ? '-3rem' : '0vh'
              }}
              onClick={scrollToTop}
            >
              <Image
                src="/yolkworkshop_logo_black.png"
                alt="Yolk Workshop"
                fill
                className="object-contain"
                style={{ 
                  borderRadius: '10px'}}
                priority
              />
            </div>
            {/* Navigation */}
            <nav
              ref={setNavRef}
              className={`-mt-10 transition-all duration-300 pointer-events-auto ${scroll > 50 ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <ul className={`flex flex-row items-center space-x-20 transition-opacity duration-300 ${isMouseNear() ? 'opacity-100' : 'opacity-5'
                }`}>
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
        </section>

        {/* Content sections with proper spacing and shadows */}
        <div className="container mx-auto px-4" style={{ maxWidth: '1800px' }}>
          {/* Yolk Keyboard Section */}
          <div className="mb-16 pt-16">
            <div style={{ borderRadius: '10px', height: '50vh', minHeight: '800px' }} className="relative bg-[--background] text-black overflow-hidden">
              {/* Image container */}
              <div className="absolute inset-0 z-0" style={{ borderRadius: '10px' }}>
                <div style={{
                  position: 'sticky',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <Image
                    src="/Main-View-keyboard-edit.png"
                    alt="Yolk Keyboard"
                    fill
                    className="object-cover"
                    style={{ 
                      borderRadius: '10px'}}
                    priority
                  />
                </div>
              </div>

              {/* Content container */}
              <div className="relative z-10 h-full flex flex-col justify-between p-12">
                {/* Empty div for spacing */}
                <div></div>

                {/* Bottom container with design name and explore button */}
                <div className="flex justify-between items-end w-full">
                  {/* Explore link - the only clickable element */}
                  <Link
                    href="/designs/yolk-keyboard"
                    className="bg-black hover:bg-[--accent] hover:text-[--black] text-white font-poppins text-xl py-3 px-8 rounded-full transition-all duration-300 "
                  >
                    Explore
                  </Link>

                  {/* Design name at bottom right */}
                  <h2 className="text-6xl font-poppins font-extralight text-black">Yolk Keyboard</h2>
                </div>
              </div>
            </div>
          </div>

          {/* About Section - same width as designs section */}
          <div className="mb-32 pt-16">
            <section id="about" style={{ borderRadius: '10px', height: 'auto', minHeight: 'auto' }} className="relative bg- text-black overflow-hidden w-full">
              <div className="relative z-10 p-16">
                {/* Large heading centered */}

                {/* Text content centered with proper spacing */}
                <div className="space-y-12 text-center mx-auto w-2/3">
                  <p className="text-2xl md:text-2xl lg:text-3xl font-poppins font-light leading-relaxed">
                    Yolk Workshop is a design and engineering studio focused on creating <strong>functional, artistic electronics</strong> inspired by contemporary media, nature, technology, and human-computer interaction.
                  </p>

                  <p className="text-2xl md:text-2xl lg:text-3xl font-poppins font-light leading-relaxed">
                    Blending form and function, we develop innovative tools that challenge conventional design while maintaining efficiency and usability. Our work explores the intersection of hardware, sound, and interaction, starting with the <strong>Yolk Keyboard</strong> and expanding into new creative technologies.
                  </p>

                  <p className="text-2xl md:text-2xl lg:text-3xl font-poppins font-light leading-relaxed">
                    At Yolk Workshop, we believe in <strong>rethinking electronic design</strong>—crafting devices that feel <strong>intuitive, immersive, and inspired</strong> for all.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Recent Record Section */}
        {/* Recent Record Section with Dynamic Updates */}
        <div className="container mx-auto px-4" style={{ maxWidth: '1800px' }}>
          <div className="mb-32 pt-16">
            <section style={{ borderRadius: '10px', height: 'auto', minHeight: 'auto' }} className="relative bg-[#e0e0e0] text-black overflow-hidden shadow-lg border border-gray-200 w-full p-12">
              {/* Section heading */}
              <h2 className="text-7xl font-poppins font-extralight mb-8 text-center">
                <strong>Discourse</strong>
              </h2>

              {/* Record updates container */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                {/* Most recent update */}
                <Link href="/record/1" className="block w-full sm:w-[30%]">
                  <div className="bg-[--background] rounded-lg w-full aspect-square flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105">
                    <div className="bg-black bg-opacity-25 p-3">
                      <span className="text-white font-medium">January 15, 2025</span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <h3 className="text-2xl font-poppins font-medium text-black">
                        Yolk Keyboard Production Update
                      </h3>
                      <div className="mt-4">
                        <Image
                          src="/path-to-update-image.jpg"
                          alt="Keyboard production"
                          width={200}
                          height={150}
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Second recent update */}
                <Link href="/record/2" className="block w-full sm:w-[30%]">
                  <div className="bg-[--background] rounded-lg w-full aspect-square flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105">
                    <div className="bg-black bg-opacity-25 p-3">
                      <span className="text-white font-medium">January 4, 2025</span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <h3 className="text-2xl font-poppins font-medium text-black">
                        New Color Options
                      </h3>
                      <div className="mt-4">
                        <Image
                          src="/path-to-colors-image.jpg"
                          alt="New keyboard colors"
                          width={200}
                          height={150}
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Third recent update */}
                <Link href="/record/3" className="block w-full sm:w-[30%]">
                  <div className="bg-[--background] rounded-lg w-full aspect-square flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105">
                    <div className="bg-black bg-opacity-25 p-3">
                      <span className="text-white font-medium">December 28, 2024</span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <h3 className="text-2xl font-poppins font-medium text-black">
                        Testing Success
                      </h3>
                      <div className="mt-4">
                        <Image
                          src="/path-to-testing-image.jpg"
                          alt="Keyboard testing"
                          width={200}
                          height={150}
                          className="object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* View Record button - centered */}
              <div className="flex justify-center">
                <Link
                  href="/record"
                  className="bg-black text-white font-poppins text-xl py-3 px-10 rounded-full transition-all duration-300 button-hover-accent hover:text-[--black]"
                >
                  view record
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Kickstarter Section */}
        <div className="container mx-auto px-4 mb-32" style={{ maxWidth: '1800px' }}>
          <div className="relative" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff5722] to-[#ff9800]" style={{ borderRadius: '10px' }}>
              <div className="absolute inset-0 bg-black bg-opacity-30" style={{ borderRadius: '10px' }}></div>
            </div>

            <div className="relative z-10 py-20 px-12 text-white text-center">
              <h2 className="text-7xl font-poppins font-light mb-8">Coming to Kickstarter</h2>
              <p className="text-3xl font-light mb-12 max-w-3xl mx-auto">
                Be among the first to own the revolutionary Yolk Keyboard.
                Join our journey to redefine typing experiences.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
                <Link
                  href="#subscribe"
                  className="bg-white button-hover-accent text-black font-poppins text-xl py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Notified
                </Link>
                <p className="text-xl opacity-90">Launch Date: Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}