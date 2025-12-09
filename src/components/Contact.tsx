'use client'

import Link from 'next/link'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-[5%] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-indigo-950/20 -z-10" />

      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-center mb-4 text-white tracking-tight fade-in drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Готові до подорожі?
        </h2>
        <p className="text-center text-slate-400 text-xl mb-12 fade-in font-light">
          Напишіть нам, і ми організуємо вашу ідеальну відпустку.
        </p>

        <div className="flex justify-center gap-8 mt-12 flex-wrap mb-16">
          <ContactCard
            icon="✈️"
            title="Telegram"
            description="@lizazakharchenko"
            href="https://t.me/lizazakharchenko"
            gradient="from-blue-500 to-cyan-500"
          />
          <ContactCard
            icon="📞"
            title="Телефон"
            description="+380 93 936 2967"
            href="tel:+380939362967"
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Map Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Завітайте до нас</h3>
              <p className="text-slate-400 mb-2">Ми знаходимось за адресою:</p>
              <p className="text-xl text-white font-semibold mb-6">Київ, вул. Михайла Драгоманова, 2</p>
              <div className="inline-flex items-center gap-2 text-indigo-400">
                <span className="text-2xl">📍</span>
                <span>Glorious Travel Agency</span>
              </div>
            </div>
            <div className="w-full md:w-2/3 h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/5">
              <iframe
                src="https://maps.google.com/maps?q=Mykhaila+Drahomanova+St,+2,+Kyiv,+02000&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({
  icon,
  title,
  description,
  href,
  gradient,
}: {
  icon: string
  title: string
  description: string
  href: string
  gradient: string
}) {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      className="contact-card group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-white no-underline w-[320px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] text-center overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="relative z-10">
        <div className="text-6xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 inline-block">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-glow transition-all">{title}</h3>
        <p className="text-slate-400 group-hover:text-slate-200 transition-colors">{description}</p>
      </div>
    </Link>
  )
}

