'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SearchTour from '@/components/SearchTour'
import MobileStickyButton from '@/components/MobileStickyButton'

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="pt-24">
        <SearchTour />
      </div>
      <Footer />
      <MobileStickyButton />
    </main>
  )
}
