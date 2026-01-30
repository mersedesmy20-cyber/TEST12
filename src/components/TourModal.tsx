'use client'

import { useEffect } from 'react'

interface Tour {
    hotelName: string
    price: string
    image: string
    destination: string
    duration: number
    source?: string
}

interface TourModalProps {
    tour: Tour | null
    isOpen: boolean
    onClose: () => void
}

export default function TourModal({ tour, isOpen, onClose }: TourModalProps) {
    // Handle specific close logic (history cleanup)
    const handleClose = () => {
        // If we have a modal state in history, go back to remove it
        // Check safely for browser environment
        if (typeof window !== 'undefined' && window.history.state?.modalOpen) {
            window.history.back()
        } else {
            onClose() // Fallback if no history state (e.g. direct load or race condition)
        }
    }

    useEffect(() => {
        if (!isOpen) return

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        }

        // Push state to history to capture "Back" button
        window.history.pushState({ modalOpen: true }, '')

        const handlePopState = () => {
            // When back button is pressed, the state is popped. 
            // We just need to close the modal logic (update parent state)
            onClose()
        }

        document.addEventListener('keydown', handleEsc)
        window.addEventListener('popstate', handlePopState)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleEsc)
            window.removeEventListener('popstate', handlePopState)
            document.body.style.overflow = 'unset'
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]) // Only re-run when open state changes

    if (!isOpen || !tour) return null

    const handleBooking = () => {
        const message = `🏖️ Хочу забронювати тур!%0A%0A🏨 Готель: ${tour.hotelName}%0A🌍 Напрямок: ${tour.destination}%0A⏱️ Тривалість: ${tour.duration} ночей%0A💰 Ціна: ${tour.price}%0A%0AПрошу зв'язатися зі мною для деталей!`
        window.open(`https://t.me/lizazakharchenko?text=${message}`, '_blank')
    }

    return (
        <div
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={handleClose}
        >
            {/* Close Button - Fixed to screen so it never scrolls away */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    // If we use handleClose here, it will go back in history.
                    // This is correct behavior if the user opened it and we pushed state.
                    handleClose()
                }}
                className="fixed top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white text-2xl transition-all hover:rotate-90 z-[3010] shadow-xl active:scale-90"
            >
                ×
            </button>

            <div
                className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_rgba(99,102,241,0.4)] animate-scaleIn relative custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Image */}
                <div className="relative h-64 md:h-80 rounded-t-3xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={tour.image}
                        alt={tour.hotelName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    {/* Source Badge */}
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {tour.source || 'Glorious Travel'}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        {tour.hotelName}
                    </h2>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="text-slate-400 text-sm mb-1">Напрямок</div>
                            <div className="text-white font-bold text-lg">{tour.destination}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="text-slate-400 text-sm mb-1">Тривалість</div>
                            <div className="text-white font-bold text-lg">{tour.duration} ночей</div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6 mb-6">
                        <div className="text-slate-300 text-sm mb-2">Ціна туру</div>
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {tour.price}
                        </div>
                        <div className="text-slate-400 text-sm mt-2">* Остаточна ціна може змінюватись</div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                        <h3 className="text-white font-bold text-lg mb-3">Що включено:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['✈️ Авіапереліт', '🏨 Проживання в готелі', '🍽️ Харчування', '🛡️ Страховка', '📋 Трансфер', '🎯 Підтримка 24/7'].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <h3 className="text-white font-bold text-2xl mb-2 relative z-10">Готові до подорожі?</h3>
                        <p className="text-indigo-100 mb-4 relative z-10">
                            Напишіть нам в Telegram і наш менеджер підбере найкращі умови саме для вас!
                        </p>
                        <button
                            onClick={handleBooking}
                            className="w-full bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-indigo-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 relative z-10"
                        >
                            <span className="text-2xl">✈️</span>
                            <span>Забронювати в Telegram</span>
                            <span className="text-2xl">💬</span>
                        </button>

                        {/* Additional contact options */}
                        <div className="mt-4 pt-4 border-t border-white/20 relative z-10">
                            <p className="text-indigo-100 text-sm mb-2">Або зателефонуйте:</p>
                            <a
                                href="tel:+380123456789"
                                className="text-white font-bold text-lg hover:text-indigo-200 transition-colors"
                            >
                                📞 +38 (012) 345-67-89
                            </a>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-6 flex items-center justify-center gap-4 text-slate-400 text-sm">
                        <div className="flex items-center gap-1">
                            <span>🔒</span>
                            <span>Безпечно</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>⚡</span>
                            <span>Швидко</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>💎</span>
                            <span>Надійно</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
