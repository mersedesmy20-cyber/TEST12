'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DestinationModal from '@/components/DestinationModal'
import DestinationCard from '@/components/DestinationCard'
import { destinations } from '@/data/destinations'
import { useModal } from '@/context/ModalContext'
import { initSmoothScroll } from '@/lib/smoothScroll'

const months = [
    { id: 1, name: 'Січень', icon: '❄️' },
    { id: 2, name: 'Лютий', icon: '🌨️' },
    { id: 3, name: 'Березень', icon: '🌱' },
    { id: 4, name: 'Квітень', icon: '🌷' },
    { id: 5, name: 'Травень', icon: '☀️' },
    { id: 6, name: 'Червень', icon: '🏖️' },
    { id: 7, name: 'Липень', icon: '🍦' },
    { id: 8, name: 'Серпень', icon: '🍉' },
    { id: 9, name: 'Вересень', icon: '🍇' },
    { id: 10, name: 'Жовтень', icon: '🍂' },
    { id: 11, name: 'Листопад', icon: '🌧️' },
    { id: 12, name: 'Грудень', icon: '🎄' },
]

export default function CalendarPage() {
    const { openModal } = useModal()
    // Default to current month, handle server-side hydration match by defaulting to 1 initially or using useEffect
    // Using 1 initially to match server snapshot if we want strict hydration, but client update is fine.
    // Better: start with a fixed value (1) and update in useEffect to match real date to avoid hydration error
    const [selectedMonth, setSelectedMonth] = useState<number>(1)

    useEffect(() => {
        initSmoothScroll()
        setSelectedMonth(new Date().getMonth() + 1)
    }, [])

    const filteredDestinations = destinations.filter(d => d.bestMonths?.includes(selectedMonth))

    return (
        <main className="bg-slate-950 min-h-screen">
            <Navigation />

            {/* Hero Header */}
            <div className="relative pt-32 pb-16 px-4 mb-8 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg animate-fadeInUp">
                        Календар Подорожей 2026
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-fadeInUp delay-100">
                        Дізнайтеся, куди найкраще поїхати відпочивати саме зараз. Ми підібрали ідеальні напрямки для кожного місяця року.
                    </p>
                </div>
            </div>

            {/* Month Selector */}
            <div className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-lg border-y border-white/5 py-4 mb-12">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex space-x-4 min-w-max">
                        {months.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setSelectedMonth(m.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${selectedMonth === m.id
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105 ring-2 ring-white/20'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{m.icon}</span>
                                <span className="font-bold">{m.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1400px] mx-auto px-[5%] pb-24">
                <div className="text-center mb-12 animate-fadeIn">
                    <h2 className="text-3xl text-white font-bold mb-2">
                        Найкращий вибір на <span className="text-indigo-400">{months.find(m => m.id === selectedMonth)?.name}</span>
                    </h2>
                    <p className="text-slate-400">
                        {filteredDestinations.length} напрямків ідеально підходять для подорожі в цей час
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDestinations.map(dest => (
                        <DestinationCard
                            key={dest.id}
                            destination={dest}
                            onClick={() => openModal(dest)}
                        />
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-slate-500">
                            Оберіть інший місяць для пошуку турів.
                        </p>
                    </div>
                )}
            </div>

            <DestinationModal />
            <Footer />

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </main>
    )
}
