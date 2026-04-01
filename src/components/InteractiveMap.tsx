'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useModal } from '@/context/ModalContext'
import { destinations } from '@/data/destinations'

const COUNTRIES = [
  { id: 'spain', name: 'Іспанія', x: 47.5, y: 34, color: '#ef4444' }, // Spain
  { id: 'greece', name: 'Греція', x: 53.5, y: 35.5, color: '#3b82f6' }, // Greece
  { id: 'turkey', name: 'Туреччина', x: 57, y: 35.5, color: '#6366f1' }, // Turkey
  { id: 'egypt', name: 'Єгипет', x: 54.5, y: 44, color: '#fbbf24' }, // Egypt
  { id: 'uae', name: 'ОАЕ', x: 62.5, y: 44.5, color: '#10b981' }, // UAE
  { id: 'thailand', name: 'Таїланд', x: 77.5, y: 56, color: '#f472b6' }, // Thailand
  { id: 'maldives', name: 'Мальдіви', x: 69.5, y: 64, color: '#06b6d4' }, // Maldives
  { id: 'bali', name: 'Балі', x: 81.5, y: 74, color: '#8b5cf6' }, // Bali
]

export default function InteractiveMap() {
  const { openModal } = useModal()
  const [hovered, setHovered] = useState<string | null>(null)

  const handleCountryClick = (id: string) => {
    const dest = destinations.find(d => d.id === id)
    if (dest) openModal(dest)
  }

  return (
    <section id="map" className="py-24 px-[5%] bg-slate-950 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Інтерактивна <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Карта Світу</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Оберіть свій наступний пункт призначення прямо на карті
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[500px]">
          <div className="flex-[3] relative bg-slate-900 shadow-2xl overflow-hidden rounded-[40px] border border-white/5 aspect-[16/9] lg:aspect-auto">
            {/* World Map Image Background */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/world-map.png"
                alt="Premium World Map"
                fill
                className="object-cover opacity-80 brightness-75 transition-all duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '100px 100px'
              }}
            />

            {/* Interactive Points */}
            <div className="absolute inset-0 z-20">
              {COUNTRIES.map((country) => {
                const dest = destinations.find(d => d.id === country.id)
                return (
                  <button
                    key={country.id}
                    onClick={() => handleCountryClick(country.id)}
                    className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 hover:z-30"
                    style={{ left: `${country.x}%`, top: `${country.y}%` }}
                    onMouseEnter={() => setHovered(country.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="relative group">
                      {/* Pulsing ring */}
                      <div className={`absolute -inset-6 rounded-full transition-all duration-700 blur-2xl animate-pulse ${hovered === country.id ? 'opacity-60 scale-150' : 'opacity-20 scale-100'}`}
                        style={{ backgroundColor: country.color }}
                      />
                      
                      {/* Pin Main Head */}
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center relative z-10 ${hovered === country.id ? 'scale-150 shadow-[0_0_25px_white]' : 'scale-100'}`}
                        style={{ backgroundColor: country.color }}
                      >
                         <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>

                      {/* Tooltip */}
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 whitespace-nowrap transition-all duration-500 z-50 ${hovered === country.id ? 'opacity-100 translate-y-0 scale-105' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/20 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl">{dest?.flag}</span>
                            <span className="tracking-tight text-lg">{dest?.name}</span>
                          </div>
                          <span className="text-indigo-300 font-medium">{dest?.price}</span>
                          <div className="w-20 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-full animate-progress" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:w-[350px] shrink-0">
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[40px] h-full flex flex-col shadow-2xl">
              <h4 className="text-white font-black mb-8 text-2xl tracking-tighter flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center shadow-indigo-500/20 shadow-2xl">
                  <span className="text-xl">🗺️</span>
                </div>
                Напрямки
              </h4>

              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {COUNTRIES.map(country => {
                  const dest = destinations.find(d => d.id === country.id)
                  return (
                    <button
                      key={country.id}
                      onClick={() => handleCountryClick(country.id)}
                      className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-500 group relative overflow-hidden h-[74px] ${hovered === country.id ? 'bg-white text-slate-950 border-white translate-x-2' : 'bg-white/[0.03] border-white/[0.05] text-slate-300 hover:bg-white/[0.08]'}`}
                      onMouseEnter={() => setHovered(country.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex items-center gap-5 relative z-10">
                        <span className="text-3xl transition-transform duration-500 group-hover:scale-110">{dest?.flag}</span>
                        <div className="flex flex-col items-start translate-y-[-1px]">
                          <span className="text-sm font-black tracking-tight uppercase">{dest?.name}</span>
                          <span className={`text-[10px] font-bold ${hovered === country.id ? 'text-indigo-600' : 'text-slate-500'}`}>{dest?.price}</span>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${hovered === country.id ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500'}`}>
                        <span className="font-black text-lg">→</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <button
                  onClick={() => handleCountryClick('turkey')}
                  className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(255,255,255,0.1)] transition-all hover:bg-indigo-50 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <span className="group-hover:translate-x-[-2px] transition-transform">Підібрати</span>
                  <span>ТУР</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
