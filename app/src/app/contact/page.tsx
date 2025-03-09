'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (!response.ok) throw new Error('Failed to send message')
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 3000)
        } catch (error) {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setNewsletterStatus('loading')
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newsletterEmail }),
            })
            if (!response.ok) throw new Error('Failed to subscribe')
            setNewsletterStatus('success')
            setNewsletterEmail('')
            setTimeout(() => setNewsletterStatus('idle'), 3000)
        } catch (error) {-
            setNewsletterStatus('error')
            setTimeout(() => setNewsletterStatus('idle'), 3000)
        }
    }

    return (
        <main className="min-h-screen bg-[--foreground] py-32">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-poppins font-light mt-20 mb-10 text-black text-left">
                    Message Us
                </h1>

                {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 font-poppins text-center">
                        Message sent successfully!
                    </div>
                )}

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 font-poppins text-center">
                        Failed to send message. Please try again.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="name" className="block text-lg font-poppins font-bold text-black mb-2">
                                name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-black font-poppins font-light bg-transparent text-black"
                                required
                                disabled={status === 'loading'}
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="email" className="block text-lg font-poppins font-bold text-black mb-2">
                                email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-3 border border-black font-poppins font-light bg-transparent text-black"
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-lg font-poppins font-bold text-black mb-2">
                            message *
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={10}
                            className="w-full h-full p-3 border text-black border-black font-poppins font-light bg-transparent resize-none min-h-[200px]"
                            required
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-center mt-20">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-3 bg-black text-white font-poppins font-light hover:bg-[--accent] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </form>

                {/* Newsletter Section */}
                <div className="mt-32 border-t border-black pt-16">
                    <h2 className="text-4xl font-poppins font-light mb-8 text-black text-center">
                        stay updated
                    </h2>

                    {newsletterStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-100 text-green-700 font-poppins text-center">
                            Successfully subscribed to the newsletter!
                        </div>
                    )}

                    {newsletterStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 font-poppins text-center">
                            Failed to subscribe. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                className="flex-1 p-3 border border-black font-poppins font-light bg-transparent text-black"
                                required
                                disabled={newsletterStatus === 'loading'}
                            />
                            <button
                                type="submit"
                                disabled={newsletterStatus === 'loading'}
                                className="px-6 py-3 bg-black text-white font-poppins font-light hover:bg-[--accent] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Support Platforms Section */}
                <div className="mt-32 border-t border-black pt-16">
                    <h2 className="text-4xl font-poppins font-light mb-10 text-black text-center">
                        Support Us
                    </h2>
                    <div className="flex justify-center gap-8">
                        <Link 
                            href="https://www.patreon.com/yourpage" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-3 border border-black text-black font-poppins font-light hover:bg-black hover:text-white transition-colors duration-300"
                        >
                            Patreon
                        </Link>
                        <Link 
                            href="https://www.kickstarter.com/yourpage" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-3 border border-black text-black font-poppins font-light hover:bg-black hover:text-white transition-colors duration-300"
                        >
                            Kickstarter
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}