'use client'

import { useEffect } from 'react'
import { useModal } from '@/context/ModalContext'
import Link from 'next/link'

export default function DestinationModal() {
  const { isOpen, selectedDestination, closeModal } = useModal()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeModal])

  if (!isOpen || !selectedDestination) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[2000] flex items-center justify-center p-4 opacity-0 transition-all duration-300 animate-fadeIn"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={closeModal}
    >
      <div
        className="bg-white text-slate-900 w-full max-w-[1000px] rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.3)] transform translate-y-12 transition-all duration-300 max-h-[90vh] flex flex-col animate-scaleIn"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(50px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col overflow-y-auto custom-scrollbar h-full">
          {/* Header Image */}
          <div
            className="w-full h-[400px] bg-cover bg-center relative shrink-0"
            style={{ backgroundImage: `url('${selectedDestination.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />

            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-2xl text-white cursor-pointer z-50 flex items-center justify-center shadow-lg hover:rotate-90 hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              &times;
            </button>

            <div className="absolute bottom-8 left-8 right-8 text-white drop-shadow-lg">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
                <span className="text-xl">{selectedDestination.flag}</span>
                <span className="font-semibold uppercase tracking-wider text-sm">{selectedDestination.region}</span>
              </div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-none mb-2">
                {selectedDestination.name}
              </h2>
              <div className="flex items-center gap-3 text-lg font-medium text-slate-100">
                <span>{selectedDestination.seasonIcon} {selectedDestination.season}</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span>{selectedDestination.price}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-12">

            {/* Description & Intro */}
            <div className="prose prose-lg max-w-none text-slate-600 font-light text-xl leading-relaxed">
              <p>{selectedDestination.desc}</p>
            </div>

            {/* Why Visit - Cards */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-indigo-600">★</span> Чому варто відвідати
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDestination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-indigo-50 hover:border-indigo-100 hover:shadow-sm">
                    <span className="text-indigo-500 text-xl mt-1">✦</span>
                    <span className="font-medium text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to See & Buy Tabs style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50">
                <h4 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-xl">📷</span>
                  Що подивитися
                </h4>
                <ul className="space-y-4">
                  {selectedDestination.whatToSee?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-pink-50/50 p-8 rounded-3xl border border-pink-100/50">
                <h4 className="text-xl font-bold text-pink-900 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl">🛍️</span>
                  Що купити
                </h4>
                <ul className="space-y-4">
                  {selectedDestination.whatToBuy?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <span className="text-pink-500 mt-0.5">♥</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Life Hacks Section - NEW */}
            {selectedDestination.tips && selectedDestination.tips.length > 0 && (
              <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-[10rem] opacity-5 rotate-12 select-none pointer-events-none">💡</div>
                <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2 relative z-10">
                  <span>💡</span> Лайфхаки від туристів
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                  {selectedDestination.tips.map((tip, index) => (
                    <div key={index} className="bg-white/80 p-4 rounded-xl shadow-sm text-amber-900 font-medium text-sm leading-relaxed">
                      " {tip} "
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl p-6 -mx-8 -mb-12 border-t border-slate-100 flex flex-col items-center gap-4 z-20">
              <div className="text-center mb-2">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Сподобалось?</p>
                <p className="text-2xl font-bold text-slate-900">Забронюйте свою подорож мрії!</p>
              </div>

              <Link
                href={`https://t.me/lizazakharchenko?text=${encodeURIComponent(`👋 Привіт! Хочу поїхати в ${selectedDestination.name} (${selectedDestination.region}). Підберіть мені найкращий тур!`)}`}
                target="_blank"
                className="group relative w-full max-w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1 rounded-full shadow-[0_10px_40px_rgba(79,70,229,0.4)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1 block text-decoration-none"
              >
                <div className="bg-transparent rounded-full px-8 py-4 flex items-center justify-center gap-3 relative overflow-hidden">
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                  <svg className="w-8 h-8 fill-current animate-pulse" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                  <span className="font-bold text-xl tracking-wide">Написати в Telegram</span>
                </div>
              </Link>

              <p className="text-xs text-slate-400 font-medium">✨ Відповідь протягом 5 хвилин</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

