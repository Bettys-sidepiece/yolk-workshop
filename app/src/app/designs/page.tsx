'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Designs() {
    const designs = [
        {
            id: 'yolk-keyboard',
            title: 'yolk keyboard',
            description: 'Yolk Workshop flagship design',
            image: '/yolk-keyboard-img-placeholder.png',
            status: 'Coming Soon',
        }
        // Add more designs here as they become available
    ]

    return (
        <main className="min-h-screen bg-[--foreground] pt-32">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-7xl font-poppins font-light mb-24 -ml-5">
                    designs
                </h1>
            </div>

            <div className="space-y-32">
                {designs.map((design) => (
                    <Link
                        key={design.id}
                        href={`/designs/${design.id}`}
                        className="group block relative w-full h-[100vh] bg-black"
                    >
                        {/* Image container */}
                        <div className="relative w-full h-full">
                            <Image
                                src={design.image}
                                alt={design.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Content overlay */}
                        <div className="absolute top-8 left-0 right-0">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="flex flex-col items-start gap-1 text-black">
                                    <h2 className="text-5xl font-poppins font-light">
                                        {design.title}
                                    </h2>
                                </div>
                                <div className="mt-4 text-xl font-poppins font-light max-w-3xl">
                                    <p>{design.description}</p>
                                    <p>{design.status}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}