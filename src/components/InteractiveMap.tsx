'use client'

import { useState } from 'react'
import Link from 'next/link'

const COUNTRIES = [
  { id: 'turkey', name: 'Туреччина', flag: '🇹🇷', x: 57.5, y: 30, color: '#6366f1', price: 'від 450€' },
  { id: 'egypt', name: 'Єгипет', flag: '🇪🇬', x: 54, y: 42, color: '#fbbf24', price: 'від 380€' },
  { id: 'uae', name: 'ОАЕ', flag: '🇦🇪', x: 63, y: 40, color: '#10b981', price: 'від 650€' },
  { id: 'spain', name: 'Іспанія', flag: '🇪🇸', x: 47, y: 28, color: '#ef4444', price: 'від 500€' },
  { id: 'greece', name: 'Греція', flag: '🇬🇷', x: 54, y: 31, color: '#3b82f6', price: 'від 420€' },
  { id: 'thailand', name: 'Таїланд', flag: '🇹🇭', x: 76, y: 48, color: '#f472b6', price: 'від 700€' },
  { id: 'bali', name: 'Балі', flag: '🇮🇩', x: 80, y: 60, color: '#8b5cf6', price: 'від 850€' },
  { id: 'maldives', name: 'Мальдіви', flag: '🇲🇻', x: 68, y: 54, color: '#06b6d4', price: 'від 1200€' }
]

export default function InteractiveMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-24 px-[5%] bg-slate-950 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Інтерактивна <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Карта Світу</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Оберіть свій наступний пункт призначення прямо на карті
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Map area */}
          <div className="flex-1 relative bg-slate-900/40 backdrop-blur-xl rounded-[32px] border border-white/5 shadow-2xl overflow-hidden" style={{ minHeight: '500px' }}>
            
            {/* Real world map image from a public SVG */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Simplified_blank_world_map_without_Antartica_%28no_borders%29.svg"
              alt="World map"
              className="absolute inset-0 w-full h-full object-contain p-8 opacity-20 pointer-events-none"
              style={{ filter: 'brightness(3) invert(1) sepia(1) hue-rotate(200deg) saturate(0.5)' }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '10% 10%'
              }}
            />

            {/* Animated pin points */}
            {COUNTRIES.map((country) => (
              <Link
                key={country.id}
                href="/countries"
                className="absolute z-20 no-underline"
                style={{ left: `${country.x}%`, top: `${country.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHovered(country.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulsing ring */}
                <div 
                  className="absolute -inset-3 rounded-full animate-ping opacity-20 pointer-events-none"
                  style={{ backgroundColor: country.color }}
                />
                {/* Glow */}
                <div
                  className="absolute -inset-2 rounded-full opacity-30 pointer-events-none blur-sm"
                  style={{ backgroundColor: country.color }}
                />
                {/* Main dot */}
                <div 
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 cursor-pointer ${hovered === country.id ? 'scale-[2.5] z-50' : 'scale-100'}`}
                  style={{ backgroundColor: country.color, boxShadow: `0 0 20px ${country.color}` }}
                />

                {/* Tooltip on hover */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-5 whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${hovered === country.id ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 translate-y-3 scale-90 invisible'}`}>
                  <div className="bg-white text-slate-900 px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="text-sm font-bold">{country.name}</div>
                      <div className="text-xs text-indigo-600 font-semibold">{country.price}</div>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white rotate-45 mx-auto -mt-1.5 shadow-xl" />
                </div>
              </Link>
            ))}
          </div>

          {/* Side panel with destinations list */}
          <div className="lg:w-[320px] shrink-0">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] h-full flex flex-col">
              <h4 className="text-white font-bold mb-5 text-xl">🌍 Топ Напрямки</h4>
              
              <div className="flex flex-col gap-2.5 flex-1">
                {COUNTRIES.map(country => (
                  <Link
                    key={country.id}
                    href="/countries"
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group no-underline"
                    onMouseEnter={() => setHovered(country.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{country.flag}</span>
                      <div>
                        <span className={`text-sm font-semibold transition-colors block ${hovered === country.id ? 'text-white' : 'text-slate-300'}`}>
                          {country.name}
                        </span>
                        <span className="text-xs text-slate-500">{country.price}</span>
                      </div>
                    </div>
                    <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-all text-sm translate-x-1 group-hover:translate-x-0 font-medium">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <Link href="/countries" className="block w-full mt-4 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all text-center no-underline hover:scale-[1.02] active:scale-95">
                Показати всі країни
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
