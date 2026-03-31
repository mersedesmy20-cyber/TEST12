'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Stories from '@/components/Stories'
import MobileStickyButton from '@/components/MobileStickyButton'

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="pt-24">
        <Stories />
      </div>
      <Footer />
      <MobileStickyButton />
    </main>
  )
}
