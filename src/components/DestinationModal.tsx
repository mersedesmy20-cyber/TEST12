'use client'

import { useEffect, useRef } from 'react'
import { useModal } from '@/context/ModalContext'
import Link from 'next/link'

export default function DestinationModal() {
  const { isOpen, selectedDestination, closeModal } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    // Standard Scroll Locking
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // document.body.style.paddingRight = '17px' // Optional: prevent layout shift
    } else {
      document.body.style.overflow = ''
      // document.body.style.paddingRight = ''
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      // Cleanup
      document.body.style.overflow = ''
      // document.body.style.paddingRight = ''
    }
  }, [isOpen, closeModal])

  // Focus modal on open to ensure wheel events are captured
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen || !selectedDestination) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[2000] h-full w-full overflow-y-auto overflow-x-hidden bg-black/90 animate-fadeIn custom-scrollbar overscroll-contain focus:outline-none"
      onClick={(e) => {
        // Only close if clicking the actual background container
        if (e.target === e.currentTarget) closeModal()
      }}
      onWheel={(e) => e.stopPropagation()}
      tabIndex={-1}
    >
      {/* Background Image Fixed */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10 transition-transform duration-700 pointer-events-none opacity-60"
        style={{ backgroundImage: `url('${selectedDestination.image}')` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
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
      <div className="relative w-full max-w-5xl mx-auto py-12 px-4 md:px-8">
        <div className="animate-scaleIn">

          {/* Header Section */}
          <div className="text-center mb-10 relative">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-full mb-4 border border-white/10 text-white shadow-lg">
              <span className="text-2xl">{selectedDestination.flag}</span>
              <span className="font-semibold uppercase tracking-widest text-xs lg:text-sm">{selectedDestination.region}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight shadow-glow drop-shadow-2xl">
              {selectedDestination.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-base md:text-lg font-medium text-slate-200">
              <span className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg">
                {selectedDestination.seasonIcon} {selectedDestination.season}
              </span>
              <span className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-lg">
                💰 {selectedDestination.price}
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

            {/* Left Column - Description & Highlights */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
                <p className="text-lg text-slate-100 leading-relaxed font-light">
                  {selectedDestination.desc}
                </p>
              </div>

              {/* Highlights */}
              <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-indigo-400">★</span> Чому варто відвідати
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDestination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-indigo-400 mt-1 text-sm">✦</span>
                      <span className="font-medium text-slate-200 text-sm md:text-base">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Activities & Shopping */}
            <div className="space-y-6">
              {/* What to See */}
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">📷</span> Що подивитися
                </h4>
                <ul className="space-y-3">
                  {selectedDestination.whatToSee?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                      <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold shadow-lg">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Buy */}
              <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">🛍️</span> Що купити
                </h4>
                <ul className="space-y-3">
                  {selectedDestination.whatToBuy?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                      <span className="text-pink-400 mt-0.5">♥</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full Width Bottom - Tips */}
          {selectedDestination.tips && selectedDestination.tips.length > 0 && (
            <div className="bg-amber-900/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-amber-500/20 relative overflow-hidden mb-12 shadow-xl">
              <div className="absolute -right-10 -top-10 text-[8rem] opacity-10 rotate-12 select-none pointer-events-none">💡</div>
              <h3 className="text-xl font-bold text-amber-200 mb-6 flex items-center gap-2 relative z-10">
                <span>💡</span> Лайфхаки від туристів
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {selectedDestination.tips.map((tip, index) => (
                  <div key={index} className="bg-black/40 p-4 rounded-xl border border-white/5 text-amber-100 italic text-sm">
                    " {tip} "
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-5 pb-16">
            <p className="text-xl font-bold text-white text-center">Готові вирушити в подорож?</p>
            <Link
              href={`https://t.me/lizazakharchenko?text=${encodeURIComponent(`👋 Привіт! Хочу поїхати в ${selectedDestination.name} (${selectedDestination.region}). Підберіть мені найкращий тур!`)}`}
              target="_blank"
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:translate-y-[-2px] hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                Замовити тур в Telegram
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
