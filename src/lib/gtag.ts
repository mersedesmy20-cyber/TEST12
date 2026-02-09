export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
    action: string
    category: string
    label: string
    value?: number
}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

// Specific events for tracking
export const trackQuizStart = () => {
    event({
        action: 'quiz_started',
        category: 'engagement',
        label: 'lead_generation'
    })
}

export const trackQuizComplete = (destination?: string) => {
    event({
        action: 'quiz_completed',
        category: 'conversion',
        label: destination || 'unknown',
        value: 1
    })
}

export const trackTelegramClick = () => {
    event({
        action: 'telegram_click',
        category: 'engagement',
        label: 'contact'
    })
}

export const trackDestinationView = (country: string) => {
    event({
        action: 'destination_viewed',
        category: 'engagement',
        label: country
    })
}
