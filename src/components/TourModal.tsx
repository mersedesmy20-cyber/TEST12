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
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen || !tour) return null

    const handleBooking = () => {
        const message = `🏖️ Хочу забронювати тур!%0A%0A🏨 Готель: ${tour.hotelName}%0A🌍 Напрямок: ${tour.destination}%0A⏱️ Тривалість: ${tour.duration} ночей%0A💰 Ціна: ${tour.price}%0A%0AПрошу зв'язатися зі мною для деталей!`
        window.open(`https://t.me/lizazakharchenko?text=${message}`, '_blank')
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_rgba(99,102,241,0.4)] animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all hover:rotate-90 z-10"
                >
                    ×
                </button>

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
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {tour.source || 'Glorious Travel'}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
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
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-center">
                        <h3 className="text-white font-bold text-2xl mb-2">Готові до подорожі?</h3>
                        <p className="text-indigo-100 mb-4">
                            Напишіть нам в Telegram і наш менеджер підбере найкращі умови саме для вас!
                        </p>
                        <button
                            onClick={handleBooking}
                            className="w-full bg-white text-indigo-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-indigo-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
                        >
                            <span className="text-2xl">✈️</span>
                            <span>Забронювати в Telegram</span>
                            <span className="text-2xl">💬</span>
                        </button>

                        {/* Additional contact options */}
                        <div className="mt-4 pt-4 border-t border-white/20">
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
