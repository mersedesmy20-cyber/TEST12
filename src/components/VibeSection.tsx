'use client'

export default function VibeSection({
  onFilterSelect,
}: {
  onFilterSelect?: (tag: string) => void
}) {
  const handleFilter = (tag: string) => {
    if (onFilterSelect) {
      onFilterSelect(tag)
    }
  }

  return (
    <section id="vibe" className="py-24 px-[5%] relative">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-center mb-4 text-white tracking-tight fade-in drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Обери свій <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Вайб</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <VibeCard
            type="winter"
            title="Зимова казка ❄️"
            description="Лижі, глінтвейн та затишні шале"
            image="https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=2070&auto=format&fit=crop"
            buttonText="Хочу в гори"
            onClick={() => handleFilter('Гори')}
          />
          <VibeCard
            type="summer"
            title="Вічне літо ☀️"
            description="Сонце, море та безлімітний релакс"
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
            buttonText="Хочу на море"
            onClick={() => handleFilter('Море')}
          />
        </div>
      </div>
    </section>
  )
}

function VibeCard({
  type,
  title,
  description,
  image,
  buttonText,
  onClick,
}: {
  type: 'winter' | 'summer'
  title: string
  description: string
  image: string
  buttonText: string
  onClick: () => void
}) {
  return (
    <div className="vibe-card group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:-translate-y-2">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90" />

      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

      <div className="relative z-10 h-full flex flex-col justify-end p-12 text-white">
        <h3 className="text-4xl font-extrabold mb-4 drop-shadow-lg group-hover:text-glow transition-all">
          {title}
        </h3>
        <p className="text-xl mb-8 opacity-90 text-slate-200 font-light">{description}</p>
        <button
          onClick={onClick}
          className="glass text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-lg self-start transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

