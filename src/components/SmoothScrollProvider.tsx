'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    // Sync Lenis scroll position with window.scrollY so
    // motion/react useScroll() gets correct values without jank
    // Lenis handles the scroll smoothness. 
    // Removed redundant CSS variable update that was causing performance lag.
    lenis.on('scroll', () => {
      // Logic for scroll-based animations could go here, 
      // but only if using specialized performance-optimized hooks.
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
