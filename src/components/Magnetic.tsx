'use client'

import React, { useRef, ReactElement } from 'react'
import { motion, useSpring } from 'motion/react'

interface MagneticProps {
  children: ReactElement
  pull?: number
}

export default function Magnetic({ children, pull = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Smooth springs for magnetic effect
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    if (!ref.current) return
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    
    // Calculate distance from center
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Set spring target directly without triggering React re-renders
    x.set(middleX * pull)
    y.set(middleY * pull)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  // Use motion.div wrapper
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y, position: 'relative', display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  )
}
