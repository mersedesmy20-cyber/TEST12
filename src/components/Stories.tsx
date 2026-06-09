'use client'

import Image from 'next/image'

const stories = [
    {
        id: 1,
        title: "Топ Літа",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop", // Tropical Paradise
        type: "video"
    },
    {
        id: 2,
        title: "Акції",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=300&auto=format&fit=crop", // Modern Hotel
        type: "image"
    },
    {
        id: 3,
        title: "Відгуки",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=300&auto=format&fit=crop", // Happy Team
        type: "image"
    },
    {
        id: 4,
        title: "Поради",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=300&auto=format&fit=crop", // Travel Gear
        type: "image"
    },
    {
        id: 5,
        title: "Туреччина",
        image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=300&auto=format&fit=crop", // Istanbul
        type: "image"
    }
]

export default function Stories() {
    return (
        <section className="pt-24 md:pt-28 pb-8 px-[5%] relative z-10">
            <div className="max-w-[1400px] mx-auto overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 min-w-max px-2">
                    {stories.map((story) => (
                        <a
                            key={story.id}
                            href="https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 cursor-pointer group relative"
                        >
                            <div className="relative">
                                <div className="relative w-[70px] h-[70px] md:w-[85px] md:h-[85px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-500 animate-spin-slow group-hover:scale-110 transition-transform">
                                    <div className="w-full h-full rounded-full border-[3px] border-slate-900 overflow-hidden relative bg-slate-800">
                                        <Image
                                            src={story.image}
                                            alt={story.title}
                                            fill
                                            sizes="(max-width: 768px) 70px, 85px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                {/* Instagram Badge */}
                                <div className="absolute bottom-0 right-0 w-[22px] h-[22px] md:w-[26px] md:h-[26px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center border-2 border-slate-950 shadow-lg z-20 group-hover:scale-110 transition-transform">
                                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-white text-xs md:text-sm font-medium tracking-wide drop-shadow-md">{story.title}</span>
                        </a>
                    ))}

                    {/* Add Story 'Call to Action' Circle */}
                    <a
                        href="https://t.me/lizazakharchenko"
                        target="_blank"
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                    >
                        <div className="relative w-[70px] h-[70px] md:w-[85px] md:h-[85px] rounded-full p-[3px] border-2 border-dashed border-slate-600 hover:border-indigo-500 transition-colors bg-white/5 flex items-center justify-center">
                            <span className="text-2xl text-slate-400 group-hover:text-indigo-400 transition-colors">+</span>
                        </div>
                        <span className="text-slate-500 text-xs md:text-sm font-medium group-hover:text-indigo-400 transition-colors">Замовити</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
