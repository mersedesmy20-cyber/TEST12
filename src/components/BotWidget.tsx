'use client'

import { useState, useEffect } from 'react'

export default function BotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Show widget after a delay
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate submission
        setTimeout(() => {
            setIsSubmitted(true)
        }, 500)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div
                className={`bg-slate-900 border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] rounded-2xl w-[320px] mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
            >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <span>🤖</span> Бот підбору туру
                    </h3>
                    <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                        &times;
                    </button>
                </div>

                <div className="p-6 bg-slate-900/95 backdrop-blur-xl">
                    {!isSubmitted ? (
                        <>
                            <p className="text-white mb-4 text-sm font-medium">
                                🎁 Отримайте <span className="text-yellow-400">знижку 5%</span> на перший тур!
                            </p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Telegram / WhatsApp"
                                    required
                                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                                <textarea
                                    placeholder="Куди хочете поїхати? (напр. 'море, 2 людини')"
                                    required
                                    rows={3}
                                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20"
                                >
                                    Підібрати тур
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl animate-bounce">
                                ✅
                            </div>
                            <h4 className="text-white font-bold mb-2">Дякуємо!</h4>
                            <p className="text-slate-400 text-sm">
                                Наш менеджер вже готує для вас найкращу пропозицію зі знижкою.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all hover:scale-110 pointer-events-auto"
            >
                <span className={`text-2xl transition-transform duration-300 absolute ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>💬</span>
                <span className={`text-2xl transition-transform duration-300 absolute ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>✖️</span>

                {/* Notification Badge */}
                {!isOpen && !isSubmitted && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                )}
                {!isOpen && !isSubmitted && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900" />
                )}
            </button>
        </div>
    )
}
