'use client'

import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import VibeSection from '@/components/VibeSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import MobileStickyButton from '@/components/MobileStickyButton'
import DestinationModal from '@/components/DestinationModal'
import { initSmoothScroll } from '@/lib/smoothScroll'
import { initAnimations } from '@/lib/animations'

export default function Home() {
  useEffect(() => {
    initSmoothScroll()
    initAnimations()
  }, [])

  return (
    <main>
      <Navigation />
      <Hero />
      <Destinations />
      <VibeSection />
      <Contact />
      <Footer />
      <MobileStickyButton />
      <DestinationModal />
    </main>
  )
}

