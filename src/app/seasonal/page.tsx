'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function SeasonalPage() {
    return (
        <main className="bg-slate-950 min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2000&auto=format&fit=crop')" }} // Snowy mountains or winter vibe
                    />
                    <div className="absolute inset-0 bg-slate-950/60" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        СЕЗОННІ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">НАПРЯМКИ</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Найкращі місця для відпочинку у будь-яку пору року.
                    </p>
                </div>
            </section>

            {/* Seasonal Content - Winter */}
            <section className="py-24 px-[5%] max-w-[1400px] mx-auto">
                <div className="flex items-center gap-4 mb-16">
                    <span className="text-5xl">❄️</span>
                    <div>
                        <h2 className="text-4xl font-bold text-white">Зима</h2>
                        <p className="text-slate-400 text-lg">Грудень – Лютий</p>
                    </div>
                </div>

                <div className="grid gap-16">

                    {/* Beach Holidays */}
                    <div>
                        <h3 className="text-2xl font-bold text-indigo-300 mb-8 border-l-4 border-indigo-500 pl-4">
                            Пляжний відпочинок
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <SeasonCard
                                title="Єгипет"
                                places="Шарм-ель-Шейх, Хургада"
                                desc='Лідер напрямку. Прямі автобуси до аеропортів Молдови/Польщі, доступні ціни, "All Inclusive".'
                                image="https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=1000&auto=format&fit=crop"
                                tag="Топ вибір"
                            />
                            <SeasonCard
                                title="ОАЕ"
                                places="Дубай, Шарджа"
                                desc="Шопінг та екскурсії (вода може бути прохолодною). Ідеально для тих, хто любить міський ритм."
                                image="https://images.unsplash.com/photo-1512453979798-5ea904acfb5a?q=80&w=1000&auto=format&fit=crop"
                            />
                            <SeasonCard
                                title="Екзотика"
                                places="Таїланд, Занзібар, Домінікана"
                                desc="Для готових до тривалих перельотів (з Варшави/Бухареста). Повне перезавантаження."
                                image="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=1000&auto=format&fit=crop"
                            />
                        </div>
                    </div>

                    {/* Ski Holidays */}
                    <div>
                        <h3 className="text-2xl font-bold text-cyan-300 mb-8 border-l-4 border-cyan-500 pl-4">
                            Гірськолижний відпочинок
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <SeasonCard
                                title="Україна"
                                places="Буковель, Драгобрат"
                                desc="Буковель — європейський сервіс. Драгобрат — для фанатів фрірайду та висоти."
                                image="https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=1000&auto=format&fit=crop"
                            />
                            <SeasonCard
                                title="Польща"
                                places="Закопане"
                                desc="Близько та атмосферно. Гуральська кухня та термальні басейни."
                                image="https://images.unsplash.com/photo-1517329782449-810521a4b6f4?q=80&w=1000&auto=format&fit=crop"
                            />
                            <SeasonCard
                                title="Європа"
                                places="Словаччина, Австрія"
                                desc="Для досвідчених лижників. Ідеальні траси Ясни та Альп."
                                image="https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=1000&auto=format&fit=crop"
                            />
                        </div>
                    </div>

                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white transition-all"
                    >
                        Повернутися на головну
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function SeasonCard({ title, places, desc, image, tag }: { title: string, places: string, desc: string, image: string, tag?: string }) {
    return (
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="h-48 relative overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {tag && (
                    <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {tag}
                    </span>
                )}
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{title}</h4>
                <p className="text-indigo-300 text-sm font-medium mb-4">{places}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
