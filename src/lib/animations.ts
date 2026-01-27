'use client'

export function initAnimations() {
  if (typeof window === 'undefined') return

  // Dynamic import for GSAP
  import('gsap').then(({ default: gsap }) => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)

      // Hero animations
      gsap.to('.fade-in-up', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
      })

      // Section title animations
      gsap.utils.toArray('.fade-in').forEach((el: any) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        })
      })

      // Destination cards animation - DISABLED to prevent invisible cards
      // gsap.utils.toArray('.destination-card').forEach((card: any, i: number) => {
      //   gsap.from(card, {
      //     scrollTrigger: {
      //       trigger: card,
      //       start: 'top 90%',
      //       toggleActions: 'play none none none',
      //     },
      //     y: 50,
      //     opacity: 0,
      //     duration: 0.6,
      //     delay: i * 0.1,
      //     ease: 'power3.out',
      //   })
      // })


      // Vibe cards animation
      gsap.utils.toArray('.vibe-card').forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power3.out',
        })
      })

      // Contact cards animation
      gsap.utils.toArray('.contact-card').forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
        })
      })
    })
  })
}

