import { useState, useEffect } from 'react';
import { QuantumTravelScene } from './components/QuantumTravelScene';
import { Compass, Plane, ArrowDown, Shield, Star, Globe, Zap, Heart, Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const destinations = [
  { id: 'turkey', name: 'Туреччина', flag: '🇹🇷', price: 'від 350$', img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=800&auto=format&fit=crop', role: 'Сонце та Історія' },
  { id: 'spain', name: 'Іспанія', flag: '🇪🇸', price: 'від 450$', img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800&auto=format&fit=crop', role: 'Гастрономія та Драйв' },
  { id: 'greece', name: 'Греція', flag: '🇬🇷', price: 'від 400$', img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800&auto=format&fit=crop', role: 'Острови та Міфи' },
  { id: 'uae', name: 'ОАЕ', flag: '🇦🇪', price: 'від 550$', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop', role: 'Розкіш та Майбутнє' }
];

const DestinationCard = ({ name, role, price, flag, delay }: { name: string, role: string, price: string, flag: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{flag}</div>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed mb-2">{role}</p>
      <p className="text-sm font-serif italic text-nobel-gold">{price}</p>
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">G</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              GLORIOUS <span className="font-normal text-stone-500">2024</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#philosophy" onClick={scrollToSection('philosophy')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Філософія</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Технології</a>
            <a href="#destinations" onClick={scrollToSection('destinations')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Напрямки</a>
            <a 
              href="https://t.me/lizazakharchenko" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Замовити тур
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#philosophy" onClick={scrollToSection('philosophy')} className="uppercase">Філософія</a>
            <a href="#science" onClick={scrollToSection('science')} className="uppercase">Технології</a>
            <a href="#destinations" onClick={scrollToSection('destinations')} className="uppercase">Напрямки</a>
            <a href="https://t.me/lizazakharchenko" target="_blank" className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg">Контакт</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <QuantumTravelScene />
        
        {/* Gradient Overlay inspired by Google */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Premium Experience • 2024
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm">
            Glorious Travel <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Мистецтво бездоганних подорожей</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Відійдіть від стандартів. Ми використовуємо інтелектуальні алгоритми та персоналізований підхід, щоб кожна мить вашого відпочинку була досконалою.
          </p>
          
          <div className="flex justify-center">
             <a href="#philosophy" onClick={scrollToSection('philosophy')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>DISCOVER</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Philosophy / Introduction */}
        <section id="philosophy" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="section-label">Філософія</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Більше ніж просто туризм</h2>
              <div className="gold-line"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">П</span>одорож — це не просто переміщення в просторі. Це розширення свідомості, пошук нових сенсів та відновлення внутрішньої енергії. У Glorious Travel ми віримо, що логістика має бути непомітною, а досвід — незабутнім.
              </p>
              <p>
                Наша місія — створювати подорожі, які змінюють вас. Ми відбираємо локації, які мають душу, та готелі, що пропонують не лише комфорт, а й естетичну насолоду. Завдяки нашому досвіду та сучасним технологіям аналізу даних, ми гарантуємо якість кожної пропозиції.
              </p>
            </div>
          </div>
        </section>

        {/* Science / Innovation */}
        <section id="science" className="py-32 bg-[#F5F4F0] border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200 shadow-sm">
                            <Zap size={14} className="text-nobel-gold"/> АЛГОРИТМ ПІДБОРУ
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Інтелектуальний Аналіз</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            Як AlphaQubit аналізує квантові помилки, ми аналізуємо тисячі факторів: від коливань цін на авіаквитки до емоційного тону відгуків реальних клієнтів. 
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-nobel-gold"></div>
                                <span className="font-medium">Персоналізована оцінка за 150 параметрами</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-nobel-gold"></div>
                                <span className="font-medium">Моніторинг якості готелів у реальному часі</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-nobel-gold"></div>
                                <span className="font-medium">Прогнозування ідеальних погодних вікон</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex items-center justify-center p-12">
                             {/* Abstract Diagram Placeholder - Inspired by Google */}
                             <div className="grid grid-cols-4 gap-4 w-full h-full">
                                {[...Array(16)].map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0.2 }}
                                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                                        transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                                        className={`rounded-lg ${i % 3 === 0 ? 'bg-nobel-gold' : 'bg-stone-200'}`}
                                    />
                                ))}
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="px-6 py-3 bg-stone-900/90 backdrop-blur-md text-white rounded-xl text-xs font-bold tracking-widest uppercase">
                                    Quality Matrix 1.0
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Destinations Grid - Research Team Style */}
        <section id="destinations" className="py-32 bg-white border-t border-stone-100">
           <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="section-label">Напрямки</div>
                    <h2 className="font-serif text-4xl md:text-6xl mb-4 text-stone-900">Вибрані подорожі</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Кожен напрямок проходить ретельну перевірку нашими експертами.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((dest, i) => (
                        <DestinationCard 
                            key={dest.id}
                            name={dest.name} 
                            role={dest.role} 
                            price={dest.price}
                            flag={dest.flag}
                            delay={`${i * 0.1}s`} 
                        />
                    ))}
                </div>
                <div className="text-center mt-16">
                    <p className="text-stone-500 italic">Ми постійно оновлюємо нашу базу даних, додаючи ексклюзивні локації.</p>
                </div>
           </div>
        </section>

        {/* Impact / Quote Section */}
        <section className="py-32 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                 <div className="section-label text-nobel-gold opacity-100">Наш Підхід</div>
                 <h2 className="font-serif text-4xl md:text-5xl mb-12 text-white italic">"Справжня розкіш — це коли ваші мрії передбачають заздалегідь."</h2>
                 <div className="flex justify-center mb-12">
                    <div className="w-24 h-1 bg-nobel-gold"></div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                    <div>
                        <div className="text-3xl font-serif text-nobel-gold mb-2">99%</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-stone-400">Точність підбору</div>
                    </div>
                    <div>
                        <div className="text-3xl font-serif text-nobel-gold mb-2">24/7</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-stone-400">Консьєрж-сервіс</div>
                    </div>
                    <div>
                        <div className="text-3xl font-serif text-nobel-gold mb-2">500+</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-stone-400">Преміум готелів</div>
                    </div>
                 </div>
            </div>
        </section>

      </main>

      <footer className="bg-white border-t border-stone-200 py-16">
        <div className="container mx-auto px-6 text-center">
            <div className="text-stone-900 font-serif font-bold text-3xl mb-4">Glorious Travel</div>
            <p className="text-sm text-stone-500 mb-8 uppercase tracking-[0.3em]">Experience the Art of Travel</p>
            <div className="text-xs text-stone-400">
                &copy; 2024 Glorious Travel. Inspired by precision, built with soul.
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
