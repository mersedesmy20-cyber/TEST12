'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SearchTour from '@/components/SearchTour'
import Destinations from '@/components/Destinations'
import Reviews from '@/components/Reviews'
import AboutDirector from '@/components/AboutDirector'
import VibeSection from '@/components/VibeSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MobileStickyButton from '@/components/MobileStickyButton'
import DestinationModal from '@/components/DestinationModal'
import DiscountBanner from '@/components/DiscountBanner'
import { initSmoothScroll } from '@/lib/smoothScroll'
import { initAnimations } from '@/lib/animations'

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
      <Destinations activeFilter={filter} onResetFilter={() => setFilter(null)} />
      <VibeSection onFilterSelect={handleFilterChange} />
      <Reviews />
      <AboutDirector />
      <Contact />
      <Footer />
      <MobileStickyButton />
      <DestinationModal />
      <DiscountBanner />
    </main>
  )
}

