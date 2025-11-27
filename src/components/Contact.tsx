'use client'

import Link from 'next/link'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-[5%] bg-bg-secondary rounded-3xl rounded-b-none mt-16">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-center mb-4 text-text tracking-tight fade-in">
          Ready to Travel?
        </h2>
        <p className="text-center text-text-light text-xl mb-12 fade-in">
          Write to us, and we'll organize your perfect vacation.
        </p>

        <div className="flex justify-center gap-8 mt-12 flex-wrap">
          <ContactCard
            icon="✈️"
            title="Telegram"
            description="@lizazakharchenko"
            href="https://t.me/lizazakharchenko"
          />
          <ContactCard
            icon="📞"
            title="Phone"
            description="+380 93 936 2967"
            href="tel:+380939362967"
          />
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
}: {
  icon: string
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      className="contact-card bg-bg p-10 rounded-3xl text-text no-underline w-[280px] transition-all shadow-md hover:shadow-2xl hover:-translate-y-1 text-center"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-text">{title}</h3>
      <p className="text-text-light">{description}</p>
    </Link>
  )
}

