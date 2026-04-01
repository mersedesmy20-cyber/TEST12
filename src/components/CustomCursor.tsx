'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only run on desktop/devices with hover capability
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return

        const cursor = cursorRef.current
        const follower = followerRef.current

        if (!cursor || !follower) return

        // Hide default cursor
        document.body.style.cursor = 'none'
        
        let mouseX = 0
        let mouseY = 0
        let followerX = 0
        let followerY = 0

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            if (!isVisible) {
                setIsVisible(true)
                gsap.set([cursor, follower], { opacity: 1, scale: 1 })
            }
        }

        const render = () => {
            // Faster follower movement (0.2 instead of 0.1)
            followerX += (mouseX - followerX) * 0.2
            followerY += (mouseY - followerY) * 0.2

            gsap.set(cursor, {
                x: mouseX,
                y: mouseY
            })

            gsap.set(follower, {
                x: followerX,
                y: followerY
            })

            requestAnimationFrame(render)
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a, button, .cursor-pointer, [role="button"], input, select, textarea')

            if (link) {
                gsap.to(cursor, { scale: 0.5, opacity: 0.5, duration: 0.2 })
                gsap.to(follower, {
                    scale: 1.5,
                    backgroundColor: "rgba(129, 140, 248, 0.1)", // Light indigo
                    borderColor: "rgba(129, 140, 248, 0.8)",
                    borderWidth: '2px',
                    duration: 0.3
                })
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a, button, .cursor-pointer, [role="button"], input, select, textarea')

            if (link) {
                gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 })
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(129, 140, 248, 0.4)",
                    borderWidth: '1px',
                    duration: 0.3
                })
            }
        }

        const animationFrame = requestAnimationFrame(render)
        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)
        document.addEventListener('mouseout', onMouseOut)

        return () => {
            cancelAnimationFrame(animationFrame)
            document.body.style.cursor = 'auto'
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', onMouseOver)
            document.removeEventListener('mouseout', onMouseOut)
        }
    }, [isVisible])

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

