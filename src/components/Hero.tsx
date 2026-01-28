'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple entrance animation without ScrollTrigger
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
      {/* Dynamic Background with CSS Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[150px] animate-pulse delay-1000" />

      <div ref={textRef} className="relative z-10 max-w-[1200px] px-[5%] flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-indigo-200 text-sm font-medium tracking-widest uppercase">Premium Travel Agency</span>
        </div>

        <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-black text-white mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
          ВІДКРИВАЙ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 animate-gradient-x bg-[length:200%_auto]">
            НЕЙМОВІРНЕ
          </span>
        </h1>

        <p className="text-[clamp(1.2rem,2vw,1.5rem)] text-slate-200 mb-14 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-lg text-pretty">
          Подорожі, що змінюють життя. Ексклюзивні тури, персональний підхід та враження, які залишаться з вами назавжди.
        </p>

        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            href="#destinations"
            className="group relative px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
          >
            <span className="relative z-10 group-hover:text-indigo-900 transition-colors">Обрати подорож</span>
          </Link>

          <Link
            href="https://t.me/lizazakharchenko"
            target="_blank"
            className="group px-10 py-5 rounded-full font-bold text-lg border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Зв&apos;язатися
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce pointer-events-none">
        <div className="w-8 h-12 rounded-full border-2 border-white/60 flex justify-center p-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-black/20 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-scroll-down shadow-[0_0_10px_white]" />
        </div>
      </div>
    </section>
  )
}

