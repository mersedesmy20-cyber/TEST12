'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return

        const cursor = cursorRef.current
        const follower = followerRef.current
        if (!cursor || !follower) return

        document.body.style.cursor = 'none'
        
        let mouseX = 0
        let mouseY = 0
        let followerX = 0
        let followerY = 0
        let active = false

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (!active) {
                active = true
                cursor.style.opacity = '1'
                follower.style.opacity = '1'
            }
        }

        const render = () => {
            followerX += (mouseX - followerX) * 0.15
            followerY += (mouseY - followerY) * 0.15

            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`

            requestAnimationFrame(render)
        }

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isPointer = !!target.closest('a, button, .cursor-pointer, [role="button"], input, select, textarea')
            
            if (isPointer) {
                gsap.to(cursor, { scale: 0.5, opacity: 0.5, duration: 0.2, overwrite: true })
                gsap.to(follower, {
                    scale: 1.8,
                    backgroundColor: "rgba(129, 140, 248, 0.15)",
                    borderColor: "rgba(129, 140, 248, 0.9)",
                    borderWidth: '2px',
                    duration: 0.3,
                    overwrite: true
                })
            } else {
                gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2, overwrite: true })
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(129, 140, 248, 0.4)",
                    borderWidth: '1px',
                    duration: 0.3,
                    overwrite: true
                })
            }
        }

        const animationFrame = requestAnimationFrame(render)
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        window.addEventListener('mouseover', handleHover)

        return () => {
            cancelAnimationFrame(animationFrame)
            document.body.style.cursor = 'auto'
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', handleHover)
        }
    }, [])

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform opacity-0 shadow-[0_0_10px_white]"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-6 h-6 border border-indigo-400/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors will-change-transform opacity-0"
            />
        </div>
    )
}

