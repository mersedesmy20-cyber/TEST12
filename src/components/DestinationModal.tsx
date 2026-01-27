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
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[2000] flex items-center justify-center p-4 opacity-0 transition-all duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={closeModal}
    >
      <div
        className="bg-slate-900/90 border border-white/10 w-full max-w-[900px] rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(99,102,241,0.2)] transform translate-y-12 transition-all duration-300 max-h-[90vh] flex flex-col"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(50px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col overflow-y-auto custom-scrollbar">
          <div
            className="w-full h-[300px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('${selectedDestination.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>

          <div className="p-10 -mt-10 relative z-10">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <h2 className="text-4xl font-extrabold text-white m-0 drop-shadow-lg">
                {selectedDestination.name}
              </h2>
              <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full font-semibold text-indigo-300">
                <span>{selectedDestination.seasonIcon}</span>
                <span>{selectedDestination.season}</span>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
              {selectedDestination.desc}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white">Чому варто відвідати:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 list-none">
              {selectedDestination.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="relative pl-7 text-slate-400 font-medium before:content-['✦'] before:text-indigo-500 before:absolute before:left-0 before:text-xl"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                  <span>📷</span> Що подивитися
                </h4>
                <ul className="space-y-2">
                  {selectedDestination.whatToSee?.map((item, index) => (
                    <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h4 className="text-xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                  <span>🛍️</span> Що купити
                </h4>
                <ul className="space-y-2">
                  {selectedDestination.whatToBuy?.map((item, index) => (
                    <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-pink-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={`https://t.me/lizazakharchenko?text=${encodeURIComponent(`Доброго дня! Мене цікавить тур до ${selectedDestination.name}. Розкажіть детальніше.`)}`}
              target="_blank"
              className="block bg-indigo-600 text-white px-12 py-5 rounded-full font-semibold text-center transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1 hover:bg-indigo-500 w-full"
            >
              Замовити розрахунок
            </Link>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/10 text-xl text-white cursor-pointer z-50 flex items-center justify-center shadow-lg hover:rotate-90 hover:bg-indigo-600 hover:border-indigo-500 transition-all"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

