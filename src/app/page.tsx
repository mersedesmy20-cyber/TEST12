'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Stories from '@/components/Stories'
import SearchTour from '@/components/SearchTour'
import AboutDirector from '@/components/AboutDirector'
import VibeSection from '@/components/VibeSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MobileStickyButton from '@/components/MobileStickyButton'
import DestinationModal from '@/components/DestinationModal'
import DiscountBanner from '@/components/DiscountBanner'
import { initSmoothScroll } from '@/lib/smoothScroll'
import { initAnimations } from '@/lib/animations'
import QuizModal from '@/components/QuizModal'

// Lazy load heavy components
const Destinations = dynamic(() => import('@/components/Destinations'), {
  loading: () => <div className="h-screen bg-slate-950 flex items-center justify-center text-white">Завантаження напрямків...</div>,
  ssr: true
})

const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <div className="h-[500px] bg-slate-950" />,
  ssr: true
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
      <Hero />
      <SearchTour />
      <Stories />
      <Destinations activeFilter={filter} onResetFilter={() => setFilter(null)} />
      <VibeSection onFilterSelect={handleFilterChange} />
      <Reviews />
      <AboutDirector />
      <Contact />
      <Footer />
      <MobileStickyButton />
      <DestinationModal />
      <DiscountBanner />
      <QuizModal />
    </main>
  )
}

