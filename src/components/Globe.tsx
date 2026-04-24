'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { motion } from 'motion/react'

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // Spain
        { location: [40.4168, -3.7038], size: 0.1 },
        // Greece
        { location: [37.9838, 23.7275], size: 0.1 },
        // Turkey
        { location: [38.9637, 35.2433], size: 0.1 },
        // Egypt
        { location: [26.8206, 30.8025], size: 0.1 },
        // UAE
        { location: [23.4241, 53.8478], size: 0.1 },
        // Thailand
        { location: [15.87, 100.9925], size: 0.1 },
        // Maldives
        { location: [3.2028, 73.2207], size: 0.1 },
        // Bali (Indonesia)
        { location: [-8.3405, 115.092], size: 0.1 },
      ],
      onRender: (state: any) => {
        state.phi = phi
        phi += 0.005
      },
    } as any)

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="w-full h-full max-w-[600px] max-h-[600px] aspect-square"
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', maxWidth: '100%', aspectRatio: '1' }}
        />
      </motion.div>
      
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  )
}
