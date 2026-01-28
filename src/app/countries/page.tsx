'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { destinations } from '@/data/destinations'
import { useModal } from '@/context/ModalContext'
import DestinationModal from '@/components/DestinationModal'

export default function CountriesPage() {
    const { openModal } = useModal()
    const [activeRegion, setActiveRegion] = useState<string>('All')

    const regions = [
        { id: 'All', label: 'Всі' },
        { id: 'Europe', label: 'Європа' },
        { id: 'Asia', label: 'Азія' },
        { id: 'Africa', label: 'Африка' },
        { id: 'North America', label: 'Америка' }
    ]

    const filteredDestinations = destinations.filter(dest => {
        return activeRegion === 'All' ? true : dest.region === activeRegion
    })

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <Navigation />
            <DestinationModal />

            <div className="pt-32 pb-20 px-[5%] relative">
                {/* Background Elements */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <div className="max-w-[1400px] mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black mb-6 tracking-tight">
                            Відкрийте <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Світ</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                            Обирайте напрямок мрії, а ми подбаємо про все інше. Найкращі курорти, готелі та враження чекають на вас.
                        </p>
                    </header>

                    {/* Region Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12 sticky top-24 z-30 py-4 bg-slate-950/80 backdrop-blur-md -mx-4 px-4 border-y border-white/5">
                        {regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setActiveRegion(region.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${activeRegion === region.id
                                        ? 'bg-white text-slate-900 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                        : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredDestinations.map((dest) => (
                            <div
                                key={dest.id}
                                onClick={() => openModal(dest)}
                                className={`group relative bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] h-[400px]`}
                            >
                                <div className="h-full relative overflow-hidden transition-all duration-700 bg-slate-900">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                                    {/* Flag Badge */}
                                    <div
                                        className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/20 shadow-lg backdrop-blur-md bg-white/10 flex items-center justify-center text-2xl z-10 transition-transform group-hover:scale-110 group-hover:rotate-12"
                                    >
                                        {dest.flag}
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10">
                                        <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold text-white m-0 group-hover:text-indigo-300 transition-colors drop-shadow-md">
                                                    {dest.name}
                                                </h3>
                                                <span className="text-2xl filter drop-shadow-lg">{dest.icon}</span>
                                            </div>

                                            <p className="text-slate-200 text-sm leading-relaxed mb-4 line-clamp-2 opacity-90 font-medium shadow-black drop-shadow-sm">
                                                {dest.desc}
                                            </p>

                                            <div className="flex justify-between items-center pt-4 border-t border-white/20">
                                                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                                                    <span className="drop-shadow-sm">{dest.seasonIcon}</span>
                                                    <span className="drop-shadow-sm">{dest.season}</span>
                                                </div>
                                                <div className="text-lg font-bold text-indigo-300 bg-indigo-900/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-indigo-500/30">
                                                    {dest.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
