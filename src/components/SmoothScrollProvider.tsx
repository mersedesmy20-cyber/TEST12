'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Sync Lenis and ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP's ticker for animation frames
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updatePhysics)
    gsap.ticker.lagSmoothing(0)

    // Expose lenis globally for components to trigger programmatic scrolls
    ;(window as any).lenis = lenis

    return () => {
      gsap.ticker.remove(updatePhysics)
      lenis.destroy()
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}
