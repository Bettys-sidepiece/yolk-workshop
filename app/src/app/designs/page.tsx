/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'



// Custom CSS for extended transition durations
const customStyles = {
  __html: `
    .duration-1500 {
      transition-duration: 1500ms;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    .fade-in {
      animation: fadeIn 1.5s ease-in-out forwards;
    }
    
    .fade-out {
      animation: fadeOut 1.5s ease-in-out forwards;
    }

    /* Improved dropdown animation */
    @keyframes slideDown {
      from { max-height: 0; opacity: 0; }
      to { max-height: 2000px; opacity: 1; }
    }
    
    @keyframes slideUp {
      from { max-height: 2000px; opacity: 1; }
      to { max-height: 0; opacity: 0; }
    }
    
    .slide-down {
      animation: slideDown 0.5s ease-in-out forwards;
      overflow: hidden;
    }
    
    .slide-up {
      animation: slideUp 0.4s ease-in-out forwards;
      overflow: hidden;
    }
    
    .toggle-button {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: transparant;

      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      z-index: 20;
    }
    
    .toggle-button:hover {
      transform: translateY(-2px);
    }
    
    .toggle-button:active {
      transform: translateY(0);
    }

    /* Mobile responsive additions */
    @media (max-width: 768px) {
      .te-container {
        padding: 0 1.5rem !important;
      }
      
      .mobile-stack {
        flex-direction: column !important;
        align-items: center !important;
        gap: 1rem !important;
      }
      
      .mobile-full {
        width: 100% !important;
        padding: 0 1rem !important;
      }
      
      .mobile-center {
        text-align: center !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      .mobile-text-sm {
        font-size: 0.875rem !important;
      }
      
      .mobile-text-base {
        font-size: 1rem !important;
      }
      
      .mobile-text-lg {
        font-size: 1.125rem !important;
      }
      
      .mobile-text-xl {
        font-size: 1.25rem !important;
      }
      
      .mobile-text-2xl {
        font-size: 1.5rem !important;
      }
      
      .mobile-text-3xl {
        font-size: 1.875rem !important;
      }
      
      .mobile-text-4xl {
        font-size: 2.25rem !important;
      }
      
      .mobile-p-4 {
        padding: 1rem !important;
      }
      
      .mobile-mt-4 {
        margin-top: 1rem !important;
      }
      
      .mobile-mb-4 {
        margin-bottom: 1rem !important;
      }
      
      .mobile-height-adjust {
        height: 80vh !important;
        min-height: auto !important;
      }
      
      .mobile-hidden {
        display: none !important;
      }
      
      .toggle-button {
        width: 36px;
        height: 36px;
      }
    }
  `
}

export default function Designs() {
  const designs = useMemo(() => [
    {
      id: 'yolk-keyboard',
      title: 'Yolk Keyboard',
      shortDescription: 'Premium custom mechanical keyboard with advanced features',
      marketingDescription: 'The Yolk Keyboard redefines typing with innovative ergonomics and cutting-edge technology. Built around an STM32L07 MCU, this custom mechanical keyboard delivers professional-grade performance with striking aesthetics.',
      features: [
        'Ultra-responsive 1ms polling rate for instant input recognition',
        'Full NKRO (N-Key Rollover) for simultaneous key presses',
        'Seamless automatic USB/BLE switching for versatile connectivity',
        'Integrated capacitive touch and proximity sensors',
        'Programmable RGB backlighting with breathing effects',
        'Hot-swappable switches for customizable typing experience',
      ],
      images: [
        '/sunny_side_down1.png',
        '/sunny_side_down3.png',
        '/red_terror1.png',
        '/red_terror2.png',
      ],
      status: 'Work in progress',
    }
    // Add more designs here as they become available
  ], [])

  // State to track current image index for each design
  const [currentImageIndices, setCurrentImageIndices] = useState({})
  const [isClient, setIsClient] = useState(false)
  // State to track which marketing sections are expanded
  const [expandedSections, setExpandedSections] = useState({})
  // State to track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(0)

  // Function to cycle to the next image
  const cycleToNextImage = useCallback((designId) => {
    setCurrentImageIndices(prev => {
      const design = designs.find(d => d.id === designId)
      const currentIndex = prev[designId]
      const totalImages = design.images.length
      
      // Move to next image
      const newIndex = (currentIndex + 1) % totalImages
      
      return { ...prev, [designId]: newIndex }
    })
  }, [designs])

  // Initialize state and setup timers for each design
  useEffect(() => {
    setIsClient(true)
    const initialIndices = {}
    const initialExpandedState = {}
    designs.forEach(design => {
      initialIndices[design.id] = 0
      initialExpandedState[design.id] = false // All sections collapsed initially
    })
    setCurrentImageIndices(initialIndices)
    setExpandedSections(initialExpandedState)

    // Setup auto-cycling timers for each design
    const timers = designs.map(design => {
      return setInterval(() => {
        cycleToNextImage(design.id)
      }, 5000) // Cycle every 5 seconds
    })
    
    // Track window width for responsive design
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // Initial width check
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    // Cleanup timers on component unmount
    return () => {
      timers.forEach(timer => clearInterval(timer))
      window.removeEventListener('resize', handleResize)
    }
  }, [designs, cycleToNextImage])

  // Function to manually change to a specific image
  const goToImage = (designId, index) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [designId]: index
    }))
  }
  
  // Function to toggle the marketing section
  const toggleMarketingSection = (designId) => {
    setExpandedSections(prev => {
      // Create a new object with all sections closed
      const newState = {};
      Object.keys(prev).forEach(id => {
        newState[id] = false;
      });
      
      // Toggle the clicked section
      newState[designId] = !prev[designId];
      
      return newState;
    });
  }

  // Add scroll listener to auto-close expanded sections when scrolling to another design
  useEffect(() => {
    const handleScroll = () => {
      // Only run this if there's at least one expanded section
      if (Object.values(expandedSections).some(expanded => expanded)) {
        designs.forEach(design => {
          const element = document.getElementById(`design-${design.id}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If this design is no longer primarily in the viewport, collapse its section
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              if (expandedSections[design.id]) {
                setExpandedSections(prev => ({
                  ...prev,
                  [design.id]: false
                }));
              }
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [designs, expandedSections]);

  // Check if we're on mobile
  const isMobile = isClient && windowWidth < 768;

  return (
    <main className="min-h-screen bg-[--foreground]">
      {/* Include custom styles */}
      <style dangerouslySetInnerHTML={customStyles} />
      <div className="space-y-16 md:space-y-32 pt-0">
        {designs.map((design) => (
          <div key={design.id} className="w-full" id={`design-${design.id}`}>
            <div 
              className="relative bg-[#B7C9DA] overflow-hidden mobile-height-adjust"
              style={{ height: isMobile ? '80vh' : '100vh' }} 
            >
              {/* Image container with fading transitions */}
              <div className="absolute inset-0">
                {design.images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                      index === (currentImageIndices[design.id] || 0)
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${design.title} - view ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-20">
                {/* Top area with title */}
                <div className="flex-col text-right">
                  <h2 className="text-4xl md:text-7xl font-poppins font-light text-black/70 mobile-text-3xl">
                  </h2>
                </div>
                
                {/* Bottom container with navigation indicators and explore button */}
                <div className={`flex ${isMobile ? 'flex-col-reverse items-center gap-6' : 'justify-between items-center'} w-full`}>
                  {/* Image navigation indicators (circles) - hidden on mobile */}
                  <div className={`flex items-center gap-3 ${isMobile ? 'hidden' : ''}`}>
                    {design.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(design.id, index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === (currentImageIndices[design.id] || 0)
                            ? 'bg-black/70 scale-110'
                            : 'bg-black/20 hover:bg-white/80'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Design title and explore button */}
                  <div className={`flex flex-col ${isMobile ? 'items-center text-center' : 'items-end'} gap-2`}>
                    <h3 className={`text-3xl md:text-6xl mb-3 md:mb-5 font-poppins font-light text-black/70 mobile-text-3xl`}>
                      {design.title}
                    </h3>
                    <Link
                      href={`/designs/${design.id}`}
                      className="bg-black hover:bg-[--accent] hover:text-black text-white font-poppins text-base md:text-xl py-3 md:py-4 px-8 md:px-10 rounded-full transition-all duration-300"
                      aria-label={`Explore ${design.title} details`}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Improved Toggle button for marketing section */}
            <div className="flex justify-center -mt-10 ">
              <button 
                onClick={() => toggleMarketingSection(design.id)}
                className="toggle-button"
                aria-label={expandedSections[design.id] ? "Hide details" : "Show details"}
              >
                {expandedSections[design.id] 
                  ? <ChevronUp className="stroke-2" size={20} /> 
                  : <ChevronDown className="stroke-2" size={20} />}
              </button>
            </div>
            
            {/* Marketing description section with improved animations */}
            <div 
              className={`bg-white text-black overflow-hidden transition-all duration-1000 ease-in-out ${
                expandedSections[design.id] 
                  ? 'max-h-screen opacity-100 py-8 md:py-16 px-4 md:px-8' 
                  : 'max-h-0 opacity-0 py-0 px-4 md:px-8'
              } ${isMobile ? 'mobile-p-4' : ''}`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  {/* Description column */}
                  <div>
                    <h3 className="text-3xl md:text-5xl font-poppins font-light mb-4 md:mb-6 mobile-text-2xl mobile-mb-4 ">About</h3>
                    <p className="text-lg md:text-xl font-poppins font-light leading-relaxed mobile-text-base">
                      {design.marketingDescription}
                    </p>
                  </div>
                  
                  {/* Features column */}
                  <div className="mt-8 md:mt-0">
                    <h3 className="text-3xl md:text-5xl font-poppins font-light mb-4 md:mb-6 mobile-text-2xl mobile-mb-4 mobile-text-center">Features</h3>
                    <ul className="space-y-4">
                      {design.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-lg md:text-xl font-poppins font-light mobile-text-base mobile-text-center mobile-text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}