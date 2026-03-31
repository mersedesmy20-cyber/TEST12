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

        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-[600px]">
          
          {/* Map area */}
          <div className="flex-[3] relative bg-[#020617] rounded-[32px] border border-white/5 shadow-2xl overflow-hidden group">
            
            {/* Dotted World Map Background (Vectorized) */}
            <div className="absolute inset-0 p-10 opacity-30 pointer-events-none">
              <svg viewBox="0 0 1000 500" className="w-full h-full fill-white/40">
                {/* Simplified North America */}
                <circle cx="150" cy="120" r="2.5"/><circle cx="170" cy="130" r="2.5"/><circle cx="190" cy="140" r="2.5"/><circle cx="210" cy="150" r="2.5"/>
                <circle cx="180" cy="160" r="2.5"/><circle cx="200" cy="170" r="2.5"/><circle cx="220" cy="180" r="2.5"/><circle cx="240" cy="190" r="2.5"/>
                <circle cx="210" cy="210" r="2.5"/><circle cx="230" cy="220" r="2.5"/><circle cx="250" cy="230" r="2.5"/><circle cx="270" cy="240" r="2.5"/>
                <circle cx="260" cy="130" r="2.5"/><circle cx="280" cy="140" r="2.5"/><circle cx="300" cy="150" r="2.5"/><circle cx="320" cy="160" r="2.5"/>
                <circle cx="290" cy="180" r="2.5"/><circle cx="310" cy="190" r="2.5"/><circle cx="330" cy="200" r="2.5"/><circle cx="350" cy="210" r="2.5"/>
                
                {/* South America */}
                <circle cx="320" cy="350" r="2.5"/><circle cx="340" cy="370" r="2.5"/><circle cx="360" cy="390" r="2.5"/><circle cx="350" cy="420" r="2.5"/>
                <circle cx="340" cy="340" r="2.5"/><circle cx="360" cy="360" r="2.5"/><circle cx="380" cy="380" r="2.5"/><circle cx="370" cy="410" r="2.5"/>
                <circle cx="310" cy="330" r="2.5"/><circle cx="330" cy="360" r="2.5"/><circle cx="350" cy="380" r="2.5"/><circle cx="340" cy="400" r="2.5"/>

                {/* Europe */}
                <circle cx="480" cy="120" r="2.5"/><circle cx="500" cy="130" r="2.5"/><circle cx="520" cy="140" r="2.5"/><circle cx="540" cy="150" r="2.5"/>
                <circle cx="470" cy="150" r="2.5"/><circle cx="490" cy="160" r="2.5"/><circle cx="510" cy="170" r="2.5"/><circle cx="530" cy="180" r="2.5"/>
                <circle cx="500" cy="190" r="2.5"/><circle cx="520" cy="200" r="2.5"/><circle cx="540" cy="210" r="2.5"/><circle cx="560" cy="220" r="2.5"/>

                {/* Africa */}
                <circle cx="480" cy="280" r="2.5"/><circle cx="500" cy="290" r="2.5"/><circle cx="520" cy="300" r="2.5"/><circle cx="540" cy="310" r="2.5"/>
                <circle cx="470" cy="320" r="2.5"/><circle cx="490" cy="330" r="2.5"/><circle cx="510" cy="340" r="2.5"/><circle cx="530" cy="350" r="2.5"/>
                <circle cx="500" cy="370" r="2.5"/><circle cx="520" cy="380" r="2.5"/><circle cx="540" cy="390" r="2.5"/><circle cx="530" cy="410" r="2.5"/>
                <circle cx="550" cy="300" r="2.5"/><circle cx="570" cy="320" r="2.5"/><circle cx="590" cy="340" r="2.5"/><circle cx="580" cy="370" r="2.5"/>
                
                {/* Asia */}
                <circle cx="650" cy="120" r="2.5"/><circle cx="680" cy="130" r="2.5"/><circle cx="710" cy="140" r="2.5"/><circle cx="740" cy="150" r="2.5"/>
                <circle cx="670" cy="160" r="2.5"/><circle cx="700" cy="170" r="2.5"/><circle cx="730" cy="180" r="2.5"/><circle cx="760" cy="190" r="2.5"/>
                <circle cx="720" cy="210" r="2.5"/><circle cx="750" cy="220" r="2.5"/><circle cx="780" cy="230" r="2.5"/><circle cx="810" cy="240" r="2.5"/>
                <circle cx="630" cy="250" r="2.5"/><circle cx="660" cy="260" r="2.5"/><circle cx="690" cy="270" r="2.5"/><circle cx="720" cy="280" r="2.5"/>
                <circle cx="740" cy="300" r="2.5"/><circle cx="770" cy="310" r="2.5"/><circle cx="800" cy="320" r="2.5"/><circle cx="830" cy="330" r="2.5"/>
                <circle cx="780" cy="350" r="2.5"/><circle cx="810" cy="360" r="2.5"/><circle cx="840" cy="370" r="2.5"/><circle cx="870" cy="380" r="2.5"/>

                {/* Australia */}
                <circle cx="820" cy="450" r="2.5"/><circle cx="840" cy="460" r="2.5"/><circle cx="860" cy="470" r="2.5"/><circle cx="850" cy="485" r="2.5"/>
              </svg>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '80px 80px'
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
                  className="absolute -inset-4 rounded-full animate-ping opacity-20 pointer-events-none"
                  style={{ backgroundColor: country.color }}
                />
                {/* Glow */}
                <div
                  className="absolute -inset-3 rounded-full opacity-30 pointer-events-none blur-md"
                  style={{ backgroundColor: country.color }}
                />
                {/* Main dot with center core */}
                <div 
                  className={`w-6 h-6 rounded-full border-4 border-slate-900 shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center ${hovered === country.id ? 'scale-[2] z-50' : 'scale-100'}`}
                  style={{ backgroundColor: country.color, boxShadow: `0 0 30px ${country.color}` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                </div>

                {/* Tooltip on hover */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 whitespace-nowrap transition-all duration-500 pointer-events-none z-50 ${hovered === country.id ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 translate-y-4 scale-90 invisible'}`}>
                  <div className="bg-slate-900 border border-white/10 text-white px-6 py-4 rounded-2xl font-bold shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-1">
                    <span className="text-3xl mb-1">{country.flag}</span>
                    <span className="text-sm font-black tracking-tight">{country.name}</span>
                    <span className="text-xs text-indigo-400 font-medium uppercase tracking-widest">{country.price}</span>
                  </div>
                  <div className="w-4 h-4 bg-slate-900 border-r border-b border-white/10 rotate-45 mx-auto -mt-2 shadow-xl" />
                </div>
              </Link>
            ))}
          </div>

          {/* Side panel with destinations list */}
          <div className="lg:w-[350px] shrink-0">
            <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] shadow-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-xl">🌍</div>
                <h4 className="text-white font-black text-2xl tracking-tight">Напрямки</h4>
              </div>
              
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {COUNTRIES.map(country => (
                  <Link
                    key={country.id}
                    href="/countries"
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 no-underline group ${hovered === country.id ? 'bg-indigo-600 border-indigo-400 translate-x-2' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                    onMouseEnter={() => setHovered(country.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl transition-transform duration-300 ${hovered === country.id ? 'scale-125' : ''}`}>{country.flag}</span>
                      <div>
                        <span className={`text-sm font-bold block transition-colors ${hovered === country.id ? 'text-white' : 'text-slate-100'}`}>
                          {country.name}
                        </span>
                        <span className={`text-xs font-medium ${hovered === country.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {country.price}
                        </span>
                      </div>
                    </div>
                    <span className={`transition-all duration-300 font-bold ${hovered === country.id ? 'text-white translate-x-0 opacity-100' : 'text-indigo-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <Link href="/countries" className="block w-full mt-8 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all text-center no-underline hover:scale-[1.02] active:scale-95">
                Всі напрямки
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </section>
  )
}
