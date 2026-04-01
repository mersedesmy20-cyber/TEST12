'use client'

import { useState } from 'react'
import { useModal } from '@/context/ModalContext'
import { destinations } from '@/data/destinations'

const COUNTRIES = [
  { id: 'turkey', name: 'Туреччина', x: 57.5, y: 32, color: '#6366f1' },
  { id: 'egypt', name: 'Єгипет', x: 54, y: 44, color: '#fbbf24' },
  { id: 'uae', name: 'ОАЕ', x: 63, y: 42, color: '#10b981' },
  { id: 'spain', name: 'Іспанія', x: 47, y: 30, color: '#ef4444' },
  { id: 'greece', name: 'Греція', x: 54, y: 33, color: '#3b82f6' },
  { id: 'thailand', name: 'Таїланд', x: 76, y: 50, color: '#f472b6' },
  { id: 'bali', name: 'Балі', x: 80, y: 62, color: '#8b5cf6' },
  { id: 'maldives', name: 'Мальдіви', x: 68, y: 56, color: '#06b6d4' }
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

        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-auto lg:h-[600px]">
          <div className="flex-[3] relative bg-slate-900/40 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden min-h-[400px]">
            {/* World Map SVG Path (Simplified) */}
            <div className="absolute inset-0 p-8 opacity-20 pointer-events-none">
              <svg viewBox="0 0 1000 500" className="w-full h-full fill-slate-500">
                <path d="M165.7 122.9C157.9 119.5 142.1 123.6 137.9 125.6 133.5 127.7 131.4 127.1 127.7 130 115 139.7 108.6 153.9 104.9 169.1 101.9 181.7 100.8 194.5 102.1 207.3 103.5 220 114.7 236.4 116.5 249.2 118 260.6 112.5 272.2 108.5 283.4 100.3 306.9 96.6 331.6 97.4 356.4 97.8 368.5 104 380 114.6 386.4 125.8 393.2 138.8 396.9 151.7 398.2 165.3 399.5 178.6 400.1 192.4 400.2 205.8 400.3 226.7 395 238.1 382.4 251.2 368 261.2 352.5 271.8 340.6 280 327.3 289.4 314.1 300.9 303.1 303.3 294.9 304.5 285 301.7 277 296 261.9 281.3 255.4 259.9 263.1 241.6 270.8 223.3 291 214.3 308.2 201 325 188.1 334.6 168.3 331 147.4 327.3 126.5 315.3 108.3 297 96.1 278.7 83.9 256.3 78.4 233.9 78.1 211.5 77.8 188.9 83.4 167.3 90 145.8 96.6 122.9 104.1 113.8 126.9 107.5 142.9 113.4 159.2 122 175.7z M500 150 C510 130 540 120 560 130 580 140 590 170 580 190 570 210 540 230 520 220 500 210 490 170 500 150z M700 80 C740 70 800 80 840 100 880 120 920 160 920 210 920 260 880 310 820 330 760 350 700 340 660 300 620 260 620 180 660 120 680 100 700 80z M850 400 C870 380 920 380 940 400 960 420 960 460 940 480 920 500 870 500 850 480 830 460 830 420 850 400z" />
                <circle cx="580" cy="150" r="120" />
                <circle cx="280" cy="180" r="100" />
                <circle cx="350" cy="350" r="90" />
                <circle cx="550" cy="300" r="110" />
                <circle cx="850" cy="420" r="60" />
              </svg>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '80px 80px'
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
                    className="absolute transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${country.x}%`, top: `${country.y}%` }}
                    onMouseEnter={() => setHovered(country.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="relative group">
                       <div 
                         className={`absolute -inset-4 rounded-full transition-all duration-500 blur-xl ${hovered === country.id ? 'opacity-40' : 'opacity-0'}`}
                         style={{ backgroundColor: country.color }}
                       />
                       <div 
                         className={`w-6 h-6 rounded-full border-2 border-white shadow-2xl transition-all duration-300 flex items-center justify-center ${hovered === country.id ? 'scale-125' : 'scale-100'}`}
                         style={{ backgroundColor: country.color, boxShadow: `0 0 20px ${country.color}` }}
                       >
                         <span className="text-[10px] leading-none drop-shadow-md">📍</span>
                       </div>

                       {/* Tooltip */}
                       <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 whitespace-nowrap transition-all duration-500 z-50 ${hovered === country.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                         <div className="bg-slate-900 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl flex flex-col items-center">
                            <span className="text-xl mb-0.5">{dest?.flag}</span>
                            <span className="tracking-tight">{dest?.name}</span>
                            <span className="text-[10px] text-indigo-400 mt-0.5">{dest?.price}</span>
                         </div>
                       </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:w-[350px] shrink-0">
            <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] h-full flex flex-col shadow-inner">
              <h4 className="text-white font-black mb-8 text-2xl tracking-tighter flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">🗺️</span>
                Напрямки
              </h4>
              
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {COUNTRIES.map(country => {
                   const dest = destinations.find(d => d.id === country.id)
                   return (
                    <button
                      key={country.id}
                      onClick={() => handleCountryClick(country.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group ${hovered === country.id ? 'bg-white text-slate-950 border-white translate-x-2' : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'}`}
                      onMouseEnter={() => setHovered(country.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{dest?.flag}</span>
                        <span className="text-sm font-bold tracking-tight">{dest?.name}</span>
                      </div>
                      <span className={`font-black transition-transform group-hover:translate-x-1 ${hovered === country.id ? 'text-indigo-600' : 'text-indigo-400'}`}>→</span>
                    </button>
                   )
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-500 mb-4 text-center">Оберіть країну на карті або у списку, щоб дізнатися деталі</p>
                <div 
                  onClick={() => handleCountryClick('turkey')}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all text-center cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  Підібрати тур
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
