'use client'

import { useState, useEffect } from 'react'
import { useModal } from '@/context/ModalContext'
import * as gtag from '@/lib/gtag'

// Icons for options
const ICONS = {
    beach: '🏖️',
    mountains: '🏔️',
    city: '🏙️',
    exotic: '🌴',
    solo: '🚶',
    couple: '💑',
    family: '👨‍👩‍👧‍👦',
    friends: '👯',
}

export default function QuizModal() {
    const { isQuizOpen, closeQuiz } = useModal()
    const [step, setStep] = useState(1)
    const [answers, setAnswers] = useState({
        type: '',
        company: '',
        budget: '',
        contact: { name: '', phone: '' }
    })

    // Track when quiz opens
    useEffect(() => {
        if (isQuizOpen) {
            gtag.trackQuizStart()
        }
    }, [isQuizOpen])

    if (!isQuizOpen) return null

    const handleOptionSelect = (key: string, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }))
        setStep(prev => prev + 1)
    }

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Format message
        const message = `📋 РЕЗУЛЬТАТИ ТЕСТУ%0A%0A✈️ Тип відпочинку: ${answers.type}%0A👥 Компанія: ${answers.company}%0A💰 Бюджет: ${answers.budget}%0A%0A👤 Ім'я: ${answers.contact.name}%0A📱 Телефон: ${answers.contact.phone}`

        // Track conversion
        gtag.trackQuizComplete(answers.type)

        window.open(`https://t.me/lizazakharchenko?text=${message}`, '_blank')
        closeQuiz()
        // Reset after closing (optional, usually good UX to keep for a moment if they reopen, but here we close)
        setTimeout(() => setStep(1), 500)
    }

    const totalSteps = 4
    const progress = (step / totalSteps) * 100

    return (
        <div
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
                if (e.target === e.currentTarget) closeQuiz()
            }}
        >
            <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden relative animate-scaleIn">

                {/* Close Button */}
                <button
                    onClick={closeQuiz}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="p-8 md:p-10 min-h-[400px] flex flex-col justify-center">

                    {/* Step 1: Vacation Type */}
                    {step === 1 && (
                        <div className="animate-slideInRight">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Який відпочинок ви шукаєте?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <Option
                                    icon={ICONS.beach}
                                    label="Пляжний релакс"
                                    onClick={() => handleOptionSelect('type', 'Пляж')}
                                />
                                <Option
                                    icon={ICONS.city}
                                    label="Міські прогулянки"
                                    onClick={() => handleOptionSelect('type', 'Місто')}
                                />
                                <Option
                                    icon={ICONS.mountains}
                                    label="Гори та природа"
                                    onClick={() => handleOptionSelect('type', 'Гори')}
                                />
                                <Option
                                    icon={ICONS.exotic}
                                    label="Екзотика"
                                    onClick={() => handleOptionSelect('type', 'Екзотика')}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Company */}
                    {step === 2 && (
                        <div className="animate-slideInRight">
                            {/* Back button */}
                            <button onClick={() => setStep(1)} className="text-slate-500 hover:text-white text-sm mb-4 flex items-center gap-1">← Назад</button>

                            <h2 className="text-2xl font-bold text-white mb-6 text-center">З ким плануєте подорож?</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <Option
                                    icon={ICONS.solo}
                                    label="Сам / Сама"
                                    onClick={() => handleOptionSelect('company', 'Соло')}
                                />
                                <Option
                                    icon={ICONS.couple}
                                    label="З парою"
                                    onClick={() => handleOptionSelect('company', 'Пара')}
                                />
                                <Option
                                    icon={ICONS.family}
                                    label="З сім'єю"
                                    onClick={() => handleOptionSelect('company', 'Сім\'я')}
                                />
                                <Option
                                    icon={ICONS.friends}
                                    label="З друзями"
                                    onClick={() => handleOptionSelect('company', 'Друзі')}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Budget */}
                    {step === 3 && (
                        <div className="animate-slideInRight">
                            <button onClick={() => setStep(2)} className="text-slate-500 hover:text-white text-sm mb-4 flex items-center gap-1">← Назад</button>

                            <h2 className="text-2xl font-bold text-white mb-6 text-center">Орієнтовний бюджет на людину?</h2>
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 space-y-3">
                                {['До $500', '$500 - $1000', '$1000 - $2000', 'Необмежений'].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleOptionSelect('budget', opt)}
                                        className="w-full text-left px-5 py-3 rounded-xl bg-slate-700/50 hover:bg-indigo-600 hover:text-white text-slate-200 transition-all font-medium"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Contact */}
                    {step === 4 && (
                        <div className="animate-slideInRight">
                            <button onClick={() => setStep(3)} className="text-slate-500 hover:text-white text-sm mb-4 flex items-center gap-1">← Назад</button>

                            <div className="text-center mb-6">
                                <div className="text-4xl mb-2">🎉</div>
                                <h2 className="text-2xl font-bold text-white">Майже готово!</h2>
                                <p className="text-slate-400 text-sm">Куди нам надіслати підбірку турів?</p>
                            </div>

                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ваше ім'я"
                                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
                                        value={answers.contact.name}
                                        onChange={e => setAnswers(prev => ({ ...prev, contact: { ...prev.contact, name: e.target.value } }))}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Телефон / Telegram"
                                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
                                        value={answers.contact.phone}
                                        onChange={e => setAnswers(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all"
                                >
                                    Отримати підбірку ➔
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function Option({ icon, label, onClick }: { icon: string, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-800/50 border border-white/5 rounded-2xl hover:bg-slate-700/80 hover:border-indigo-500/50 hover:scale-[1.02] transition-all group"
        >
            <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">{icon}</span>
            <span className="font-semibold text-slate-200 group-hover:text-white">{label}</span>
        </button>
    )
}
