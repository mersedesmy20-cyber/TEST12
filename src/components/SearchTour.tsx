'use client'

import { useState } from 'react'
import { destinations } from '@/data/destinations'
import { useRouter } from 'next/navigation'
import { mockTours } from '@/data/mockTours'
import TourModal from './TourModal'

export default function SearchTour() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'regular' | 'ai'>('regular')
    const [searchParams, setSearchParams] = useState({
        departure: 'kyiv',
        destination: '',
        date: '',
        nights: '7-14',
        tourists: 2
    })
    const [isSearching, setIsSearching] = useState(false)

    const [results, setResults] = useState<any[]>([])
    const [dataSource, setDataSource] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedTour, setSelectedTour] = useState<any | null>(null)

    const handleSearch = async () => {
        setIsSearching(true)
        setResults([]) // Clear previous
        setError(null) // Clear errors
        setDataSource(null)

        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800))

        try {
            // Filter mock tours based on search parameters
            let filteredTours = mockTours

            // Filter by destination if specified
            if (searchParams.destination) {
                filteredTours = filteredTours.filter(
                    tour => tour.destination === searchParams.destination
                )
            }

            // Filter by nights range
            if (searchParams.nights) {
                filteredTours = filteredTours.filter(tour => {
                    if (searchParams.nights === '1-6') {
                        return tour.duration >= 1 && tour.duration <= 6
                    } else if (searchParams.nights === '7-14') {
                        return tour.duration >= 7 && tour.duration <= 14
                    } else if (searchParams.nights === '14+') {
                        return tour.duration >= 14
                    }
                    return true
                })
            }

            if (filteredTours.length > 0) {
                setResults(filteredTours)
                setDataSource('static')

                // Auto-scroll to results after a short delay
                setTimeout(() => {
                    const resultsElement = document.getElementById('search-results')
                    if (resultsElement) {
                        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                }, 300)
            } else {
                setError('За вашими параметрами пошуку не знайдено жодного туру. Спробуйте змінити фільтри.')
            }
        } catch (error) {
            setError('Виникла помилка при пошуку турів. Спробуйте ще раз.')
            console.error('Search failed', error)
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <div id="search" className="w-full max-w-[1200px] mx-auto -mt-24 relative z-20 px-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('regular')}
                        className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === 'regular'
                            ? 'bg-white text-slate-900'
                            : 'text-white hover:bg-white/5'
                            }`}
                    >
                        Пошук туру
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`flex-1 py-4 text-center font-bold text-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'ai'
                            ? 'bg-white text-slate-900'
                            : 'text-white hover:bg-white/5'
                            }`}
                    >
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full">AI</span>
                        Пошук з ШІ
                    </button>
                </div>

                {/* Search Form */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Departure */}
                    <div className="space-y-2">
                        <label className="text-slate-300 text-xs uppercase font-bold tracking-wider">Звідки</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">✈️</span>
                            <select
                                value={searchParams.departure}
                                onChange={(e) => setSearchParams({ ...searchParams, departure: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 appearance-none focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                                <option value="kyiv">Київ</option>
                                <option value="lviv">Львів</option>
                                <option value="odesa">Одеса</option>
                                <option value="warsaw">Варшава</option>
                                <option value="chisinau">Кишинів</option>
                            </select>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                        <label className="text-slate-300 text-xs uppercase font-bold tracking-wider">Куди</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🌍</span>
                            <select
                                value={searchParams.destination}
                                onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 appearance-none focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                                <option value="">Всі напрямки</option>
                                {destinations.map(d => (
                                    <option key={d.id} value={d.id}>{d.flag} {d.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date & Nights */}
                    <div className="space-y-2">
                        <label className="text-slate-300 text-xs uppercase font-bold tracking-wider">Дата і тривалість</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="date"
                                value={searchParams.date}
                                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                                className="bg-slate-900/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]"
                            />
                            <select
                                value={searchParams.nights}
                                onChange={(e) => setSearchParams({ ...searchParams, nights: e.target.value })}
                                className="bg-slate-900/50 border border-white/10 text-white rounded-xl py-3 px-4 appearance-none focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                                <option value="1-6">1-6 ночей</option>
                                <option value="7-14">7-14 ночей</option>
                                <option value="14+">14+ ночей</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-3 px-6 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                        {isSearching ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Пошук...</span>
                            </>
                        ) : (
                            <>
                                <span>Знайти тур</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mt-6 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl overflow-hidden shadow-2xl p-6">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <p className="text-white">{error}</p>
                    </div>
                </div>
            )}

            {/* Results Display */}
            {results.length > 0 && (
                <div id="search-results" className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6"
                    style={{ opacity: 1, visibility: 'visible' }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Знайдені тури:</h3>
                        {dataSource && (
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <span className={`w-2 h-2 rounded-full bg-green-500`}></span>
                                <span>{dataSource === 'static' ? 'Glorious Travel' : dataSource === 'multi' ? 'Всі туроператори' : dataSource === 'TPG' ? 'Пошук TPG' : dataSource === 'api' ? 'Glorious Travel' : 'Веб-пошук'}</span>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((tour, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedTour(tour)}
                                className="block bg-slate-900/50 rounded-xl overflow-hidden hover:bg-slate-900/70 transition-colors group text-left w-full cursor-pointer"
                            >
                                <div className="h-48 relative bg-slate-800">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={tour.image} alt={tour.hotelName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded ${tour.source === 'TPG' ? 'bg-orange-500' : 'bg-indigo-600'
                                        }`}>
                                        {tour.source || 'Glorious Travel'}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-lg text-white mb-2 line-clamp-2">{tour.hotelName}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-indigo-400 font-bold text-xl">{tour.price}</p>
                                        <span className="text-slate-400 text-sm">{tour.duration} ночей</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tour Modal */}
            <TourModal
                tour={selectedTour}
                isOpen={!!selectedTour}
                onClose={() => setSelectedTour(null)}
            />
        </div>
    )
}
