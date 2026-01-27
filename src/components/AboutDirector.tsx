'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutDirector() {
    return (
        <section id="about" className="py-24 px-[5%] relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />

            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

                    {/* Photo */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative group">
                            {/* Decorative elements */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity" />

                            {/* Image container */}
                            <div className="relative w-[350px] h-[450px] rounded-3xl overflow-hidden border-4 border-white/10 group-hover:border-white/20 transition-all shadow-2xl">
                                <Image
                                    src="/director-photo.png"
                                    alt="Єлизавета Захарченко - Директор Glorious Travel"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>

                            {/* Instagram badge */}
                            <Link
                                href="https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw"
                                target="_blank"
                                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-110 transition-transform shadow-lg hover:shadow-pink-500/50"
                            >
                                <span className="text-2xl">📸</span>
                                <span>@lizazakharchenko</span>
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-semibold mb-6">
                            ✨ Ваш провідник у світ подорожей
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Єлизавета <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Захарченко</span>
                        </h2>

                        <p className="text-xl text-indigo-300 font-semibold mb-6">
                            Директор та засновник Glorious Travel
                        </p>

                        <div className="space-y-4 text-slate-300 text-lg leading-relaxed mb-8">
                            <p>
                                Привіт! 👋 Мене звати Ліза, і я створила це агентство, щоб допомагати людям втілювати їхні мрії про подорожі.
                            </p>
                            <p>
                                Вже понад 5 років я організовую незабутні відпустки для сотень українців. Кожна подорож – це не просто бронювання квитків, а турбота про кожну деталь вашого ідеального відпочинку.
                            </p>
                            <p className="text-white font-medium">
                                💫 Моє завдання – зробити ваш відпочинок максимально комфортним та безтурботним!
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-indigo-500/50 transition-colors">
                                <div className="text-3xl font-black text-indigo-400 mb-1">500+</div>
                                <div className="text-sm text-slate-400">Щасливих туристів</div>
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-indigo-500/50 transition-colors">
                                <div className="text-3xl font-black text-purple-400 mb-1">30+</div>
                                <div className="text-sm text-slate-400">Країн світу</div>
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-indigo-500/50 transition-colors">
                                <div className="text-3xl font-black text-pink-400 mb-1">5</div>
                                <div className="text-sm text-slate-400">Років досвіду</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="https://t.me/lizazakharchenko"
                                target="_blank"
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
                            >
                                <span>✈️</span>
                                <span>Написати в Telegram</span>
                            </Link>
                            <Link
                                href="https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw"
                                target="_blank"
                                className="px-8 py-4 bg-slate-900/50 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <span>📸</span>
                                <span>Перейти в Instagram</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
