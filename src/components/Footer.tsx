export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-16 text-center border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-[5%] flex flex-col items-center">
        <div className="text-3xl font-extrabold mb-6 tracking-tight">
          GLORIOUS<span className="text-indigo-400">TRAVEL</span>
        </div>

        <p className="text-slate-400 max-w-md mx-auto mb-10 font-light">
          Створюємо незабутні спогади про подорожі. Ваша перепустка у світ пригод та відпочинку.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-medium text-slate-400">
          <a href="/#search" className="hover:text-white transition-colors">Пошук туру</a>
          <a href="/countries" className="hover:text-white transition-colors">Країни</a>
          <a href="/#destinations" className="hover:text-white transition-colors">Готелі</a>
          <a href="/seasonal" className="hover:text-white transition-colors text-orange-400">Гарячі тури 🔥</a>
          <a href="/calendar" className="hover:text-white transition-colors">Календар</a>
          <a href="/#reviews" className="hover:text-white transition-colors">Відгуки</a>
          <a href="/#contact" className="hover:text-white transition-colors">Контакти</a>
        </div>

        <div className="flex gap-6 mb-12">
          <a
            href="https://www.instagram.com/lizazakharchenko?igsh=Nnl4MG9tcjVxMzcw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'social_click', {
                  event_category: 'engagement',
                  event_label: 'instagram_footer'
                })
              }
            }}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 hover:border-pink-500 hover:scale-110 hover:rotate-12 transition-all cursor-pointer group shadow-lg"
          >
            <span className="text-slate-400 group-hover:text-white text-xl transition-colors">📸</span>
          </a>
          <a
            href="https://t.me/lizazakharchenko"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              import('@/lib/gtag').then(gtag => gtag.trackTelegramClick())
            }}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:border-sky-400 hover:scale-110 hover:-rotate-12 transition-all cursor-pointer group shadow-lg"
          >
            <span className="text-slate-400 group-hover:text-white text-xl transition-colors">✈️</span>
          </a>
        </div>

        <div className="text-slate-600 text-sm space-y-2">
          <div>
            &copy; {new Date().getFullYear()} Glorious Travel Agency. Всі права захищені.
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <a href="/privacy" className="hover:text-indigo-400 transition-colors">
              Політика конфіденційності
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

