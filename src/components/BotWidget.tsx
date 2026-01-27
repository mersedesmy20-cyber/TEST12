'use client'

import { useState, useEffect } from 'react'

export default function BotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Form states
    const [messenger, setMessenger] = useState<'telegram' | 'viber'>('telegram')
    const [contact, setContact] = useState('')
    const [name, setName] = useState('')
    const [preference, setPreference] = useState<'sea' | 'winter'>('sea')

    // Show widget after a delay
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const message = `👋 Нова заявка з сайту!%0A%0A👤 Ім'я: ${name}%0A📱 Контакт: ${contact} (${messenger})%0A🏖️ Тип відпочинку: ${preference === 'sea' ? 'Море/Пляж' : 'Зимовий/Лижі'}%0A%0AПрошу зв'язатися зі мною!`

        // Open Telegram with pre-filled message
        window.open(`https://t.me/lizazakharchenko?text=${message}`, '_blank')

        setIsSubmitted(true)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div
                className={`bg-slate-900 border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] rounded-2xl w-[340px] mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
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
                            <p className="text-white mb-6 text-sm font-medium">
                                Дайте відповідь на 3 питання і ми підберемо ідеальний тур! 🎁
                            </p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                {/* 1. Messenger Selection */}
                                <div>
                                    <label className="text-xs text-slate-400 mb-2 block uppercase font-bold tracking-wider">Де вам зручно спілкуватись?</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setMessenger('telegram')}
                                            className={`py-2 rounded-lg text-sm font-medium transition-all border ${messenger === 'telegram' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
                                        >
                                            Telegram ✈️
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMessenger('viber')}
                                            className={`py-2 rounded-lg text-sm font-medium transition-all border ${messenger === 'viber' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
                                        >
                                            Viber 💜
                                        </button>
                                    </div>
                                </div>

                                {/* 2. Contact Details */}
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Ваше ім'я"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Номер телефону"
                                        required
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                {/* 3. Vacation Type */}
                                <div>
                                    <label className="text-xs text-slate-400 mb-2 block uppercase font-bold tracking-wider">Тип відпочинку</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPreference('sea')}
                                            className={`py-3 rounded-lg text-sm font-medium transition-all border flex flex-col items-center gap-1 ${preference === 'sea' ? 'bg-orange-500/20 border-orange-500 text-orange-300' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
                                        >
                                            <span>🏖️</span>
                                            Море
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPreference('winter')}
                                            className={`py-3 rounded-lg text-sm font-medium transition-all border flex flex-col items-center gap-1 ${preference === 'winter' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
                                        >
                                            <span>🏔️</span>
                                            Зима/Лижі
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95"
                                >
                                    Отримати пропозицію ➝
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl animate-bounce">
                                ✅
                            </div>
                            <h4 className="text-white font-bold mb-2 text-lg">Заявку надіслано!</h4>
                            <p className="text-slate-400 text-sm mb-4">
                                Ми відкрили діалог у Telegram з вашими даними. Менеджер вже бачить запит.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-indigo-400 text-sm hover:underline"
                            >
                                Відправити ще одну
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-16 h-16 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all hover:scale-110 pointer-events-auto"
            >
                <span className={`text-3xl transition-transform duration-300 absolute ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>💬</span>
                <span className={`text-2xl transition-transform duration-300 absolute ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>✖️</span>

                {/* Notification Badge */}
                {!isOpen && !isSubmitted && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full animate-ping" />
                )}
                {!isOpen && !isSubmitted && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">1</span>
                )}
            </button>
        </div>
    )
}
