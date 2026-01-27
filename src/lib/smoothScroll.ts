'use client'

export function initSmoothScroll() {
  if (typeof window === 'undefined') return

  // Dynamic import for Lenis and GSAP
  Promise.all([
    import('@studio-freight/lenis'),
    import('gsap'),
    import('gsap/ScrollTrigger')
  ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical' as const,
      gestureOrientation: 'vertical' as const,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sync Lenis and ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP's ticker for animation frames
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable lag smoothing for instant response
    gsap.ticker.lagSmoothing(0)
  })
}

