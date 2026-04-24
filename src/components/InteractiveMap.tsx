'use client'

import { useState } from 'react'
import { useModal } from '@/context/ModalContext'
import { destinations } from '@/data/destinations'
import Globe from './Globe'
import { motion, AnimatePresence } from 'motion/react'

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

        <div className="flex flex-col lg:flex-row gap-12 items-center min-h-[500px]">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex-[3] relative w-full aspect-square md:aspect-auto h-[600px] flex items-center justify-center overflow-hidden rounded-[80px]"
          >
             <Globe />
          </motion.div>

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
