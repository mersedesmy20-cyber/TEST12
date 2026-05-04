'use client'

import { useState } from 'react'
import { useModal } from '@/context/ModalContext'

export default function DiscountBanner() {
    const { openQuiz } = useModal()
    const [isVisible, setIsVisible] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        destination: ''
    })

    if (!isVisible) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const message = `🎁 Запит на знижку 5%!%0A%0A👤 Ім'я: ${formData.name}%0A📱 Телефон: ${formData.phone}%0A🌍 Напрямок: ${formData.destination || 'Будь-який'}%0A%0AПрошу підібрати тур зі знижкою!`

        window.open(`https://t.me/lizazakharchenko?text=${message}`, '_blank')
        setIsFormOpen(false)
        setIsVisible(false)
    }

    return (
        <>
            {/* Floating Banner */}
            {!isFormOpen && (
                <div className="fixed top-24 right-6 z-[80] animate-slideInRight">
                    <div className="relative bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-[0_0_40px_rgba(251,146,60,0.4)] overflow-hidden max-w-sm">
                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-sm transition-all z-10"
                        >
                            ×
                        </button>

                        {/* Animated background */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10 mix-blend-overlay" />

                        <div className="relative p-6">
                            {/* Icon */}
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 animate-bounce">
                                <span className="text-3xl">🎁</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-bold text-xl mb-2">
                                Отримай знижку 5%!
                            </h3>

                            {/* Description */}
                            <p className="text-white/90 text-sm mb-4">
                                Відправ запит на підбір туру і отримай гарантовану знижку або подарунок! 🌴
                            </p>

                            {/* CTA Button */}
                            <button
                                onClick={openQuiz}
                                className="w-full bg-white text-orange-600 font-bold py-3 px-6 rounded-xl hover:bg-orange-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            >
                                Отримати знижку →
                            </button>

                            {/* Trust badge */}
                            <div className="mt-3 flex items-center justify-center gap-2 text-white/80 text-xs">
                                <span>⚡</span>
                                <span>Відповідь за 5 хвилин</span>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl" />
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setIsFormOpen(false)}
                >
                    <div
                        className="bg-slate-900 border border-orange-500/30 rounded-3xl max-w-md w-full shadow-[0_0_80px_rgba(251,146,60,0.4)] animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all hover:rotate-90"
                        >
                            ×
                        </button>

                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 rounded-t-3xl text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-4xl">🎁</span>
                            </div>
                            <h2 className="text-white font-bold text-2xl mb-2">
                                Отримай знижку 5%!
                            </h2>
                            <p className="text-white/90 text-sm">
                                Заповни форму і наш менеджер підбере найкращий тур зі знижкою
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="text-slate-300 text-sm font-medium mb-2 block">
                                    Ваше ім&apos;я *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="Введіть ваше ім'я"
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 text-sm font-medium mb-2 block">
                                    Номер телефону *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="+380 XX XXX XX XX"
                                />
                            </div>

                            <div>
                                <label className="text-slate-300 text-sm font-medium mb-2 block">
                                    Куди хочете поїхати?
                                </label>
                                <input
                                    type="text"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                                    placeholder="Наприклад: Туреччина, Єгипет..."
                                />
                            </div>

                            {/* Benefits */}
                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                                <p className="text-orange-300 text-sm font-medium mb-2">Що ви отримаєте:</p>
                                <ul className="space-y-1 text-slate-300 text-sm">
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span>Знижка 5% на будь-який тур</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span>Безкоштовна консультація</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span>Персональний підбір туру</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20"
                            >
                                Отримати знижку 5% 🎁
                            </button>

                            <p className="text-slate-400 text-xs text-center">
                                Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
