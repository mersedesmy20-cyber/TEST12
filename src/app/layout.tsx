import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'

import BotWidget from '@/components/BotWidget'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Glorious Travel | Ваша наступна подорож починається тут',
  description: 'Туристичне агентство Glorious Travel - організація незабутніх подорожей по всьому світу. Туреччина, Єгипет, ОАЕ, Греція, Домінікана та багато інших напрямків. Персональний підхід та доступні ціни.',
  keywords: 'туроператор, подорожі, тури, відпочинок, гарячі тури, glorious travel, туристичне агентство київ, тури з києва, єгипет, туреччина, оае',

  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://test-12-green.vercel.app',
    siteName: 'Glorious Travel',
    title: 'Glorious Travel | Туристичне агентство',
    description: '✈️ Організація незабутніх подорожей по всьому світу. Туреччина, Єгипет, ОАЕ, Греція, Домінікана та інші напрямки. Персональний підхід до кожного клієнта.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Glorious Travel - Туристичне агентство',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Glorious Travel | Туристичне агентство',
    description: '✈️ Організація незабутніх подорожей. Персональний підхід та доступні ціни.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://test-12-green.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>
        <ModalProvider>
          {children}
          <BotWidget />
        </ModalProvider>
      </body>
    </html>
  )
}

