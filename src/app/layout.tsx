import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Glorious Travel | Your Next Journey Begins Here',
  description: 'We help you find the perfect trip that matches your budget and travel style.',
  keywords: 'travel, tours, vacation, holidays, destinations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  )
}

