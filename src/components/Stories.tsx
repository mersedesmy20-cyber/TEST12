'use client'

import { useState } from 'react'
import Image from 'next/image'

const stories = [
    {
        id: 1,
        title: "Топ Літа",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=300&auto=format&fit=crop", // Zanzibar / Maldives style
        type: "video"
    },
    {
        id: 2,
        title: "Акції",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=300&auto=format&fit=crop", // Hotel
        type: "image"
    },
    {
        id: 3,
        title: "Відгуки",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=300&auto=format&fit=crop", // Happy people
        type: "image"
    },
    {
        id: 4,
        title: "Поради",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=300&auto=format&fit=crop", // Travel items
        type: "image"
    }
]

export default function Stories() {
    const [selectedStory, setSelectedStory] = useState<number | null>(null)

    return (
        <section className="pt-8 pb-8 px-[5%]">
            <div className="max-w-[1400px] mx-auto overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 min-w-max px-2">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                            onClick={() => setSelectedStory(story.id)}
                        >
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
                            <span className="text-white text-xs md:text-sm font-medium tracking-wide drop-shadow-md">{story.title}</span>
                        </div>
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

            {/* Story Viewer Modal (Simple Fallback for now) */}
            {selectedStory && (
                <div
                    className="fixed inset-0 z-[6000] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fadeIn"
                    onClick={() => setSelectedStory(null)}
                >
                    <div className="relative h-[80vh] w-full max-w-[450px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl animate-scaleIn">
                        <Image
                            src={stories.find(s => s.id === selectedStory)?.image || ''}
                            alt="Story"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-black/40 via-transparent to-black/80">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                {stories.find(s => s.id === selectedStory)?.title}
                            </h3>
                            <p className="text-slate-200 mb-8">
                                Цей розділ ще наповнюється контентом. Слідкуйте за оновленнями в нашому Instagram!
                            </p>
                            <a
                                href="https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw"
                                target="_blank"
                                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Перейти в Instagram
                            </a>
                        </div>

                        <button
                            className="absolute top-4 right-4 text-white hover:text-slate-300 z-50 p-2"
                            onClick={() => setSelectedStory(null)}
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
