
import { destinations } from '@/data/destinations'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function generateStaticParams() {
    return destinations.map((dest) => ({
        slug: dest.id,
    }))
}

export default function CountryPage({ params }: { params: { slug: string } }) {
    const country = destinations.find((d) => d.id === params.slug)

    if (!country) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Back Button */}
            <div className="fixed top-24 left-8 z-50">
                <Link
                    href="/countries"
                    className="group flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full text-white font-bold hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Назад до країн</span>
                </Link>
            </div>

            {/* Immersive Hero */}
            <div className="relative h-[85vh] w-full overflow-hidden">
                <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    priority
                    className="object-cover scale-105 animate-[slow-pan_20s_infinite_alternate]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-slate-950" />
                <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-slate-950 to-transparent" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-32 px-[5%]">
                    <div className="max-w-[1400px] mx-auto w-full">
                        <div className="flex items-center gap-6 mb-6 opacity-0 animate-[fade-in-up_1s_ease-out_forwards]">
                            <span className="text-8xl filter drop-shadow-2xl">{country.flag}</span>
                            <div className="flex flex-col">
                                <span className="text-indigo-400 font-mono text-sm tracking tracking-[0.3em] uppercase mb-2">Destination Protocol</span>
                                <h1 className="text-[clamp(4rem,8vw,7rem)] font-black text-white leading-none tracking-tighter drop-shadow-lg">
                                    {country.name.toUpperCase()}
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-12 items-start opacity-0 animate-[fade-in-up_1s_ease-out_0.3s_forwards]">
                            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light leading-relaxed border-l-2 border-indigo-500 pl-6">
                                {country.desc}
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href={`/?search=${country.name}#search`}
                                    className="group px-8 py-4 bg-white text-slate-950 font-bold rounded-full transition-all hover:bg-indigo-500 hover:text-white hover:scale-105 flex items-center gap-2"
                                >
                                    <span>Знайти Тур</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-[5%] pb-32 relative z-10 -mt-20">

                {/* HUD Grid Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                    {[
                        { label: 'Сезон', value: country.season, icon: country.seasonIcon },
                        { label: 'Бюджет', value: country.price, icon: '💳' },
                        { label: 'Вайб', value: country.tags[0], icon: country.icon },
                        { label: 'Час', value: 'GMT +X', icon: '🕒' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:bg-slate-900/60 transition-colors group">
                            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-3 flex justify-between">
                                {stat.label}
                                <span className="opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity">●</span>
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                <span className="text-2xl opacity-80">{stat.icon}</span>
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sidebar Navigation (Sticky) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-2">
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 block pl-4">Навігація</span>
                            {['Хайлайти', 'Що подивитись', 'Що купити'].map((item, i) => (
                                <a key={item} href={`#section-${i}`} className="block px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold border-l-2 border-transparent hover:border-indigo-500">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Feed */}
                    <div className="lg:col-span-9 space-y-32">

                        {/* Highlights Section */}
                        <section id="section-0">
                            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                                <span className="text-indigo-500 text-2xl font-mono">01.</span>
                                HIGHLIGHTS
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {country.highlights.map((item, idx) => (
                                    <div key={idx} className="group p-8 rounded-3xl bg-slate-900/30 border border-dash border-white/10 hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl font-black text-slate-500">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">{item}</h3>
                                        <div className="w-10 h-1 bg-indigo-500/50 rounded group-hover:w-20 transition-all duration-500 relative z-10" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* What to See Section - Masonry-ish */}
                        <section id="section-1">
                            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                                <span className="text-indigo-500 text-2xl font-mono">02.</span>
                                MUST SEE
                            </h2>
                            <div className="space-y-4">
                                {country.whatToSee.map((item, idx) => (
                                    <div key={idx} className="flex group items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-900/50 to-transparent border-b border-white/5 hover:border-indigo-500/50 transition-all">
                                        <div className="flex items-center gap-6">
                                            <span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-mono text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </span>
                                            <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">{item}</span>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Shopping/Souvenirs */}
                        <section id="section-2">
                            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                                <span className="text-indigo-500 text-2xl font-mono">03.</span>
                                SHOPPING
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {country.whatToBuy.map((item, idx) => (
                                    <div key={idx} className="px-6 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-slate-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all cursor-default text-lg">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Final CTA */}
                        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(68,51,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_10s_linear_infinite] pointer-events-none" />

                            <h3 className="text-4xl font-black text-white mb-6 relative z-10">Готові до подорожі в {country.name}?</h3>
                            <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto relative z-10">
                                Ми беремо на себе всі клопоти. Вам залишається тільки насолоджуватися моментом.
                            </p>

                            <Link
                                href="/#contact"
                                className="inline-block px-10 py-5 bg-white text-indigo-900 font-black text-lg rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all relative z-10"
                            >
                                Зв&apos;язатися з менеджером
                            </Link>
                        </section>
                    </div>

                </div>
            </div>
        </main>
    )
}
