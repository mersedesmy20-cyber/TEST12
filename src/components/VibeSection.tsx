'use client'

export default function VibeSection() {
  const filterByTag = (tag: string) => {
    // Scroll to destinations and filter
    const destinationsSection = document.getElementById('destinations')
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' })
    }
    // You can add filter logic here if needed
  }

  return (
    <section id="vibe" className="py-24 px-[5%]">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-center mb-4 text-text tracking-tight fade-in">
          Choose Your <span className="text-primary">Vibe</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <VibeCard
            type="winter"
            title="Winter Wonderland ❄️"
            description="Skiing, hot chocolate, and cozy chalets"
            image="https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=2070&auto=format&fit=crop"
            buttonText="I Want Mountains"
            onClick={() => filterByTag('Гори')}
          />
          <VibeCard
            type="summer"
            title="Eternal Summer ☀️"
            description="Sun, sea, and unlimited relaxation"
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
            buttonText="I Want Beach"
            onClick={() => filterByTag('Море')}
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
    <div className="vibe-card relative h-[500px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/30" />
      <div className="relative z-10 h-full flex flex-col justify-end p-12 text-white">
        <h3 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-xl mb-8 opacity-95">{description}</p>
        <button
          onClick={onClick}
          className="glass text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg self-start transition-all hover:bg-white/95 hover:text-text hover:-translate-y-1"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

