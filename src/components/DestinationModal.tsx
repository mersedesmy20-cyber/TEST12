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
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 opacity-0 transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }}
      onClick={closeModal}
    >
      <div
        className="bg-bg-secondary w-full max-w-[900px] rounded-3xl overflow-hidden relative shadow-2xl transform translate-y-12 transition-transform duration-300 max-h-[90vh] flex flex-col"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(50px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-bg-secondary border-none text-xl text-text cursor-pointer z-10 flex items-center justify-center shadow-md hover:rotate-90 hover:bg-accent hover:text-white transition-all"
        >
          &times;
        </button>

        <div className="flex flex-col overflow-y-auto">
          <div
            className="w-full h-[300px] bg-cover bg-center"
            style={{ backgroundImage: `url('${selectedDestination.image}')` }}
          />

          <div className="p-10">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <h2 className="text-4xl font-extrabold text-text m-0">
                {selectedDestination.name}
              </h2>
              <div className="inline-flex items-center gap-2 bg-bg px-3 py-2 rounded-full font-semibold text-text">
                <span>{selectedDestination.seasonIcon}</span>
                <span>{selectedDestination.season}</span>
              </div>
            </div>

            <p className="text-text-light text-lg leading-relaxed mb-8">
              {selectedDestination.desc}
            </p>

            <h3 className="text-2xl font-bold mb-4 text-text">Why Visit:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 list-none">
              {selectedDestination.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="relative pl-7 text-text-light font-medium before:content-['✦'] before:text-accent before:absolute before:left-0 before:text-xl"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            <Link
              href="https://t.me/lizazakharchenko"
              target="_blank"
              className="block bg-primary text-white px-12 py-5 rounded-full font-semibold text-center transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full"
            >
              Order a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

