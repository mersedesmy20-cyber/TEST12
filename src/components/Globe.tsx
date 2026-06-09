'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export interface GlobeProps {
  markers?: { location: [number, number], size: number }[]
  focus?: [number, number] | null
  onCountryClick?: (id: string) => void
  onHoverCountry?: (id: string | null) => void
}

const COUNTRIES_METADATA = [
  { id: 'spain', name: 'Іспанія', lat: 40.4, lng: -3.7, code: 'es' },
  { id: 'greece', name: 'Греція', lat: 37.9, lng: 23.7, code: 'gr' },
  { id: 'turkey', name: 'Туреччина', lat: 39.0, lng: 33.0, code: 'tr' },
  { id: 'egypt', name: 'Єгипет', lat: 26.8, lng: 30.8, code: 'eg' },
  { id: 'uae', name: 'ОАЕ', lat: 24.0, lng: 54.0, code: 'ae' },
  { id: 'thailand', name: 'Таїланд', lat: 15.8, lng: 100.8, code: 'th' },
  { id: 'maldives', name: 'Мальдіви', lat: 3.2, lng: 73.2, code: 'mv' },
  { id: 'bali', name: 'Балі', lat: -8.4, lng: 115.1, code: 'id' },
]

export default function Globe({ focus, onCountryClick, onHoverCountry }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Interaction and animation state refs
  const isDragging = useRef(false)
  const pointerInteractions = useRef<[number, number] | null>(null)
  const currentPhi = useRef(0)
  const currentTheta = useRef(0.15)
  const focusRef = useRef(focus)

  focusRef.current = focus

  // Handle focus changes (update springs)
  useEffect(() => {
    if (focus) {
      // Match exact rotation needed to bring the target longitude (radLng + PI) to the front (positive Z)
      const targetPhi = -focus[1] * (Math.PI / 180) - Math.PI
      const targetTheta = focus[0] * (Math.PI / 180)
      
      currentPhi.current = targetPhi
      currentTheta.current = targetTheta
    }
  }, [focus])

  // Initialize Globe once on mount
  useEffect(() => {
    if (!canvasRef.current) return

    // 1. Setup Three.js Scene, Camera, and Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000)
    camera.position.z = 3.2 // Ideal zoom distance for 1.0 unit sphere

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // Transparent background to show Next.js dark styles
    })
    renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio)

    // 2. Create Globe Mesh
    const sphereRadius = 1.0
    const geometry = new THREE.SphereGeometry(sphereRadius, 64, 64)

    // Load High-Quality NASA Satellite Earth Texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      () => {},
      undefined,
      (err) => console.error('Failed loading globe texture, falling back', err)
    )

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.1
    })

    const globe = new THREE.Mesh(geometry, material)
    globe.rotation.y = 0
    scene.add(globe)

    // 3. Set Up Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75) // Bright ambient fill
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.25) // Bright sunlight source
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    let animationFrameId: number
    let targetX = 0.15
    let targetY = 0

    // 4. Main Animation Frame Loop
    const animate = () => {
      // Auto-resize viewport size
      const canvas = canvasRef.current
      if (canvas) {
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (canvas.width !== w || canvas.height !== h) {
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
        }
      }

      // Update Globe rotation matrix
      if (focusRef.current) {
        // Smoothly rotate to focus selected country coordinates
        targetX = focusRef.current[0] * (Math.PI / 180)
        targetY = -focusRef.current[1] * (Math.PI / 180) - Math.PI

        globe.rotation.x += (targetX - globe.rotation.x) * 0.08
        globe.rotation.y += (targetY - globe.rotation.y) * 0.08

        // Sync rotation history refs
        currentPhi.current = globe.rotation.y
        currentTheta.current = globe.rotation.x
      } else if (isDragging.current) {
        // Dragging mode - interpolate to drag targets
        globe.rotation.y += (currentPhi.current - globe.rotation.y) * 0.25
        globe.rotation.x += (currentTheta.current - globe.rotation.x) * 0.25
      } else {
        // Idle rotation
        currentPhi.current -= 0.0012 // Slow spin
        currentTheta.current += (0.15 - currentTheta.current) * 0.05 // default slightly tilted

        globe.rotation.y += (currentPhi.current - globe.rotation.y) * 0.08
        globe.rotation.x += (currentTheta.current - globe.rotation.x) * 0.08
      }

      // Project 3D positions of markers to 2D HTML elements
      COUNTRIES_METADATA.forEach(country => {
        const el = document.getElementById(`globe-marker-${country.id}`)
        if (!el) return

        const radLat = country.lat * (Math.PI / 180)
        const radLng = country.lng * (Math.PI / 180)

        // Spherical position conversion matching Three.js SphereGeometry exactly:
        // x = R * cos(lat) * sin(lng)
        // y = R * sin(lat)
        // z = -R * cos(lat) * cos(lng)
        const x = sphereRadius * Math.cos(radLat) * Math.sin(radLng)
        const y = sphereRadius * Math.sin(radLat)
        const z = -sphereRadius * Math.cos(radLat) * Math.cos(radLng)

        const markerLocalPos = new THREE.Vector3(x, y, z)
        const markerWorldPos = markerLocalPos.clone().applyEuler(globe.rotation)

        // Facing check (dot product of point normal and camera direction)
        const normal = markerWorldPos.clone().normalize()
        const toCamera = new THREE.Vector3().subVectors(camera.position, markerWorldPos).normalize()
        const dot = normal.dot(toCamera)

        // Display if facing camera (> 0.15 threshold prevents clipping on horizon edges)
        if (dot > 0.15) {
          const projected = markerWorldPos.clone().project(camera)
          
          // Map NDC coordinate boundaries [-1, 1] to CSS percentage [0, 100]
          const pctX = (projected.x * 0.5 + 0.5) * 100
          const pctY = (-projected.y * 0.5 + 0.5) * 100

          el.style.left = `${pctX}%`
          el.style.top = `${pctY}%`
          el.style.opacity = '1'
          el.style.pointerEvents = 'auto'
        } else {
          el.style.opacity = '0'
          el.style.pointerEvents = 'none'
        }
      })

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 5. Memory Disposal Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [])

  // Drag Pointer events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true
    pointerInteractions.current = [e.clientX, e.clientY]
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing'
    }
  }

  const handlePointerUp = () => {
    isDragging.current = false
    pointerInteractions.current = null
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab'
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging.current && pointerInteractions.current) {
      const deltaX = e.clientX - pointerInteractions.current[0]
      const deltaY = e.clientY - pointerInteractions.current[1]
      pointerInteractions.current = [e.clientX, e.clientY]

      // Grab rotation speeds
      currentPhi.current += deltaX * 0.005
      currentTheta.current += deltaY * 0.005

      // Clamp vertical camera tilt limit (prevent flipping upside down)
      const maxTilt = 60 * (Math.PI / 180)
      currentTheta.current = Math.max(-maxTilt, Math.min(maxTilt, currentTheta.current))
    }
  }

  return (
    <div style={{ width: '100%', aspectRatio: 1, maxWidth: 800, margin: '0 auto', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          cursor: 'grab',
          touchAction: 'none'
        }}
      />
      
      {/* Atmosphere Glow Overlay behind HTML tags but in front of canvas */}
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 60%, transparent 80%)',
        transform: 'scale(1.15)',
        zIndex: -1
      }} />

      {/* HTML click target flags overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {COUNTRIES_METADATA.map(c => (
          <button
            key={c.id}
            id={`globe-marker-${c.id}`}
            onClick={() => onCountryClick?.(c.id)}
            onMouseEnter={() => onHoverCountry?.(c.id)}
            onMouseLeave={() => onHoverCountry?.(null)}
            className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-300 opacity-0"
            style={{ left: 0, top: 0 }}
          >
            {/* Expanded details container on hover */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950/85 backdrop-blur-md border border-indigo-500/35 rounded-xl shadow-[0_8px_32px_rgba(99,102,241,0.25)] group-hover:scale-110 group-hover:border-white transition-all cursor-pointer">
              <img 
                src={`https://flagcdn.com/w40/${c.code}.png`} 
                alt={c.name} 
                className="w-5 h-3.5 object-cover rounded-[2px]" 
              />
              <span className="text-[10px] font-black text-slate-100 uppercase tracking-wider">
                {c.name}
              </span>
            </div>
            {/* Pulse Pin visual indicator */}
            <div className="relative w-2 h-2 mt-1">
              <div className="absolute inset-0 bg-indigo-500 rounded-full border border-white group-hover:scale-125 transition-transform shadow-[0_0_12px_#6366f1]" />
              <div className="absolute -inset-1 bg-indigo-500 rounded-full opacity-40 animate-ping pointer-events-none" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
