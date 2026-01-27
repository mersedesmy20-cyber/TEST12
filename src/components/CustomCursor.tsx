'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current

        let posX = 0, posY = 0
        let mouseX = 0, mouseY = 0

        if (!cursor || !follower) return

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: "power2.out"
            })

            gsap.to(follower, {
                x: mouseX,
                y: mouseY,
                duration: 0.6,
                ease: "power2.out"
            })
        }

        const onMouseEnterLink = () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 })
            gsap.to(follower, {
                scale: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                duration: 0.3
            })
        }

        const onMouseLeaveLink = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 })
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "#818cf8",
                duration: 0.3
            })
        }

        document.addEventListener('mousemove', onMouseMove)

        const links = document.querySelectorAll('a, button, .cursor-pointer')
        links.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnterLink)
            link.addEventListener('mouseleave', onMouseLeaveLink)
        })

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            links.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnterLink)
                link.removeEventListener('mouseleave', onMouseLeaveLink)
            })
        }
    }, [])

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-12 h-12 border border-indigo-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors"
            />
        </div>
    )
}
