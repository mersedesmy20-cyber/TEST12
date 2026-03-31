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

  return (
    <section className="py-24 px-[5%] bg-slate-950 overflow-hidden relative">
      {/* Background Glow */}
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
          
          {/* Map area */}
          <div className="flex-[3] relative bg-[#020617] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden group">
            
            {/* World Map SVG using many dots to define continents properly */}
            <div className="absolute inset-0 p-8 flex items-center justify-center opacity-40">
              <svg viewBox="0 0 1000 500" className="w-full h-full fill-indigo-400/50">
                {/* Dotted World Map Data - North America */}
                <g>
                  {[30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330].map(x => 
                    [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250].map(y => {
                      // Filter points roughly matching continents
                      const isNA = (x < 350 && y < 250 && x + y > 150 && x - y < 250)
                      const isSA = (x > 250 && x < 450 && y > 250 && x + y > 600 && x - y < 100)
                      const isEU = (x > 450 && x < 580 && y < 230 && x + y > 530)
                      const isAF = (x > 450 && x < 620 && y > 230 && x + y > 750 && x - y < 250 && y < 450)
                      const isAS = (x > 580 && x < 900 && y < 350 && x + y > 700)
                      const isAU = (x > 750 && x < 950 && y > 350 && x + y > 1200)

                      if (isNA || isSA || isEU || isAF || isAS || isAU) {
                        return <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />
                      }
                      return null
                    })
                  )}
                </g>
              </svg>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
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
                <div 
                  className="absolute -inset-6 rounded-full animate-pulse opacity-20 pointer-events-none"
                  style={{ backgroundColor: country.color }}
                />
                <div
                  className="absolute -inset-4 rounded-full opacity-30 pointer-events-none blur-md"
                  style={{ backgroundColor: country.color }}
                />
                <div 
                  className={`w-7 h-7 rounded-full border-4 border-slate-900 shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center ${hovered === country.id ? 'scale-[2.5] z-50' : 'scale-100'}`}
                  style={{ backgroundColor: country.color, boxShadow: `0 0 40px ${country.color}` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                </div>

                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-8 whitespace-nowrap transition-all duration-500 pointer-events-none z-50 ${hovered === country.id ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 translate-y-4 scale-90 invisible'}`}>
                  <div className="bg-slate-900 border border-white/20 text-white px-7 py-5 rounded-2xl font-bold shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col items-center gap-1">
                    <span className="text-4xl mb-1">{country.flag}</span>
                    <span className="text-lg font-black tracking-tight uppercase">{country.name}</span>
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-[0.2em]">{country.price}</span>
                  </div>
                  <div className="w-5 h-5 bg-slate-900 border-r border-b border-white/20 rotate-45 mx-auto -mt-2.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Side panel with destinations list */}
          <div className="lg:w-[350px] shrink-0">
            <div className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] shadow-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-2xl shadow-inner">🌍</div>
                <div>
                   <h4 className="text-white font-black text-2xl tracking-tight leading-none mb-1">Напрямки</h4>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Top Destinations</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {COUNTRIES.map(country => (
                  <Link
                    key={country.id}
                    href="/countries"
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-500 no-underline group shadow-lg ${hovered === country.id ? 'bg-indigo-600 border-indigo-400 -translate-y-1 shadow-indigo-500/25' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                    onMouseEnter={() => setHovered(country.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-5">
                      <span className={`text-3xl transition-transform duration-500 ${hovered === country.id ? 'scale-125' : ''}`}>{country.flag}</span>
                      <div>
                        <span className={`text-base font-black block transition-colors ${hovered === country.id ? 'text-white' : 'text-slate-100'}`}>
                          {country.name}
                        </span>
                        <span className={`text-xs font-bold ${hovered === country.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {country.price}
                        </span>
                      </div>
                    </div>
                    <span className={`transition-all duration-300 font-bold text-xl ${hovered === country.id ? 'text-white translate-x-0 opacity-100' : 'text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <Link href="/countries" className="block w-full mt-8 py-5 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-400 rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/30 transition-all text-center no-underline hover:scale-[1.03] active:scale-95">
                Переглянути все
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.6);
        }
      `}</style>
    </section>
  )
}
