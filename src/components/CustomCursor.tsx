
'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only run on desktop/devices with hover capability
        if (window.matchMedia('(pointer: coarse)').matches) return

        const cursor = cursorRef.current
        const follower = followerRef.current

        if (!cursor || !follower) return

        // Hide default cursor
        document.body.style.cursor = 'none'
        const elements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
        elements.forEach(el => {
            (el as HTMLElement).style.cursor = 'none'
        })

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
            // Smooth follower movement
            followerX += (mouseX - followerX) * 0.1
            followerY += (mouseY - followerY) * 0.1

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
            // Check if element or parent is interactive
            const link = target.closest('a, button, .cursor-pointer, [role="button"], input, select, textarea')

            if (link) {
                (link as HTMLElement).style.cursor = 'none' // Ensure cursor is hidden on interactive elements

                gsap.to(cursor, { scale: 0, duration: 0.2 })
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    mixBlendMode: "difference",
                    duration: 0.3
                })
            }
        }

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a, button, .cursor-pointer, [role="button"], input, select, textarea')

            if (link) {
                gsap.to(cursor, { scale: 1, duration: 0.2 })
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "#818cf8",
                    mixBlendMode: "normal",
                    duration: 0.3
                })
            }
        }

        requestAnimationFrame(render)
        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)
        document.addEventListener('mouseout', onMouseOut)

        return () => {
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
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform opacity-0"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border border-indigo-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors will-change-transform opacity-0"
            />
        </div>
    )
}

