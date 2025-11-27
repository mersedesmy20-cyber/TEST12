'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/60" />

      <div className="relative z-10 max-w-[900px] px-[5%]">
        <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white mb-6 leading-tight tracking-tight drop-shadow-lg fade-in-up">
          Your Next Journey Begins Here
        </h1>
        <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-white/90 mb-12 font-normal leading-relaxed fade-in-up">
          We help you find the perfect trip that matches your budget and travel style.
        </p>
        <div className="flex gap-6 justify-center flex-wrap fade-in-up">
          <Link
            href="#destinations"
            className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Find a Tour
          </Link>
          <Link
            href="https://t.me/lizazakharchenko"
            target="_blank"
            className="glass text-white px-10 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/90 hover:text-text hover:-translate-y-1 transition-all"
          >
            Contact via Telegram
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-white/50 rounded animate-bounce" />
        </div>
      </div>
    </section>
  )
}

