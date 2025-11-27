'use client'

import { destinations } from '@/data/destinations'
import { Destination } from '@/types/destination'
import { useModal } from '@/context/ModalContext'

export default function Destinations() {
  const { openModal } = useModal()

  const filteredDestinations = destinations

  return (
    <section id="destinations" className="py-24 px-[5%]">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-center mb-4 text-text tracking-tight fade-in">
          Where Are We Going?
        </h2>
        <p className="text-center text-text-light text-xl mb-16 fade-in">
          Discover amazing destinations around the world
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onClick={() => openModal(dest)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DestinationCard({
  destination,
  onClick,
}: {
  destination: Destination
  onClick: () => void
}) {
  return (
    <div
      className={`destination-card bg-bg-secondary rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2 ${
        destination.gridClass === 'large'
          ? 'md:col-span-2 md:row-span-2 h-[500px]'
          : 'h-[400px]'
      }`}
      onClick={onClick}
    >
      <div
        className="h-[60%] bg-cover bg-center relative transition-transform duration-500 hover:scale-110"
        style={{ backgroundImage: `url('${destination.image}')` }}
      >
        <div
          className="absolute top-4 right-4 w-10 h-10 rounded-full border-[3px] border-white shadow-md bg-cover bg-center"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${destination.flag}</text></svg>')`,
          }}
        />
      </div>
      <div className="h-[40%] p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-bold text-text m-0">
              {destination.name}
            </h3>
            <span className="text-2xl">{destination.icon}</span>
          </div>
          <p className="text-text-light text-sm leading-relaxed mb-4">
            {destination.desc}
          </p>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-black/5">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>{destination.seasonIcon}</span>
            <span>{destination.season}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {destination.price}
          </div>
        </div>
      </div>
    </div>
  )
}

