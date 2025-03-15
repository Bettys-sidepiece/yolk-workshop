/* eslint-disable @typescript-eslint/no-unused-vars */
// Add this component to your project (e.g. in components/ScrollTriggeredVideo.jsx)
'use client'
import { useEffect, useRef, useState } from 'react'

export default function ScrollTriggeredVideo({ src, type = "video/mp4" }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    const containerElement = containerRef.current
    
    if (!videoElement || !containerElement) return

    const handleIntersection = (entries) => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
      
      if (entry.isIntersecting) {
        // Start playing when visible
        videoElement.play().catch(error => {
          console.error('Video error:', error)
        })
      } else {
        // Pause when not visible
        videoElement.pause()
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      threshold: 0.4 // 20% visibility triggers callback
    })

    observer.observe(containerElement)

    // Cleanup
    return () => {
      observer.unobserve(containerElement)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        style={{
          borderRadius: '10px',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        loop
        muted
        playsInline
        controls={false}
        onError={(e) => {
          console.error('Video error:', e)
        }}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag or the video format.
      </video>
    </div>
  )
}