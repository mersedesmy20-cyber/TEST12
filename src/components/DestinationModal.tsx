'use client'

import { useEffect, useRef, useState } from 'react'
import { useModal } from '@/context/ModalContext'
import Link from 'next/link'
import Image from 'next/image'

export default function DestinationModal() {
  const { isOpen, selectedDestination, closeModal } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)
  const [activeAttraction, setActiveAttraction] = useState<any>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeAttraction) {
          setActiveAttraction(null)
        } else if (isOpen) {
          closeModal()
        }
      }
    }

    // Standard Scroll Locking
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal, activeAttraction])

  // Focus modal on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen || !selectedDestination) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[2000] h-full w-full overflow-y-auto overflow-x-hidden bg-black/95 animate-fadeIn custom-scrollbar overscroll-contain focus:outline-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
      onWheel={(e) => e.stopPropagation()}
      tabIndex={-1}
    >
      {/* Background Image Fixed */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10 transition-transform duration-700 pointer-events-none opacity-40 blur-sm"
        style={{ backgroundImage: `url('${selectedDestination.image}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group shadow-lg cursor-pointer"
      >
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content Container */}
      <div className="relative w-full max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="animate-scaleIn">

          {/* Header Section */}
          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/10 text-white shadow-lg cursor-default hover:bg-white/20 transition-colors">
              <span className="text-3xl filter drop-shadow-md">{selectedDestination.flag}</span>
              <span className="font-bold uppercase tracking-widest text-sm text-indigo-200">{selectedDestination.region}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight shadow-glow drop-shadow-2xl">
              {selectedDestination.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-lg font-medium text-slate-200">
              <span className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-colors">
                {selectedDestination.seasonIcon} {selectedDestination.season}
              </span>
              <span className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-colors">
                💰 {selectedDestination.price}
              </span>
            </div>
          </div>

          {/* Intro Description */}
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl mb-10 max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-slate-100 leading-relaxed font-light">
              {selectedDestination.desc}
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
              <span className="text-indigo-400">★</span> Чому варто відвідати
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedDestination.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-center">
                  <span className="text-indigo-400">✦</span>
                  <span className="font-medium text-slate-200">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RICH ATTRACTIONS SECTION (Interactive, NO PHOTO IN GRID) */}
          {selectedDestination.attractions ? (
            <div className="mb-12 animate-fadeIn">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">📷</span> Що подивитися
                <span className="text-sm font-normal text-slate-400 bg-white/10 px-3 py-1 rounded-full ml-auto">Натисніть для деталей</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedDestination.attractions.map((attr: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => setActiveAttraction(attr)}
                    className="group h-40 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 flex flex-col items-center justify-center gap-3 text-center"
                  >
                    <span className="text-5xl filter drop-shadow-lg transform transition-transform group-hover:scale-105 duration-300">{attr.icon}</span>
                    <h4 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-300 transition-colors">{attr.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Fallback Standard 'What to see' list if no rich data */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">📷</span> Що подивитися
                </h4>
                <ul className="space-y-4">
                  {selectedDestination.whatToSee?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold shadow-lg">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* This block is only shown if NO attractons data, to preserve old layout */}
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">🛍️</span> Що купити
                </h4>
                <ul className="space-y-4">
                  {selectedDestination.whatToBuy?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <span className="text-pink-400 mt-0.5">♥</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Shopping (Rich Section or Standard List if Rich Attractions exist) */}
          {selectedDestination.attractions && (
            <div className="mb-12 animate-fadeIn">
              <h4 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">🛍️</span> Що привезти з собою
              </h4>

              {selectedDestination.souvenirs ? (
                /* Rich Clickable Souvenirs */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedDestination.souvenirs.map((item: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => setActiveAttraction(item)}
                      className="group h-40 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 flex flex-col items-center justify-center gap-3 text-center"
                    >
                      <span className="text-5xl filter drop-shadow-md transform transition-transform group-hover:scale-105 duration-300">{item.icon}</span>
                      <span className="text-white font-bold text-lg group-hover:text-pink-300 transition-colors leading-tight">{item.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Legacy Shopping List Grid (Modernized style) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedDestination.whatToBuy?.map((item, index) => (
                    <div key={index} className="flex items-center justify-center gap-3 p-6 h-24 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-center">
                      <span className="text-pink-400 text-2xl">♥</span>
                      <span className="text-slate-200 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* Tips Section */}
          {selectedDestination.tips && selectedDestination.tips.length > 0 && (
            <div className="bg-amber-900/20 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-amber-500/20 relative overflow-hidden mb-12 shadow-xl">
              <div className="absolute -right-10 -top-10 text-[10rem] opacity-5 rotate-12 select-none pointer-events-none text-amber-500">💡</div>
              <h3 className="text-2xl font-bold text-amber-200 mb-8 flex items-center gap-3 relative z-10">
                <span className="text-3xl">💡</span> Лайфхаки від туристів
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {selectedDestination.tips.map((tip, index) => (
                  <div key={index} className="bg-black/40 p-6 rounded-2xl border border-white/5 text-amber-100 italic text-lg leading-relaxed shadow-inner">
                    " {tip} "
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-6 pb-20">
            <h3 className="text-3xl font-bold text-white text-center">Мрієте про цю подорож?</h3>
            <p className="text-slate-400 text-center max-w-lg mb-4">Наш менеджер Ліза вже готова підібрати для вас ідеальний тур в {selectedDestination.name}!</p>
            <Link
              href={`https://t.me/lizazakharchenko?text=${encodeURIComponent(`👋 Привіт! Хочу поїхати в ${selectedDestination.name} (${selectedDestination.region}). Підберіть мені найкращий тур!`)}`}
              target="_blank"
              onClick={() => {
                import('@/lib/gtag').then(gtag => {
                  gtag.trackTelegramClick()
                  gtag.trackGoogleAdsConversion()
                })
              }}
              className="group relative inline-flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl flex items-center gap-3 ring-1 ring-white/20">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                Замовити тур в Telegram
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* DETAIL MODAL OVERLAY for Attraction/Souvenir */}
      {activeAttraction && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveAttraction(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveAttraction(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-slate-800 to-slate-900">
                {activeAttraction.image ? (
                  <Image
                    src={activeAttraction.image}
                    alt={activeAttraction.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl opacity-50">{activeAttraction.icon}</span>
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="text-5xl mb-4">{activeAttraction.icon}</div>
                <h3 className="text-3xl font-bold text-white mb-4">{activeAttraction.name}</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {activeAttraction.description || "Опис незабаром з'явиться..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
