import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'

import BotWidget from '@/components/BotWidget'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Glorious Travel | Ваша наступна подорож починається тут',
  description: 'Ми допомагаємо знайти ідеальну подорож, яка відповідає вашому бюджету та стилю мандрів.',
  keywords: 'туроператор, подорожі, тури, відпочинок, гарячі тури',
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

