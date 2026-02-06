'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import DestinationModal from '@/components/DestinationModal'
import DestinationCard from '@/components/DestinationCard'
import { destinations } from '@/data/destinations'
import { useModal } from '@/context/ModalContext'
import { initSmoothScroll } from '@/lib/smoothScroll'

const months = [
    {
        id: 1,
        name: 'Січень',
        icon: '❄️',
        description: 'Новий рік продовжується! Час для гарячих пляжів та зимових казок.',
        recommendations: 'Єгипет та ОАЕ — прекрасна погода для пляжного відпочинку без спеки. Тайланд починає високий сезон. Для романтики — засніжені Альпи!'
    },
    {
        id: 2,
        name: 'Лютий',
        icon: '🌨️',
        description: 'Останній шанс встигнути на гарячі зимові тури!',
        recommendations: 'Тайланд, В\'єтнам — райські пляжі без дощів. ОАЕ та Єгипет — тепло, але не пекуче. День закоханих у Парижі або Венеції!'
    },
    {
        id: 3,
        name: 'Березень',
        icon: '🌱',
        description: 'Весна починається — час цвітіння та нових подорожей.',
        recommendations: 'Японія — сезон сакури! Іспанія та Італія — комфортна погода для екскурсій. Єгипет — все ще чудово для пляжу.'
    },
    {
        id: 4,
        name: 'Квітень',
        icon: '🌷',
        description: 'Квітнева весна — ідеальний час для Європи!',
        recommendations: 'Голландія (тюльпани!), Греція та Кіпр відкривають сезон. Туреччина починає приймати туристів. Мальдіви — манго та екзотика!'
    },
    {
        id: 5,
        name: 'Травень',
        icon: '☀️',
        description: 'Відкриття курортного сезону — море вже чекає!',
        recommendations: 'Туреччина, Греція, Кіпр — офіційний старт! Іспанія та Італія — тепло без спеки. Грузія — зелені гори та вино. Ранні тури зі знижками!'
    },
    {
        id: 6,
        name: 'Червень',
        icon: '🏖️',
        description: 'Літо в розпалі — кращий час для сімейного відпочинку!',
        recommendations: 'Туреччина та Греція — ідеально для дітей (вода вже тепла). Чорногорія та Хорватія. Кіпр — англійська мова та історія. Ісландія — білі ночі!'
    },
    {
        id: 7,
        name: 'Липень',
        icon: '🍦',
        description: 'Пік літнього сезону — найтепліше та найяскравіше!',
        recommendations: 'Весь Середземноморський регіон. Туреччина All Inclusive — спека, але море тепле. Скандинавія — комфортна прохолода. Норвегія — фіорди та північне сонце.'
    },
    {
        id: 8,
        name: 'Серпень',
        icon: '🍉',
        description: 'Останній літній місяць — встигніть на море!',
        recommendations: 'Туреччина, Греція, Болгарія — ще тепло і вже знижки! Чорногорія. Грузія — сезон винограду. Бархатний сезон в ОАЕ ще не почався.'
    },
    {
        id: 9,
        name: 'Вересень',
        icon: '🍇',
        description: 'Золота осінь — бархатний сезон без натовпу!',
        recommendations: 'Туреччина, Греція, Кіпр — тепло, море комфортне, менше людей. Єгипет відкриває сезон. Італія — Тоскана і збір винограду. ОАЕ стає комфортнішим.'
    },
    {
        id: 10,
        name: 'Жовтень',
        icon: '🍂',
        description: 'Осінній чил — тепло без спеки та економні ціни.',
        recommendations: 'Єгипет та ОАЕ — чудова погода! Туреччина — ще можна купатися. Ізраїль, Йорданія. Грузія — золота осінь в горах. Таїланд стартує!'
    },
    {
        id: 11,
        name: 'Листопад',
        icon: '🌧️',
        description: 'Час втечі від осінньої хандри на теплий пляж!',
        recommendations: 'Єгипет, ОАЕ, Тайланд — ідеальна погода. Мальдіви входять в сезон. В\'єтнам повертається. Дубай — міський шопінг та пляжі.'
    },
    {
        id: 12,
        name: 'Грудень',
        icon: '🎄',
        description: 'Новорічна магія — святкуйте під пальмами або на ялинках!',
        recommendations: 'Єгипет, ОАЕ, Тайланд — Новий Рік в літі! Мальдіви для романтики. Європа — різдвяні ярмарки (Прага, Відень). Лапландія — Санта-Клаус!'
    },
]

export default function CalendarPage() {
    const { openModal } = useModal()
    // Default to current month, handle server-side hydration match by defaulting to 1 initially or using useEffect
    // Using 1 initially to match server snapshot if we want strict hydration, but client update is fine.
    // Better: start with a fixed value (1) and update in useEffect to match real date to avoid hydration error
    const [selectedMonth, setSelectedMonth] = useState<number>(1)

    useEffect(() => {
        initSmoothScroll()
        setSelectedMonth(new Date().getMonth() + 1)
    }, [])

    const filteredDestinations = destinations.filter(d => d.bestMonths?.includes(selectedMonth))

    return (
        <main className="bg-slate-950 min-h-screen">
            <Navigation />

            {/* Hero Header */}
            <div className="relative pt-32 pb-16 px-4 mb-8 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg animate-fadeInUp">
                        Календар Подорожей 2026
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-fadeInUp delay-100">
                        Дізнайтеся, куди найкраще поїхати відпочивати саме зараз. Ми підібрали ідеальні напрямки для кожного місяця року.
                    </p>
                </div>
            </div>

            {/* Month Selector */}
            <div className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-lg border-y border-white/5 py-4 mb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {months.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setSelectedMonth(m.id)}
                                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 ${selectedMonth === m.id
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105 ring-2 ring-white/20'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className="text-lg md:text-xl">{m.icon}</span>
                                <span className="font-bold text-sm md:text-base">{m.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1400px] mx-auto px-[5%] pb-24">

                {/* Month Description Card */}
                <div className="mb-12 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-slate-900/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl animate-fadeIn">
                    <div className="flex items-start gap-6">
                        <div className="text-7xl">{months.find(m => m.id === selectedMonth)?.icon}</div>
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {months.find(m => m.id === selectedMonth)?.description}
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                {months.find(m => m.id === selectedMonth)?.recommendations}
                            </p>
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-indigo-200">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {filteredDestinations.length} рекомендованих напрямків
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-12 animate-fadeIn">
                    <h3 className="text-2xl text-white font-bold mb-2">
                        Доступні тури на <span className="text-indigo-400">{months.find(m => m.id === selectedMonth)?.name}</span>
                    </h3>
                    <p className="text-slate-400">
                        Оберіть напрямок, щоб дізнатися більше деталей
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDestinations.map(dest => (
                        <DestinationCard
                            key={dest.id}
                            destination={dest}
                            onClick={() => openModal(dest)}
                        />
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-slate-500">
                            Оберіть інший місяць для пошуку турів.
                        </p>
                    </div>
                )}
            </div>

            <DestinationModal />
            <Footer />

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </main>
    )
}
