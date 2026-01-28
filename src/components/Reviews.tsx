'use client'

import React from 'react'
import Image from 'next/image'

const reviews = [
    {
        id: 1,
        name: 'Олена Петренко',
        role: 'Туристка (Єгипет)',
        text: 'Неймовірно вдячна за організацію нашого відпочинку! Ліза підібрала ідеальний готель, врахувавши всі наші побажання. Це був найкращий відпочинок за останні роки!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Андрій Ковальчук',
        role: 'Лижний тур (Андорра)',
        text: 'Професійний підхід та увага до деталей. Від перельоту до трансферу - все було чітко. Окреме дякую за рекомендації щодо трас та спорядження.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Марина та Ігор',
        role: 'Весільна подорож (Мальдіви)',
        text: 'Це була казка! Дякуємо Glorious Travel за наш медовий місяць. Все було на найвищому рівні. Обов\'язково звернемося ще!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=200&auto=format&fit=crop'
    }
]

export default function Reviews() {
    return (
        <section id="reviews" className="py-32 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute -left-40 top-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
            <div className="absolute -right-40 bottom-40 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]" />

            <div className="max-w-[1400px] mx-auto px-[5%] relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        ЩО КАЖУТЬ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">НАШІ ТУРИСТИ</span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Справжні історії про незабутні подорожі з Glorious Travel.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors">
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{review.name}</h3>
                                    <p className="text-indigo-300 text-sm">{review.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4 text-yellow-400 text-sm">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            <p className="text-slate-300 italic leading-relaxed">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2 opacity-50 text-sm text-slate-500">
                                <span>Перевірений відгук</span>
                                <span className="text-green-500">✓</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
