'use client'

import Link from 'next/link'

export default function MobileStickyButton() {
  return (
    <Link
      href="https://t.me/lizazakharchenko"
      target="_blank"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-2xl z-[999] md:hidden flex items-center gap-2 transition-all hover:shadow-glow hover:-translate-y-1"
    >
      <span>Підібрати тур</span>
    </Link>
  )
}

