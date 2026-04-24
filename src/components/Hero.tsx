
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'

const bgImages = [
  // Beach / Resort (More "Vacation" vibe)
  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop', // Maldives style
  // European City
  'https://images.unsplash.com/photo-1502602898657-3e917247a183?q=80&w=2574&auto=format&fit=crop', // Paris
  // Adventure / Mountains
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2574&auto=format&fit=crop', // Mountains
  // Luxury Pool
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop'
]

export default function Hero() {
  const [currentBg, setCurrentBg] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [time, setTime] = useState('')
  const [isReturning, setIsReturning] = useState(false)

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const opacityText = useTransform(scrollY, [0, 400], [1, 0])

  // Background rotater
  useEffect(() => {
    setIsMounted(true)
    
    if (localStorage.getItem('visited')) {
      setIsReturning(true)
    } else {
      localStorage.setItem('visited', 'true')
    }

    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % bgImages.length)
    }, 5000)

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }))
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(timer)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1 } 
    },
  }

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden text-center bg-slate-950">

      {/* Dynamic Background Slider */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 overflow-hidden">
        {bgImages.map((img, index) => {
          if (index !== 0 && !isMounted) return null

          return (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={img}
                alt="Glorious Travel Background"
                fill
                priority={index === 0}
                className="object-cover scale-110"
                sizes="100vw"
                quality={85}
              />
            </div>
          )
        })}
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Top Info Bar (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{ opacity: opacityText }}
        className="absolute top-28 left-[5%] right-[5%] z-20 flex justify-between items-center hidden xl:flex pointer-events-none"
      >
        <div className="flex gap-8">
          <div className="flex flex-col items-start translate-y-1">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Київ, Україна</span>
            <span className="text-white text-lg font-black">{time}</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10" />
          <div className="flex flex-col items-start translate-y-1">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Температура (Середня)</span>
            <span className="text-white text-lg font-black">+24°C</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">Пошук турів активний</span>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-[150px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[150px]" 
      />

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1200px] px-[5%] flex flex-col items-center"
      >
        <motion.div
           variants={itemVariants}
           className="mb-6 flex gap-3"
        >
          <div className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-[10px] text-white/50 font-bold uppercase tracking-wider">
            Beach
          </div>
          <div className="px-3 py-1 bg-indigo-500/20 backdrop-blur-md border border-indigo-500/20 rounded-lg text-[10px] text-indigo-300 font-bold uppercase tracking-wider">
            City
          </div>
          <div className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-[10px] text-white/50 font-bold uppercase tracking-wider">
            Mountains
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-sm font-bold tracking-widest uppercase text-shadow-sm">Твій персональний турагент</span>
        </motion.div>

        {/* Updated Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-[clamp(2.5rem,8vw,6.5rem)] font-black text-white mb-6 leading-[1.0] tracking-tight drop-shadow-[0_0_25px_rgba(0,0,0,0.5)]"
        >
          ПОДОРОЖІ, ЯКІ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 animate-gradient-x">
            ЗАЗАМ'ЯТОВУЮТЬСЯ
          </span>
        </motion.h1>

        {/* Updated Subtext */}
        <motion.p 
          variants={itemVariants}
          className="text-[clamp(1.1rem,1.5vw,1.4rem)] text-slate-100 mb-12 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-lg bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5"
        >
          Ми не просто продаємо тури, ми створюємо ідеальний відпочинок.
          <br className="hidden md:block" />
          Гарячі пропозиції, преміум готелі та повний супровід 24/7.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center w-full md:w-auto"
        >
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
            <span className="relative z-10 group-hover:text-indigo-900 transition-colors">
              {isReturning ? 'Продовжити пошук' : 'Знайти тур'}
            </span>
            <svg className="w-5 h-5 relative z-10 group-hover:text-indigo-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link
            href="https://t.me/lizazakharchenko"
            target="_blank"
            onClick={() => {
              import('@/lib/gtag').then(gtag => {
                gtag.trackTelegramClick()
                gtag.trackGoogleAdsConversion()
              })
            }}
            className="group px-10 py-5 rounded-2xl font-bold text-lg border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Написати менеджеру</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

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

