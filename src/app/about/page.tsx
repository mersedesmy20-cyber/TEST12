'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutDirector from '@/components/AboutDirector'
import MobileStickyButton from '@/components/MobileStickyButton'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="pt-24">
        <AboutDirector />
      </div>
      <Footer />
      <MobileStickyButton />
    </main>
  )
}
