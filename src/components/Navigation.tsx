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
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b border-transparent ${scrolled ? 'glass border-white/5 shadow-lg shadow-indigo-500/10' : 'bg-transparent'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-[5%] py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl font-black text-white">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight leading-none group-hover:text-indigo-300 transition-colors">GLORIOUS</span>
              <span className="text-xs font-bold text-slate-400 tracking-[0.2em] leading-none group-hover:text-white transition-colors">TRAVEL</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Destinations', 'Vibe', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {item === 'Destinations' ? 'Напрямки' : item === 'Vibe' ? 'Вайб' : 'Контакти'}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
              </Link>
            ))}

            <Link
              href="https://t.me/lizazakharchenko"
              target="_blank"
              className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-6 py-2.5 rounded-full font-semibold shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:bg-indigo-600 hover:text-white hover:-translate-y-0.5 transition-all"
            >
              Telegram
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-white rounded transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded transition-all ${mobileMenuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-[70px] left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 transform transition-all duration-300 z-[999] md:hidden ${mobileMenuOpen
          ? 'translate-y-0 opacity-100 visible'
          : '-translate-y-full opacity-0 invisible'
          }`}
      >
        <div className="px-[5%] py-8 flex flex-col gap-6">
          {['Destinations', 'Vibe', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-semibold text-slate-200 hover:text-indigo-400 transition-colors pb-3 border-b border-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item === 'Destinations' ? 'Напрямки' : item === 'Vibe' ? 'Вайб' : 'Контакти'}
            </Link>
          ))}
          <Link
            href="https://t.me/lizazakharchenko"
            target="_blank"
            className="bg-indigo-600 text-white px-4 py-3 rounded-xl text-center font-semibold shadow-lg shadow-indigo-500/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            Telegram
          </Link>
        </div>
      </div>
    </>
  )
}

