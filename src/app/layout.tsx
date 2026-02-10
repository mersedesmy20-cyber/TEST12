import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import Script from 'next/script'

import CustomCursor from '@/components/CustomCursor'
import BotWidget from '@/components/BotWidget'
import CookieConsent from '@/components/CookieConsent'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'] })

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || ''

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
      <head>
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied'
                  });
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                  gtag('config', 'AW-16447426855');
                `,
              }}
            />
          </>
        )}

        {/* Facebook Pixel */}
        {FB_PIXEL_ID && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Structured Data (JSON-LD) for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Glorious Travel',
              description: 'Туристичне агентство з персональним підходом',
              url: 'https://test-12-green.vercel.app',
              logo: 'https://test-12-green.vercel.app/favicon.svg',
              sameAs: [
                'https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw',
                'https://t.me/lizazakharchenko'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['Ukrainian', 'English']
              }
            })
          }}
        />
      </head>
      <body className={montserrat.className}>
        <ModalProvider>
          <CustomCursor />
          {children}
          <BotWidget />
          <CookieConsent />
        </ModalProvider>
      </body>
    </html>
  )
}

