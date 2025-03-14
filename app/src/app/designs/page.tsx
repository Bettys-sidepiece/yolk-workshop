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
        'Dedicated programmable special function key for custom macros'
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

    // Cleanup timers on component unmount
    return () => {
      timers.forEach(timer => clearInterval(timer))
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

  return (
    <main className="min-h-screen bg-[--foreground]">
      {/* Include custom styles */}
      <style dangerouslySetInnerHTML={customStyles} />
      <div className="space-y-32 pt-0">
        {designs.map((design) => (
          <div key={design.id} className="w-full" id={`design-${design.id}`}>
            <div 
              style={{ height: '100vh' }} 
              className="relative bg-[#B7C9DA] overflow-hidden"
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
              <div className="absolute inset-0 flex flex-col justify-between p-12 z-20">
                {/* Top area with title */}
                <div className="flex-col text-right ">
                  <h2 className="text-7xl font-poppins font-light text-black/70">
                  </h2>
                </div>
                
                {/* Bottom container with navigation indicators and explore button */}
                <div className="flex justify-between items-center w-full">
                  {/* Image navigation indicators (circles) */}
                  <div className="flex items-center gap-3">
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
                  <div className="flex flex-col items-end gap-2">
                    <h3 className="text-6xl mb-5 font-poppins font-light text-black/70">
                      {design.title}
                    </h3>
                    <Link
                      href={`/designs/${design.id}`}
                      className="bg-black hover:bg-[--accent] hover:text-black text-white font-poppins text-base py-4 px-10 rounded-full transition-all duration-300"
                      aria-label={`Explore ${design.title} details`}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Toggle button for marketing section */}
            <div className="flex justify-center">
              <button 
                onClick={() => toggleMarketingSection(design.id)}
                className="bg-white border-0 text-black hover:bg-gray-100 rounded-none w-10 h-10 flex items-center justify-center relative z-10 transition-all duration-700 shadow-md"
                aria-label={expandedSections[design.id] ? "Hide details" : "Show details"}
              >
                {expandedSections[design.id] 
                  ? <ChevronUp className="stroke-2" size={20} /> 
                  : <ChevronDown className="stroke-2" size={20} />}
              </button>
            </div>
            
            {/* Marketing description section (collapsible) */}
            <div 
              className={`bg-white text-black overflow-hidden transition-all duration-1000 ease-in-out ${
                expandedSections[design.id] 
                  ? 'max-h-screen opacity-100 py-16 px-8' 
                  : 'max-h-0 opacity-0 py-0 px-8'
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {/* Description column */}
                  <div>
                    <h3 className="text-5xl font-poppins font-light mb-6">About</h3>
                    <p className="text-xl font-poppins font-light leading-relaxed">
                      {design.marketingDescription}
                    </p>
                  </div>
                  
                  {/* Features column */}
                  <div>
                    <h3 className="text-5xl font-poppins font-light mb-6">Features</h3>
                    <ul className="space-y-4">
                      {design.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-white mr-3 mt-1">•</span>
                          <span className="text-xl font-poppins font-light">{feature}</span>
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