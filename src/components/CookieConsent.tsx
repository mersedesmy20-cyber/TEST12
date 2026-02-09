'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookieConsent')
        if (!consent) {
            // Show banner after 1 second delay
            setTimeout(() => setShow(true), 1000)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted')
        setShow(false)

        // Initialize analytics if consent is given
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted'
            })
        }
    }

    const declineCookies = () => {
        localStorage.setItem('cookieConsent', 'declined')
        setShow(false)

        // Disable analytics if declined
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage: 'denied'
            })
        }
    }

    if (!show) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-fadeIn">
            <div className="max-w-7xl mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-2">🍪 Ми використовуємо cookies</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Ми використовуємо файли cookie для покращення вашого досвіду, аналізу трафіку та персоналізації реклами.
                            Продовжуючи користуватися сайтом, ви погоджуєтеся з нашою{' '}
                            <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline">
                                Політикою конфіденційності
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="flex gap-3 shrink-0">
                        <button
                            onClick={declineCookies}
                            className="px-6 py-2.5 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors font-medium"
                        >
                            Відхилити
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg font-medium"
                        >
                            Прийняти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
