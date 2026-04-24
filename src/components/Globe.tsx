'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { useSpring } from 'react-spring'

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }))

  useEffect(() => {
    let phi = 0
    let width = 0
    let globe: any

    const updateSize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    updateSize()
    
    const resizeObserver = new ResizeObserver(() => {
      if (canvasRef.current) {
        const newWidth = canvasRef.current.offsetWidth
        if (newWidth > 0 && newWidth !== width) {
          width = newWidth
        }
      }
    })
    
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current)
    }

    if (!canvasRef.current) return

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: (width || 600) * 2,
      height: (width || 600) * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 12,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [40.4168, -3.7038], size: 0.08 }, // Spain
        { location: [37.9838, 23.7275], size: 0.08 }, // Greece
        { location: [38.9637, 35.2433], size: 0.08 }, // Turkey
        { location: [26.8206, 30.8025], size: 0.08 }, // Egypt
        { location: [23.4241, 53.8478], size: 0.08 }, // UAE
        { location: [15.87, 100.9925], size: 0.08 }, // Thailand
        { location: [3.2028, 73.2207], size: 0.08 },  // Maldives
        { location: [-8.3405, 115.092], size: 0.08 }, // Bali
      ],
      onRender: (state: any) => {
        if (!pointerInteracting.current) {
          phi += 0.005
        }
        state.phi = phi + r.get()
        state.width = (width || 600) * 2
        state.height = (width || 600) * 2
      }
    } as any)

    const onPointerDown = (e: any) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
    }

    const onPointerUp = () => {
      pointerInteracting.current = null
      if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
    }

    const onMouseMove = (e: any) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current
        pointerInteractionMovement.current = delta
        api.start({ r: delta / 200 })
      }
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('pointerdown', onPointerDown)
      window.addEventListener('pointerup', onPointerUp)
      canvas.addEventListener('pointermove', onMouseMove)
      canvas.style.opacity = '1'
    }

    return () => {
      globe.destroy()
      resizeObserver.disconnect()
      if (canvas) {
        canvas.removeEventListener('pointerdown', onPointerDown)
        window.removeEventListener('pointerup', onPointerUp)
        canvas.removeEventListener('pointermove', onMouseMove)
      }
    }
  }, [api, r])

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-slate-950 rounded-[80px] overflow-hidden group">
      {/* Dynamic ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '1/1',
          opacity: 0,
          transition: 'opacity 1s ease',
          cursor: 'grab',
        }}
      />
      
      {/* Central depth glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Decorative ring */}
      <div className="absolute inset-4 border border-white/5 rounded-[60px] pointer-events-none" />
    </div>
  )
}
