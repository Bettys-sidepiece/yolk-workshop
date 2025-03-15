/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import ScrollTriggeredVideo from './components/scrolltriggeredvideo'

export default function Home() {
  const [scroll, setScroll] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const animationTimerRef = useRef(null)

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
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <main>
        {/* Hero Section */}
        <section className="mb-10 relative h-[100vh]">
          {/* Background image with keyboard */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/sunny_side_down3.png"
                alt="Background"
                fill
                className="object-cover"
                quality={100}
                style={{
                  transform: 'scale(1)',
                  transformOrigin: 'center center'
                }}
                priority
              />
            </div>
          </div>
          
          
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4" style={{ maxWidth: '1800px' }}>
          {/* Yolk Keyboard Section - Preserving Desktop View */}
          <div className="mb-2 pt-16">
            <div style={{ borderRadius: '10px', height: '50vh', minHeight: '800px' }} className="relative bg-[--background] text-black overflow-hidden">
              {/* Video container */}
              <div className="absolute inset-0 z-0" style={{ borderRadius: '10px' }}>
                <div style={{
                  position: 'sticky',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  <ScrollTriggeredVideo
                    src="/sequence1.mp4"
                    type="video/mp4"
                  />
                </div>
              </div>

              {/* Content container */}
              <div className="relative z-10 h-full flex flex-col justify-between p-12">
                {/* Empty div for spacing */}
                <div></div>

                {/* Bottom container with design name and explore button */}
                <div className="hidden md:flex justify-between items-end w-full">
                  {/* Explore link - the only clickable element */}
                  <Link
                    href="/designs/yolk-keyboard"
                    className="bg-black hover:bg-[--accent] hover:text-[--black] text-white font-poppins text-xl py-3 px-8 rounded-full transition-all duration-300"
                  >
                    Explore
                  </Link>

                  {/* Design name at bottom right */}
                  <h2 className="text-6xl font-poppins font-extralight text-black">Yolk Keyboard</h2>
                </div>
                
                {/* Mobile version of the same content */}
                <div className="md:hidden flex flex-col items-center w-full space-y-6">
                  {/* Design name centered on mobile */}
                  <h2 className="text-3xl font-poppins font-extralight text-black text-center">
                    Yolk Keyboard
                  </h2>
                  
                  {/* Explore link centered on mobile */}
                  <Link
                    href="/designs/yolk-keyboard"
                    className="bg-black hover:bg-[--accent] hover:text-[--black] text-white text-center font-poppins text-base py-2 px-4 rounded-full transition-all duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* About Section - Preserving Desktop View */}
          <div className="mb-2 pt-16">
            <section id="about" style={{ borderRadius: '10px', height: 'auto', minHeight: 'auto' }} className="relative bg- text-black overflow-hidden w-full">
              <div className="relative z-10 p-16">
                {/* Text content centered with proper spacing */}
                <div className="space-y-12 text-center mx-auto w-full md:w-2/3">
                  <p className="text-xl md:text-2xl lg:text-3xl font-poppins font-light leading-relaxed">
                    Yolk Workshop is a design and engineering studio focused on creating <strong>functional, artistic electronics</strong> inspired by contemporary media, nature, technology, and human-computer interaction.
                  </p>

                  <p className="text-xl md:text-2xl lg:text-3xl font-poppins font-light leading-relaxed">
                    Blending form and function, we develop innovative tools that challenge conventional design while maintaining efficiency and usability. Our work explores the intersection of hardware, sound, and interaction, starting with the <strong>Yolk Keyboard</strong> and expanding into new creative technologies.
                  </p>

                  <p className="text-xl md:text-2xl lg:text-3xl font-poppins font-light leading-relaxed">
                    At Yolk Workshop, we believe in <strong>rethinking electronic design</strong>, crafting devices that feel <strong>intuitive, immersive, and inspired</strong> for all.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Recent Record Section - Preserving Desktop View */}
        <div className="container mx-auto px-4" style={{ maxWidth: '1800px' }}>
          <div className="mb-32 pt-16">
            <section style={{ borderRadius: '10px', height: 'auto', minHeight: 'auto' }} className="relative bg-[#e0e0e0] text-black overflow-hidden shadow-lg border border-gray-200 w-full p-12">
              {/* Section heading */}
              <h2 className="text-4xl md:text-7xl font-poppins font-extralight mb-8 text-center">
                <strong>Discourse</strong>
              </h2>

              {/* Record updates container */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <p className="text-xl md:text-2xl lg:text-3xl font-poppins font-light text-center leading-relaxed mx-auto w-full md:w-2/3">
                  Updates coming soon
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Kickstarter Section - Preserving Desktop View */}
        <div className="container mx-auto px-4 mb-32" style={{ maxWidth: '1800px' }}>
          <div className="relative" style={{ overflow: 'hidden', borderRadius: '10px' }}>
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-black overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>

            <div className="relative z-10 py-20 px-12 text-white text-center">
              <h2 className="text-4xl md:text-7xl font-poppins font-light mb-8">Coming to Kickstarter</h2>
              <p className="text-xl md:text-3xl font-light mb-12 max-w-3xl mx-auto">
                Be among the first to own the revolutionary Yolk Keyboard.
                Join our journey to redefine typing experiences.
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
                <Link
                  href="#subscribe"
                  className="bg-white button-hover-accent text-black font-poppins text-xl py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto max-w-xs"
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