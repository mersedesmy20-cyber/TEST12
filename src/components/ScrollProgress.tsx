'use client'

import { motion, useScroll, useSpring } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[1100] bg-white/5 pointer-events-none">
      <motion.div 
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}
