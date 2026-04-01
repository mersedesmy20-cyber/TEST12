'use client'

import { useState } from 'react'
import Link from 'next/link'

const COUNTRIES = [
  { id: 'turkey', name: 'Туреччина', flag: '🇹🇷', x: 57.5, y: 32, color: '#6366f1', price: 'від 450€' },
  { id: 'egypt', name: 'Єгипет', flag: '🇪🇬', x: 54, y: 44, color: '#fbbf24', price: 'від 380€' },
  { id: 'uae', name: 'ОАЕ', flag: '🇦🇪', x: 63, y: 42, color: '#10b981', price: 'від 650€' },
  { id: 'spain', name: 'Іспанія', flag: '🇪🇸', x: 47, y: 30, color: '#ef4444', price: 'від 500€' },
  { id: 'greece', name: 'Греція', flag: '🇬🇷', x: 54, y: 33, color: '#3b82f6', price: 'від 420€' },
  { id: 'thailand', name: 'Таїланд', flag: '🇹🇭', x: 76, y: 50, color: '#f472b6', price: 'від 700€' },
  { id: 'bali', name: 'Балі', flag: '🇮🇩', x: 80, y: 62, color: '#8b5cf6', price: 'від 850€' },
  { id: 'maldives', name: 'Мальдіви', flag: '🇲🇻', x: 68, y: 56, color: '#06b6d4', price: 'від 1200€' }
]

export default function InteractiveMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  // Generate a predictable grid of dots that form a world map
  // We use a broader range to cover the whole world area
  const renderDots = () => {
    const dots = []
    for (let x = 30; x < 970; x += 15) {
      for (let y = 30; y < 470; y += 15) {
        // More accurate world map logic (sampling continents)
        // Values normalized for viewBox 1000x500
        const isWorld = (
          // North America
          (x < 330 && y < 140) || (x < 180 && y < 180) || (x < 260 && y < 240) ||
          // South America
          (x > 240 && x < 380 && y > 240 && y < 450) ||
          // Europe
          (x > 450 && x < 580 && y < 180) ||
          // Africa
          (x > 460 && x < 630 && y > 180 && y < 420) || (x > 500 && x < 650 && y > 220 && y < 350) ||
          // Asia
          (x > 580 && x < 950 && y < 350) || (x > 620 && x < 900 && y < 420) ||
          // Australia
          (x > 780 && x < 930 && y > 350 && y < 460) ||
          // Greenland / Iceland / UK (Simplified)
          (x > 380 && x < 450 && y < 100) || (x > 460 && x < 500 && y < 130)
        )

        if (isWorld) {
          dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" className="hover:fill-indigo-300 transition-colors cursor-default" />)
        }
      }
    }
    return dots
  }

  return (
    <section className="py-24 px-[5%] bg-slate-950 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Інтерактивна <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Карта Світу</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Оберіть свій наступний пункт призначення прямо на карті
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-[600px]">
          
          <div className="flex-[3] relative bg-[#020617] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
            
            {/* Map dots (Native rendering, no external assets) */}
            <div className="absolute inset-0 p-4 opacity-50">
              <svg viewBox="0 0 1000 500" className="w-full h-full fill-indigo-400/60">
                {renderDots()}
              </svg>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '100px 100px'
              }}
            />

            {/* Interactive Points */}
            {COUNTRIES.map((country) => (
              <Link
                key={country.id}
                href="/countries"
                className="absolute z-20 transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${country.x}%`, top: `${country.y}%` }}
                onMouseEnter={() => setHovered(country.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative group">
                   <div 
                     className="absolute -inset-6 rounded-full animate-pulse opacity-30 pointer-events-none"
                     style={{ backgroundColor: country.color }}
                   />
                   <div 
                     className={`w-8 h-8 rounded-full border-4 border-slate-900 shadow-2xl transition-all duration-300 flex items-center justify-center ${hovered === country.id ? 'scale-150 rotate-12' : 'scale-100'}`}
                     style={{ backgroundColor: country.color, boxShadow: `0 0 40px ${country.color}` }}
                   >
                     <span className="text-xs leading-none">📍</span>
                   </div>

                   {/* Tooltip */}
                   <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 whitespace-nowrap transition-all duration-500 z-50 ${hovered === country.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                     <div className="bg-white text-slate-950 px-6 py-4 rounded-2xl font-black shadow-2xl flex flex-col items-center border-t-2 border-indigo-400">
                        <span className="text-4xl mb-1">{country.flag}</span>
                        <span className="text-sm uppercase tracking-tighter">{country.name}</span>
                        <span className="text-[10px] text-indigo-600">{country.price}</span>
                     </div>
                   </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="lg:w-[350px] shrink-0">
            <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] h-full flex flex-col shadow-inner">
              <h4 className="text-white font-black mb-10 text-2xl tracking-tighter flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">🎯</span>
                Напрямки
              </h4>
              
              <div className="flex flex-col gap-3 flex-1">
                {COUNTRIES.map(country => (
                  <Link
                    key={country.id}
                    href="/countries"
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-500 no-underline group shadow-md ${hovered === country.id ? 'bg-white text-slate-950 border-white scale-105' : 'bg-white/5 border-white/5 text-slate-300'}`}
                    onMouseEnter={() => setHovered(country.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{country.flag}</span>
                      <span className="text-sm font-bold tracking-tight">{country.name}</span>
                    </div>
                    <span className={`font-black ${hovered === country.id ? 'text-indigo-600' : 'text-indigo-400'}`}>→</span>
                  </Link>
                ))}
              </div>

              <Link href="/countries" className="block w-full mt-8 py-5 bg-white text-slate-950 hover:bg-indigo-50 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all text-center no-underline hover:scale-[1.05]">
                Всі країни
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
