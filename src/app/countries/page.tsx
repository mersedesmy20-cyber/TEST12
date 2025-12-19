'use client'

import Link from 'next/link'
import Image from 'next/image'
import { destinations } from '@/data/destinations'
import { useState, useMemo } from 'react'
import { Destination } from '@/types/destination'

const regions = ['All', 'Europe', 'Asia', 'Africa', 'North America'] as const

export default function CountriesPage() {
    const [activeRegion, setActiveRegion] = useState<typeof regions[number]>('All')

    const filteredDestinations = useMemo(() => {
        if (activeRegion === 'All') return destinations
        return destinations.filter(d => d.region === activeRegion)
    }, [activeRegion])

    return (
        <main className="min-h-screen pt-32 pb-20 px-[5%] relative bg-slate-950">
            {/* Tech Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-950/50 to-transparent pointer-events-none" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                <header className="mb-12 text-center relative">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
                        Global Destinations
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-400">
                        ОБЕРІТЬ СВІЙ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">НАСТУПНИЙ СВІТ</span>
                    </h1>

                    {/* Region Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {regions.map((region) => (
                            <button
                                key={region}
                                onClick={() => setActiveRegion(region)}
                                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${activeRegion === region
                                    ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                                    : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-indigo-500/50 hover:text-white'
                                    }`}
                            >
                                {region === 'All' ? 'ВСІ' : region === 'North America' ? 'AMERICAS' : region.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fade-in-up_0.5s_ease-out]">
                    {filteredDestinations.map((dest) => (
                        <Link
                            href={`/countries/${dest.id}`}
                            key={dest.id}
                            className="group relative h-[400px] rounded-3xl overflow-hidden bg-slate-900 border border-white/5 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)]"
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-2xl group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                                        {dest.flag}
                                    </div>
                                    <span className="text-xs font-mono text-indigo-400/80 bg-indigo-950/30 px-2 py-1 rounded border border-indigo-500/20">
                                        {dest.region.toUpperCase()}
                                    </span>
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h2 className="text-4xl font-black text-white mb-2 tracking-tight group-hover:text-indigo-200 transition-colors">
                                        {dest.name}
                                    </h2>
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {dest.desc}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-indigo-400 uppercase">
                                            <span>Дослідити</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-slate-500 text-xs font-mono transition-opacity group-hover:opacity-0 delay-100">
                                        {`// ${dest.season}`}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-xl font-light">На жаль, в цьому регіоні поки немає доступних напрямків.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
