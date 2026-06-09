'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation, PanInfo } from 'motion/react'
import { useModal } from '@/context/ModalContext'
import * as gtag from '@/lib/gtag'

const SWIPE_CARDS = [
    { id: 'beach', title: 'Пляжний релакс', icon: '🏖️', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
    { id: 'city', title: 'Міські прогулянки', icon: '🏙️', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80' },
    { id: 'mountains', title: 'Гори та природа', icon: '🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' },
    { id: 'exotic', title: 'Екзотика', icon: '🌴', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' }
]

export default function QuizModal() {
    const { isQuizOpen, closeQuiz } = useModal()
    const [step, setStep] = useState(1)
    const [cards, setCards] = useState(SWIPE_CARDS)
    const [likedTypes, setLikedTypes] = useState<string[]>([])
    
    const [answers, setAnswers] = useState({
        company: '',
        budget: '',
        contact: { name: '', phone: '' }
    })

    const controls = useAnimation()

    useEffect(() => {
        if (isQuizOpen) {
            gtag.trackQuizStart()
            // Reset state
            setStep(1)
            setCards([...SWIPE_CARDS])
            setLikedTypes([])
            setAnswers({ company: '', budget: '', contact: { name: '', phone: '' } })
        }
    }, [isQuizOpen])



    const handleDragEnd = async (event: any, info: PanInfo, cardId: string, title: string) => {
        const threshold = 100 // pixels
        if (info.offset.x > threshold) {
            // Swiped Right (Liked)
            setLikedTypes(prev => [...prev, title])
            setCards(prev => prev.filter(c => c.id !== cardId))
        } else if (info.offset.x < -threshold) {
            // Swiped Left (Disliked)
            setCards(prev => prev.filter(c => c.id !== cardId))
        } else {
            // Return to center
            controls.start({ x: 0, y: 0, rotate: 0 })
        }
    }

    // Move to next step if no cards left
    useEffect(() => {
        if (step === 1 && cards.length === 0) {
            setTimeout(() => setStep(2), 300)
        }
    }, [cards, step])

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const typesStr = likedTypes.length > 0 ? likedTypes.join(', ') : 'Будь-який'
        const message = `📋 РЕЗУЛЬТАТИ ТЕСТУ%0A%0A✈️ Тип: ${typesStr}%0A👥 Компанія: ${answers.company}%0A💰 Бюджет: ${answers.budget}%0A%0A👤 Ім'я: ${answers.contact.name}%0A📱 Телефон: ${answers.contact.phone}`

        gtag.trackQuizComplete(typesStr)
        gtag.trackGoogleAdsConversion()
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead')
        }

        window.open(`https://t.me/lizazakharchenko?text=${message}`, '_blank')
        closeQuiz()
    }

    const progress = (step / 4) * 100

    if (!isQuizOpen) return null

    return (
        <div
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
                if (e.target === e.currentTarget) closeQuiz()
            }}
        >
            <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden relative flex flex-col h-[600px] animate-scaleIn">
                {/* Close Button */}
                <button onClick={closeQuiz} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-50 bg-slate-900/50 rounded-full p-1 backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 shrink-0">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center relative">
                    
                    {/* Step 1: Tinder Swipes */}
                    {step === 1 && (
                        <div className="h-full flex flex-col">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-black text-white mb-2">Що вам подобається?</h2>
                                <p className="text-sm text-slate-400">Свайпніть вправо 💚 (Так) або вліво ❌ (Ні)</p>
                            </div>
                            
                            <div className="relative flex-1 flex items-center justify-center">
                                {cards.map((card, index) => {
                                    const isTop = index === cards.length - 1
                                    return (
                                        <motion.div
                                            key={card.id}
                                            drag={isTop ? "x" : false}
                                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                            dragSnapToOrigin={true}
                                            onDragEnd={(e, info) => isTop && handleDragEnd(e, info, card.id, card.title)}
                                            style={{ zIndex: index }}
                                            className="absolute w-full aspect-[3/4] bg-slate-800 rounded-3xl shadow-2xl border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing flex flex-col"
                                            initial={{ scale: 0.95, opacity: 0 }}
                                            animate={{ scale: isTop ? 1 : 0.95 + (index * 0.01), opacity: 1, y: isTop ? 0 : (cards.length - 1 - index) * 10 }}
                                            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <div className="relative flex-1 bg-slate-900">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80" draggable={false} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />
                                            </div>
                                            <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none text-center">
                                                <span className="text-5xl filter drop-shadow-lg block mb-2">{card.icon}</span>
                                                <h3 className="text-2xl font-bold text-white drop-shadow-md">{card.title}</h3>
                                            </div>
                                            
                                            {/* Like / Dislike Indicators */}
                                            {isTop && (
                                                <div className="absolute inset-x-0 top-1/2 flex justify-between px-4 pointer-events-none opacity-0 transition-opacity">
                                                    <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 font-bold rotate-[-15deg]">НІ</div>
                                                    <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-500 font-bold rotate-[15deg]">ТАК</div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                                
                                {cards.length === 0 && (
                                    <div className="text-center animate-fadeIn text-slate-400 flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin mb-4" />
                                        <p>Аналізуємо вподобання...</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Manual Buttons */}
                            {cards.length > 0 && (
                                <div className="flex justify-center gap-6 mt-6 shrink-0">
                                    <button onClick={() => handleDragEnd(null, { offset: { x: -200 } } as any, cards[cards.length - 1].id, cards[cards.length - 1].title)} className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-2xl transition-transform hover:scale-110 shadow-lg">
                                        ❌
                                    </button>
                                    <button onClick={() => handleDragEnd(null, { offset: { x: 200 } } as any, cards[cards.length - 1].id, cards[cards.length - 1].title)} className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 flex items-center justify-center text-2xl transition-transform hover:scale-110 shadow-lg shadow-indigo-500/30 border border-white/20">
                                        💚
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Company */}
                    {step === 2 && (
                        <div className="animate-slideInRight h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">З ким плануєте подорож?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {['Соло 🚶', 'З парою 💑', 'Сім\'я 👨‍👩‍👧‍👦', 'Друзі 👯'].map(opt => (
                                    <button key={opt} onClick={() => { setAnswers(p => ({...p, company: opt})); setStep(3) }} className="flex flex-col items-center gap-3 p-6 bg-slate-800/50 border border-white/5 rounded-2xl hover:bg-slate-700/80 hover:border-indigo-500/50 hover:scale-[1.02] transition-all">
                                        <span className="text-3xl">{opt.split(' ')[1]}</span>
                                        <span className="font-semibold text-slate-200">{opt.split(' ')[0]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Budget */}
                    {step === 3 && (
                        <div className="animate-slideInRight h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Бюджет на людину?</h2>
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 space-y-3">
                                {['До $500', '$500 - $1000', '$1000 - $2000', 'Необмежений'].map((opt) => (
                                    <button key={opt} onClick={() => { setAnswers(p => ({...p, budget: opt})); setStep(4) }} className="w-full text-left px-5 py-4 rounded-xl bg-slate-700/50 hover:bg-indigo-600 hover:text-white text-slate-200 transition-all font-medium border border-transparent hover:border-white/20">
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Contact */}
                    {step === 4 && (
                        <div className="animate-slideInRight h-full flex flex-col justify-center">
                            <div className="text-center mb-8">
                                <div className="text-5xl mb-4">🎉</div>
                                <h2 className="text-2xl font-black text-white">Ідеальний тур знайдено!</h2>
                                <p className="text-slate-400 mt-2">Залиште контакти, щоб отримати персональну підбірку</p>
                            </div>

                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <input type="text" required placeholder="Ваше ім'я" className="w-full bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500" value={answers.contact.name} onChange={e => setAnswers(p => ({ ...p, contact: { ...p.contact, name: e.target.value } }))} />
                                <input type="tel" required placeholder="Телефон / Telegram" className="w-full bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500" value={answers.contact.phone} onChange={e => setAnswers(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))} />
                                
                                <button type="submit" className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all tracking-wide border border-white/20">
                                    Отримати підбірку →
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
