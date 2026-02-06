'use client'

import Image from 'next/image'
import { destinations } from '@/data/destinations'
import { Destination } from '@/types/destination'
import { useModal } from '@/context/ModalContext'
import { useState, useEffect } from 'react'

import DestinationCard from '@/components/DestinationCard'

export default function Destinations({
  activeFilter,
  onResetFilter,
}: {
  activeFilter?: string | null
  onResetFilter?: () => void
}) {
  const { openModal } = useModal()
  const [activeRegion, setActiveRegion] = useState<string>('All')

  // Reset region when filter changes from outside
  useEffect(() => {
    if (activeFilter) setActiveRegion('All')
  }, [activeFilter])

  const regions = [
    { id: 'All', label: 'Всі' },
    { id: 'Europe', label: 'Європа' },
    { id: 'Asia', label: 'Азія' },
    { id: 'Africa', label: 'Африка' },
    { id: 'North America', label: 'Америка' }
  ]

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = activeFilter ? dest.tags.includes(activeFilter) : true
    const matchesRegion = activeRegion === 'All' ? true : dest.region === activeRegion
    return matchesFilter && matchesRegion
  })

  return (
    <section id="destinations" className="py-24 px-[5%] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-center mb-8 text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Куди ми їдемо?
        </h2>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeRegion === region.id
                ? 'bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {region.label}
            </button>
          ))}
        </div>

        {activeFilter && (
          <div className="text-center mb-8 animate-fadeIn">
            <p className="text-slate-400 text-lg mb-2">
              Підібрано за: <span className="text-indigo-400 font-semibold">{activeFilter}</span>
            </p>
            <button
              onClick={onResetFilter}
              className="text-sm text-slate-500 hover:text-white underline transition-colors"
            >
              Скинути фільтр
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => openModal(dest)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

