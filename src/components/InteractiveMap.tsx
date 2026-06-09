'use client'

import { useState } from 'react'
import { useModal } from '@/context/ModalContext'
import dynamic from 'next/dynamic'
import { destinations } from '@/data/destinations'

const Globe = dynamic(() => import('./Globe'), { ssr: false })

// Using accurate lat, lng coordinates matching Three.js satellite texture
const COUNTRIES = [
  { id: 'spain', name: 'Іспанія', lat: 40.4, lng: -3.7, code: 'es', color: '#ef4444' }, // Spain
  { id: 'greece', name: 'Греція', lat: 37.9, lng: 23.7, code: 'gr', color: '#3b82f6' }, // Greece
  { id: 'turkey', name: 'Туреччина', lat: 39.0, lng: 33.0, code: 'tr', color: '#6366f1' }, // Turkey
  { id: 'egypt', name: 'Єгипет', lat: 26.8, lng: 30.8, code: 'eg', color: '#fbbf24' }, // Egypt
  { id: 'uae', name: 'ОАЕ', lat: 24.0, lng: 54.0, code: 'ae', color: '#10b981' }, // UAE
  { id: 'thailand', name: 'Таїланд', lat: 15.8, lng: 100.8, code: 'th', color: '#f472b6' }, // Thailand
  { id: 'maldives', name: 'Мальдіви', lat: 3.2, lng: 73.2, code: 'mv', color: '#06b6d4' }, // Maldives
  { id: 'bali', name: 'Балі', lat: -8.4, lng: 115.1, code: 'id', color: '#8b5cf6' }, // Bali
]

export default function InteractiveMap() {
  const { openModal } = useModal()
  const [hovered, setHovered] = useState<string | null>(null)

  const handleCountryClick = (id: string) => {
    const dest = destinations.find(d => d.id === id)
    if (dest) openModal(dest)
  }

  const markers = COUNTRIES.map(c => ({
    location: [c.lat, c.lng] as [number, number],
    size: hovered === c.id ? 0.1 : 0.05
  }))

  const focusCountry = COUNTRIES.find(c => c.id === hovered)
  const focusLocation = focusCountry ? [focusCountry.lat, focusCountry.lng] as [number, number] : null

  return (
    <section id="map" className="py-24 px-[5%] bg-slate-950 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Інтерактивна <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Карта Світу</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Оберіть свій наступний пункт призначення прямо на глобусі
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[500px]">
          <div className="flex-[3] relative flex items-center justify-center min-h-[400px] bg-slate-900/50 backdrop-blur-3xl shadow-2xl rounded-[40px] border border-white/5">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[40px]" />
             
             {/* The 3D Globe Component */}
             <div className="w-full h-full relative z-10 p-10 flex items-center justify-center">
               <Globe 
                 markers={markers} 
                 focus={focusLocation} 
                 onCountryClick={handleCountryClick}
                 onHoverCountry={setHovered}
               />
             </div>
          </div>

          <div className="lg:w-[350px] shrink-0">
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[40px] h-full flex flex-col shadow-2xl relative z-20">
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
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-8 h-5.5 overflow-hidden rounded-[2px] border border-white/10 shrink-0 relative transition-transform duration-500 group-hover:scale-110">
                          <img 
                            src={`https://flagcdn.com/w40/${country.code}.png`} 
                            alt={country.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
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
