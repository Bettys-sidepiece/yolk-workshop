'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function DesignPage() {
  const [registrationEmail, setRegistrationEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/register-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: registrationEmail,
          product: 'yolk-keyboard'
        }),
      })
      
      if (!response.ok) throw new Error('Failed to register')
      
      setStatus('success')
      setRegistrationEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <main className="min-h-screen bg-[--foreground]">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/keyboard-hero.jpg" // Replace with actual image
          alt="Yolk Keyboard"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-8xl font-poppins font-light text-black">
            Yolk Keyboard
          </h1>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-6xl font-poppins font-light mb-16 -ml-5">
            overview
          </h2>
          <div className="space-y-8 text-xl font-poppins font-light">
            <p>
              The Yolk Keyboard reimagines the traditional keyboard interface,
              combining innovative design with ergonomic excellence.
            </p>
            {/* Add more overview content */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-6xl font-poppins font-light mb-16 -ml-5">
            features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              {
                title: 'Ergonomic Design',
                description: 'Carefully crafted for comfort during extended use'
              },
              {
                title: 'Customizable Layout',
                description: 'Adaptable key configurations for different workflows'
              },
              // Add more features
            ].map((feature, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-3xl font-poppins font-light">
                  {feature.title}
                </h3>
                <p className="text-xl font-poppins font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-6xl font-poppins font-light mb-16 -ml-5">
            components
          </h2>
          <div className="grid grid-cols-1 gap-16">
            {[
              {
                title: 'Mechanical Switches',
                description: 'Premium switches for tactile feedback',
                image: '/switches.jpg' // Replace with actual image
              },
              // Add more components
            ].map((component, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 relative aspect-video">
                  <Image
                    src={component.image}
                    alt={component.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-3xl font-poppins font-light">
                    {component.title}
                  </h3>
                  <p className="text-xl font-poppins font-light">
                    {component.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-6xl font-poppins font-light mb-8">
            support the project
          </h2>
          
          <p className="text-xl font-poppins font-light mb-12 max-w-2xl mx-auto">
            Join us in bringing the Yolk Keyboard to life. Register your interest
            to stay updated on our upcoming Kickstarter campaign.
          </p>

          {status === 'success' && (
            <div className="mb-8 p-4 bg-green-100 text-green-700 font-poppins max-w-md mx-auto">
              Thanks for registering! We'll keep you updated.
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-4 bg-red-100 text-red-700 font-poppins max-w-md mx-auto">
              Failed to register. Please try again.
            </div>
          )}

          <form onSubmit={handleRegistration} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={registrationEmail}
                onChange={(e) => setRegistrationEmail(e.target.value)}
                className="flex-1 p-3 border border-white bg-transparent text-white font-poppins font-light placeholder:text-white/50"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-white text-black font-poppins font-light hover:bg-[--accent] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Registering...' : 'Register Interest'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}