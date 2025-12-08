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

        <div className="flex gap-6 mb-12">
          {['Instagram', 'Telegram', 'Facebook'].map((social) => (
            <div key={social} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-500 hover:scale-110 transition-all cursor-pointer group">
              <span className="text-slate-400 group-hover:text-white text-sm">{social[0]}</span>
            </div>
          ))}
        </div>

        <div className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Glorious Travel Agency. Всі права захищені.
        </div>
      </div>
    </footer>
  )
}

