'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DiscountOffer() {
    const [phone, setPhone] = useState('')
    const [messenger, setMessenger] = useState('telegram')
    const [showSuccess, setShowSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Create message for Telegram
        const message = `🎁 ЗАЯВКА НА ЗНИЖКУ\n\n📱 Телефон: ${phone}\n💬 Зручний месенджер: ${messenger === 'telegram' ? 'Telegram' : messenger === 'whatsapp' ? 'WhatsApp' : 'Viber'}`

        // Open Telegram with pre-filled message
        window.open(`https://t.me/lizazakharchenko?text=${encodeURIComponent(message)}`, '_blank')

        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
            setPhone('')
        }, 3000)
    }

    return (
        <section className="py-24 px-[5%] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/30 to-pink-950/30" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 shadow-[0_0_60px_rgba(99,102,241,0.2)]">

                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-indigo-500/30 animate-bounce">
                            🎁
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4 tracking-tight">
                        ЕКСКЛЮЗИВНА ПРОПОЗИЦІЯ
                    </h2>
                    <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
                        Знижка для клієнтів з сайту!
                    </p>
                    <p className="text-center text-slate-300 text-lg mb-12 max-w-3xl mx-auto">
                        Залиште свій номер телефону, оберіть зручний месенджер та отримайте <span className="text-indigo-400 font-bold">гарантовану знижку</span> та <span className="text-purple-400 font-bold">подарунок від компанії</span>!
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <div className="space-y-6">
                            {/* Phone Input */}
                            <div>
                                <label htmlFor="phone" className="block text-white font-semibold mb-3 text-lg">
                                    📱 Ваш номер телефону
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+380 XX XXX XX XX"
                                    required
                                    className="w-full px-6 py-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-lg"
                                />
                            </div>

                            {/* Messenger Selection */}
                            <div>
                                <label className="block text-white font-semibold mb-3 text-lg">
                                    💬 Де вам зручно зв&apos;язатись?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'from-blue-600 to-cyan-600' },
                                        { id: 'whatsapp', name: 'WhatsApp', icon: '💚', color: 'from-green-600 to-emerald-600' },
                                        { id: 'viber', name: 'Viber', icon: '💜', color: 'from-purple-600 to-violet-600' },
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setMessenger(option.id)}
                                            className={`p-6 rounded-2xl border-2 transition-all ${messenger === option.id
                                                    ? `border-white bg-gradient-to-br ${option.color} shadow-lg scale-105`
                                                    : 'border-white/10 bg-slate-800/30 hover:border-white/30'
                                                }`}
                                        >
                                            <div className="text-3xl mb-2">{option.icon}</div>
                                            <div className={`font-bold text-lg ${messenger === option.id ? 'text-white' : 'text-slate-400'}`}>
                                                {option.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-6 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                            >
                                <span>ОТРИМАТИ ЗНИЖКУ</span>
                                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="mt-8 p-6 bg-green-500/20 border border-green-500/50 rounded-2xl text-center animate-[fade-in_0.3s_ease-out]">
                            <div className="text-4xl mb-2">✅</div>
                            <p className="text-green-300 font-bold text-lg">
                                Дякуємо! Ваша заявка відправлена. Очікуйте на наше повідомлення!
                            </p>
                        </div>
                    )}

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
                        {[
                            { icon: '🎯', title: 'Гарантована знижка', desc: 'До 10% на будь-який тур' },
                            { icon: '🎁', title: 'Подарунок', desc: 'Спеціальний бонус від компанії' },
                            { icon: '⚡', title: 'Швидка відповідь', desc: 'Зв\'яжемося протягом години' },
                        ].map((benefit, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl mb-3">{benefit.icon}</div>
                                <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                                <p className="text-slate-400 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
