'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import Reviews from '@/components/Reviews'
import VibeSection from '@/components/VibeSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MobileStickyButton from '@/components/MobileStickyButton'
import DestinationModal from '@/components/DestinationModal'
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
      <Destinations activeFilter={filter} onResetFilter={() => setFilter(null)} />
      <VibeSection onFilterSelect={handleFilterChange} />
      <Reviews />
      <Contact />
      <Footer />
      <MobileStickyButton />
      <DestinationModal />
    </main>
  )
}

