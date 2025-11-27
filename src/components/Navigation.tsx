'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] glass transition-all duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-[5%] py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-xl font-extrabold text-text hover:scale-105 transition-transform">
            <span className="text-2xl">✈️</span>
            <span>GLORIOUS<span className="text-primary">TRAVEL</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#destinations" className="text-sm font-medium text-text hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
              Напрямки
            </Link>
            <Link href="#vibe" className="text-sm font-medium text-text hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
              Вайб
            </Link>
            <Link href="#contact" className="text-sm font-medium text-text hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
              Контакти
            </Link>
            <Link
              href="https://t.me/lizazakharchenko"
              target="_blank"
              className="bg-accent text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Telegram
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-text rounded transition-all ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text rounded transition-all ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-text rounded transition-all ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-[70px] left-0 right-0 bg-bg-secondary glass border-b border-glass-border transform transition-all duration-300 z-[999] md:hidden ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 visible'
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="px-[5%] py-8 flex flex-col gap-6">
          <Link
            href="#destinations"
            className="text-lg font-semibold text-text hover:text-primary transition-colors pb-3 border-b border-black/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Напрямки
          </Link>
          <Link
            href="#vibe"
            className="text-lg font-semibold text-text hover:text-primary transition-colors pb-3 border-b border-black/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Вайб
          </Link>
          <Link
            href="#contact"
            className="text-lg font-semibold text-text hover:text-primary transition-colors pb-3 border-b border-black/5"
            onClick={() => setMobileMenuOpen(false)}
          >
            Контакти
          </Link>
          <Link
            href="https://t.me/lizazakharchenko"
            target="_blank"
            className="bg-accent text-white px-4 py-3 rounded-xl text-center font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Telegram
          </Link>
        </div>
      </div>
    </>
  )
}

