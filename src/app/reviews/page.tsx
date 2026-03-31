'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Reviews from '@/components/Reviews'
import MobileStickyButton from '@/components/MobileStickyButton'

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="pt-24">
        <Reviews />
      </div>
      <Footer />
      <MobileStickyButton />
    </main>
  )
}
