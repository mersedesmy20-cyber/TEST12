'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Destination } from '@/types/destination'
import { getWeatherForCountry, getWeatherEmoji } from '@/utils/weather'

interface DestinationCardProps {
    destination: Destination
    onClick: () => void
}

export default function DestinationCard({
    destination,
    onClick,
}: DestinationCardProps) {
    const [weather, setWeather] = useState<{ temp: number; emoji: string } | null>(null)

    const handleMouseEnter = () => {
        if (!weather) {
            getWeatherForCountry(destination.id).then((data) => {
                if (data) {
                    setWeather({
                        temp: Math.round(data.temperature),
                        emoji: getWeatherEmoji(data.weathercode)
                    })
                }
            })
        }
    }

    return (
        <div
            className={`destination-card group relative bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] ${destination.gridClass === 'large'
                ? 'md:col-span-2 md:row-span-2 h-[500px]'
                : 'h-[400px]'
                }`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
        >
            <div className="h-full relative overflow-hidden transition-all duration-700 bg-slate-900">
                <Image
                    src={destination.image}
                    alt={destination.name}
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
                    {destination.flag}
                </div>

                {/* Weather Badge */}
                {weather && (
                    <div className="absolute top-4 left-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md bg-black/40 px-3 py-1.5 flex items-center gap-2 text-white z-10 animate-fadeIn">
                        <span className="text-lg">{weather.emoji}</span>
                        <span className="font-bold text-sm">{weather.temp}°C</span>
                        <span className="text-[10px] text-white/50 uppercase tracking-wider ml-1">Зараз</span>
                    </div>
                )}

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10">
                    <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-bold text-white m-0 group-hover:text-indigo-300 transition-colors drop-shadow-md">
                                {destination.name}
                            </h3>
                            <span className="text-2xl filter drop-shadow-lg">{destination.icon}</span>
                        </div>

                        <p className="text-slate-200 text-sm leading-relaxed mb-4 line-clamp-2 opacity-90 font-medium shadow-black drop-shadow-sm">
                            {destination.desc}
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-white/20">
                            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                                <span className="drop-shadow-sm">{destination.seasonIcon}</span>
                                <span className="drop-shadow-sm">{destination.season}</span>
                            </div>
                            <div className="text-lg font-bold text-indigo-300 bg-indigo-900/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-indigo-500/30">
                                {destination.price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
