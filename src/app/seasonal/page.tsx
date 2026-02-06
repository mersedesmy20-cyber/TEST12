'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DestinationModal from '@/components/DestinationModal'
import QuizModal from '@/components/QuizModal'
import { useModal } from '@/context/ModalContext'
import { destinations } from '@/data/destinations'

// Mock Data for Hot Deals
const hotDeals = [
    {
        id: 'hot-1',
        destinationId: 'turkey', // Links to main destination data
        hotelName: 'Rixos Premium Tekirova',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop', // Hotel specific or generic
        nights: 7,
        people: 2,
        date: '12.02.2026',
        oldPrice: 1200,
        newPrice: 850,
        discount: 30,
        tags: ['Ultra All Inclusive', 'Перша лінія']
    },
    {
        id: 'hot-2',
        destinationId: 'egypt',
        hotelName: 'Albatros Jungle Aqua Park',
        stars: 4,
        image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600&auto=format&fit=crop',
        nights: 7,
        people: 2,
        date: '14.02.2026',
        oldPrice: 900,
        newPrice: 550,
        discount: 40,
        tags: ['Аквапарк', 'Сімейний']
    },
    {
        id: 'hot-3',
        destinationId: 'uae',
        hotelName: 'Rixos The Palm Dubai',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=600&auto=format&fit=crop',
        nights: 5,
        people: 2,
        date: '20.02.2026',
        oldPrice: 2000,
        newPrice: 1400,
        discount: 30,
        tags: ['Сніданки', 'Вид на Марину']
    },
    {
        id: 'hot-4',
        destinationId: 'zanzibar',
        hotelName: 'Zuri Zanzibar',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=600&auto=format&fit=crop',
        nights: 10,
        people: 2,
        date: '01.03.2026',
        oldPrice: 2500,
        newPrice: 1800,
        discount: 28,
        tags: ['Бунгало', 'Океан']
    },
    {
        id: 'hot-5',
        destinationId: 'thailand',
        hotelName: 'Centara Grand Beach',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=600&auto=format&fit=crop',
        nights: 11,
        people: 2,
        date: '15.02.2026',
        oldPrice: 1800,
        newPrice: 1350,
        discount: 25,
        tags: ['Сніданки', 'Пхукет']
    },
    {
        id: 'hot-6',
        destinationId: 'dominican',
        hotelName: 'Hard Rock Hotel & Casino',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1548574505-12cf80521cc5?q=80&w=600&auto=format&fit=crop',
        nights: 9,
        people: 2,
        date: '25.02.2026',
        oldPrice: 3000,
        newPrice: 2100,
        discount: 30,
        tags: ['All Inclusive', 'Пунта-Кана']
    }
]

export default function SeasonalPage() {
    const { openModal, openQuiz } = useModal()

    const handleOpenDestination = (destId: string) => {
        const destination = destinations.find(d => d.id === destId)
        if (destination) {
            openModal(destination)
        }
    }

    return (
        <main className="bg-slate-950 min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <div className="relative pt-32 pb-16 px-4 overflow-hidden">
                {/* Fire Background Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-1 mb-6 animate-bounce">
                        <span className="text-2xl">🔥</span>
                        <span className="text-orange-300 font-bold uppercase tracking-wider text-sm">Гарячі пропозиції</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_0_25px_rgba(234,88,12,0.5)]">
                        ПАЛАЮЧІ ТУРИ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">2026</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        Встигніть забронювати! Найкращі ціни на тури, що вилітають найближчим часом. Кількість місць обмежена!
                    </p>
                </div>
            </div>

            {/* Deals Grid */}
            <div className="max-w-[1400px] mx-auto px-[5%] pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotDeals.map((deal, index) => (
                        <div key={deal.id} className="group relative bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(234,88,12,0.2)] transition-all duration-300">

                            {/* Discount Badge */}
                            <div className="absolute top-4 right-4 z-20 bg-red-600 text-white font-black text-lg px-4 py-2 rounded-xl shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                                -{deal.discount}%
                            </div>

                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.hotelName}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                                <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
                                    {deal.tags.map(tag => (
                                        <span key={tag} className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{deal.hotelName}</h3>
                                        <div className="flex text-yellow-400 text-sm mt-1">
                                            {'★'.repeat(deal.stars)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleOpenDestination(deal.destinationId)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        ℹ️
                                    </button>
                                </div>


                                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 border-b border-white/5 pb-4">
                                    <span className="flex items-center gap-1">📅 {deal.date}</span>
                                    <span className="flex items-center gap-1">🌙 {deal.nights} ночей</span>
                                    <span className="flex items-center gap-1">👥 {deal.people} чол.</span>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-slate-500 text-sm line-through mb-1">${deal.oldPrice}</div>
                                        <div className="text-3xl font-black text-white">${deal.newPrice}</div>
                                    </div>
                                    <Link
                                        href={`https://t.me/lizazakharchenko?text=${encodeURIComponent(`🔥 Добрий день! Цікавить гарячий тур: ${deal.hotelName} за $${deal.newPrice}`)}`}
                                        target="_blank"
                                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
                                    >
                                        Забронювати
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quiz Banner Teaser */}
                <div className="mt-24 p-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    <div className="bg-slate-950 rounded-[22px] px-8 py-16 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
                            Не знайшли свій ідеальний тур?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                            Пройдіть короткий тест з 5 питань, і ми підберемо для вас індивідуальну пропозицію зі знижкою!
                        </p>
                        <button
                            onClick={openQuiz}
                            className="relative z-10 inline-block bg-white text-indigo-900 font-black text-xl px-12 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            Пройти тест і отримати підбірку ➡️
                        </button>
                    </div>
                </div>
            </div>

            <DestinationModal />
            <QuizModal />
            <Footer />
        </main>
    )
}
