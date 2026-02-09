
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const bgImages = [
  // Beach / Resort (More "Vacation" vibe)
  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop', // Maldives style
  // European City
  'https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2574&auto=format&fit=crop', // Paris
  // Adventure / Mountains
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2574&auto=format&fit=crop', // Mountains
  // Luxury Pool
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop'
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [currentBg, setCurrentBg] = useState(0)

  // Background rotater
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % bgImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple entrance animation
      gsap.from(textRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden text-center bg-slate-950">

      {/* Dynamic Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {bgImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBg ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
            style={{
              backgroundImage: `url('${img}')`,
              transition: 'opacity 1.5s ease-in-out, transform 8s linear'
            }}
          />
        ))}
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[150px] animate-pulse delay-1000" />

      {/* Main Content */}
      <div ref={textRef} className="relative z-10 max-w-[1200px] px-[5%] flex flex-col items-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-sm font-bold tracking-widest uppercase text-shadow-sm">Твій персональний турагент</span>
        </div>

        {/* Updated Headline - More concrete */}
        <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-black text-white mb-6 leading-[1.0] tracking-tight drop-shadow-[0_0_25px_rgba(0,0,0,0.5)]">
          ПОДОРОЖІ, ЯКІ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 animate-gradient-x">
            ЗАПАМ'ЯТОВУЮТЬСЯ
          </span>
        </h1>

        {/* Updated Subtext - Clearer value proposition */}
        <p className="text-[clamp(1.1rem,1.5vw,1.4rem)] text-slate-100 mb-12 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
          Ми не просто продаємо тури, ми створюємо ідеальний відпочинок.
          <br className="hidden md:block" />
          Гарячі пропозиції, преміум готелі та повний супровід 24/7.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full md:w-auto">
          <Link
            href="#search"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_search_click', {
                  event_category: 'navigation',
                  event_label: 'find_tour'
                })
              }
            }}
            className="group relative px-10 py-5 bg-white text-slate-950 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2"
          >
            <span className="relative z-10 group-hover:text-indigo-900 transition-colors">Знайти тур</span>
            <svg className="w-5 h-5 relative z-10 group-hover:text-indigo-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link
            href="https://t.me/lizazakharchenko"
            target="_blank"
            onClick={() => {
              import('@/lib/gtag').then(gtag => gtag.trackTelegramClick())
            }}
            className="group px-10 py-5 rounded-2xl font-bold text-lg border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Написати менеджеру</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 md:bottom-20 left-1/2 -translate-x-1/2 z-30 animate-bounce pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <p className="text-white/60 text-xs uppercase tracking-widest mb-2 text-center">Гортайте вниз</p>
        <div className="w-6 h-10 mx-auto rounded-full border-2 border-white/50 flex justify-center p-1 bg-black/20 backdrop-blur-sm">
          <div className="w-1 h-1.5 rounded-full bg-white animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}

