'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Sample data - replace with your actual data fetching logic
const sampleUpdates = [
  {
    id: 1,
    date: 'January 15, 2025',
    title: 'Yolk Keyboard Production Update',
    image: '/path-to-update-image.jpg'
  },
  {
    id: 2,
    date: 'January 4, 2025',
    title: 'New Color Options',
    image: '/path-to-colors-image.jpg'
  },
  {
    id: 3,
    date: 'December 28, 2024',
    title: 'Testing Success',
    image: '/path-to-testing-image.jpg'
  },
  {
    id: 4,
    date: 'December 15, 2024',
    title: 'Prototype Reveal',
    image: '/path-to-prototype-image.jpg'
  }
]

const RecordSection = () => {
  const [recentUpdates, setRecentUpdates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching updates from an API
    const fetchUpdates = async () => {
      try {
        // In a real app, replace this with your API call
        // const response = await fetch('/api/updates')
        // const data = await response.json()
        
        // Using sample data for now
        setRecentUpdates(sampleUpdates.slice(0, 3))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching updates:', error)
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  return (
    <div className="container mx-auto px-4" style={{ maxWidth: '1800px' }}>
      <div className="mb-32 pt-16">
        <section style={{ borderRadius: '10px', height: 'auto', minHeight: 'auto' }} className="relative bg-[#e0e0e0] text-black overflow-hidden shadow-lg border border-gray-200 w-full p-12">
          {/* Section heading */}
          <h2 className="text-5xl font-poppins font-light mb-12 text-center">
            latest updates
          </h2>
          
          {/* Record updates container */}
          {loading ? (
            <div className="flex justify-center py-12">
              <p>Loading updates...</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              {recentUpdates.map((update, _index) => (
                <Link href={`/record/${update.id}`} key={update.id} className="block w-full sm:w-[30%]">
                  <div className="bg-[#ff9e9e] rounded-lg w-full aspect-square flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105">
                    <div className="bg-black bg-opacity-25 p-3">
                      <span className="text-white font-medium">{update.date}</span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <h3 className="text-2xl font-poppins font-medium text-black">
                        {update.title}
                      </h3>
                      <div className="mt-4">
                        <Image 
                          src={update.image} 
                          alt={update.title} 
                          width={200} 
                          height={150} 
                          className="object-cover rounded" 
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* View Record button - centered */}
          <div className="flex justify-center">
            <Link 
              href="/record" 
              className="bg-black text-white font-poppins text-xl py-3 px-10 rounded-full transition-all duration-300 button-hover-accent"
            >
              view record
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default RecordSection