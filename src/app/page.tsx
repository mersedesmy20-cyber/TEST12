'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Stories from '@/components/Stories'
import Hero from '@/components/Hero'
import VibeSection from '@/components/VibeSection'
import AboutDirector from '@/components/AboutDirector'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MobileStickyButton from '@/components/MobileStickyButton'
import DestinationModal from '@/components/DestinationModal'
import DiscountBanner from '@/components/DiscountBanner'
import TravelUtilities from '@/components/TravelUtilities'
import { initSmoothScroll } from '@/lib/smoothScroll'
import { initAnimations } from '@/lib/animations'
import QuizModal from '@/components/QuizModal'

// Lazy load heavy components
const DestinationsLazy = dynamic(() => import('@/components/Destinations'), {
  loading: () => <div className="h-screen bg-slate-950 flex items-center justify-center text-white">Завантаження напрямків...</div>,
  ssr: true
})

const InteractiveMapLazy = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false
})

export default function Home() {
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    initSmoothScroll()
    initAnimations()
  }, [])

  const handleFilterChange = (tag: string) => {
    setFilter(tag)
    const destinationsSection = document.getElementById('destinations')
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      <Navigation />
      <Stories />
      <Hero />
      <InteractiveMapLazy />
      <AboutDirector />
      <DestinationsLazy activeFilter={filter} onResetFilter={() => setFilter(null)} />
      <VibeSection onFilterSelect={handleFilterChange} />
      <TravelUtilities />
      <Reviews />
      <Contact />
      <Footer />
      <MobileStickyButton />
      <DestinationModal />
      <DiscountBanner />
      <QuizModal />
    </main>
  )
}
