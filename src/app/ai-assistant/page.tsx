'use client';
import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MapPin, 
  Plane, 
  Compass,
  X,
  Navigation,
  Globe,
  Share2,
  Phone,
  SendHorizontal,
  ExternalLink,
  Info,
  Trophy,
  Gamepad2,
  LayoutDashboard,
  Zap,
  MessageSquare
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
};

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

const TRIVIA_QUESTIONS: Question[] = [
  { id: 1, question: "Яка країна відома як 'Країна ранкової свіжості'?", options: ["Японія", "Південна Корея", "В'єтнам", "Таїланд"], correct: 1 },
  { id: 2, question: "Де знаходиться 'Загублене місто інків' Мачу-Пікчу?", options: ["Чилі", "Бразилія", "Перу", "Мексика"], correct: 2 },
  { id: 3, question: "Яка європейська столиця стоїть на 14 островах?", options: ["Амстердам", "Стокгольм", "Венеція", "Копенгаген"], correct: 1 },
  { id: 4, question: "В якій країні знаходиться найбільший храм у світі — Ангкор-Ват?", options: ["Індія", "Індонезія", "Камбоджа", "Лаос"], correct: 2 },
];

const messageVariants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.3 }
};

export default function App() {
  const [view, setView] = useState<'chat' | 'game' | 'dashboard' | 'destinations'>('dashboard');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Destinations Data
  const DESTINATIONS = [
    { name: "Анталія, Туреччина", temp: "22°C", price: "від 12 000 грн", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=400", tag: "Hot" },
    { name: "Шарм, Єгипет", temp: "28°C", price: "від 14 500 грн", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80&w=400", tag: "Family" },
    { name: "Рим, Італія", temp: "18°C", price: "від 9 000 грн", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&q=80&w=400", tag: "Culture" },
    { name: "Дубай, ОАЕ", temp: "32°C", price: "від 25 000 грн", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400", tag: "Luxury" },
  ];
  
  // Game State
  const [gameScore, setGameScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (view === 'chat') scrollToBottom();
  }, [messages, view, scrollToBottom]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = ai.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `Ви — "Glorious AI Agent", персональний експерт преміальної туристичної компанії Glorious Travel.
          Ваша мета: допомагати клієнтам обирати найкращі подорожі, планувати маршрути та відповідати на запитання.
          
          Правила відповіді:
          1. Тон: Професійний, надихаючий, але дружній.
          2. Мова: Завжди відповідайте тією ж мовою, якою звернувся клієнт.
          3. Контент: Пропонуйте конкретні напрямки та готелі.
          4. Заклик до дії: Пропонуйте зв'язатися з менеджером у Telegram (@glorious_travel) для бронювання.`
      });

      const response = await model.generateContent(textToSend);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response.text() || "Зараз я не можу відповісти. Спробуйте ще раз через хвилину.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'system',
        content: "🚨 На жаль, мережа перевантажена. Будь ласка, напишіть нам у Telegram для швидкої відповіді!",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameAnswer = (index: number) => {
    if (index === TRIVIA_QUESTIONS[currentQuestion].correct) {
      setGameScore(prev => prev + 1);
    }
    
    if (currentQuestion + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setGameScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setGameStarted(true);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className={`bg-[#0f172a] border-r border-slate-800/50 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-20 hidden md:flex'} flex flex-col z-20`}>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/50 text-white">
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
                <Globe size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">Glorious AI</span>
            </motion.div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 transition-colors text-slate-400 hover:text-white">
            <Compass size={20} className={!isSidebarOpen ? 'mx-auto' : ''} />
          </button>
        </div>

        <div className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Огляд" 
            active={view === 'dashboard'} 
            onClick={() => setView('dashboard')} 
            isOpen={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            label="Чат з Агентом" 
            active={view === 'chat'} 
            onClick={() => setView('chat')} 
            isOpen={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<Gamepad2 size={20} />} 
            label="Грати в Квіз" 
            active={view === 'game'} 
            onClick={() => setView('game')} 
            isOpen={isSidebarOpen} 
          />
          <SidebarItem 
            icon={<MapPin size={20} />} 
            label="Напрямки" 
            active={view === 'destinations'}
            onClick={() => setView('destinations')}
            isOpen={isSidebarOpen} 
          />
          <SidebarItem icon={<Plane size={20} />} label="Квитки" isOpen={isSidebarOpen} />
        </div>

        {isSidebarOpen && (
          <div className="p-4 m-4 bg-gradient-to-br from-purple-900/40 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <h4 className="text-[10px] font-bold text-purple-400 mb-3 uppercase tracking-[0.2em]">Пряма підтримка</h4>
            <a 
              href="https://t.me/glorious_travel" 
              target="_blank"
              rel="no-referrer"
              className="flex items-center gap-3 p-3 bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-lg shadow-purple-900/20"
            >
              <SendHorizontal size={14} className="text-white" />
              <span className="text-xs font-bold text-white">Менеджер Telegram</span>
            </a>
            <div className="mt-4 flex items-center justify-around">
               <a href="#" className="text-slate-500 hover:text-white"><Share2 size={16} /></a>
               <a href="#" className="text-slate-500 hover:text-white"><Phone size={16} /></a>
            </div>
          </div>
        )}
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative bg-[#020617]">
        {/* Header */}
        <header className="h-16 px-6 md:px-8 flex items-center justify-between bg-[#0f172a]/95 border-b border-slate-800/50 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-purple-500/30 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-dashed border-purple-500/20 rounded-full"
                />
                <Bot size={20} className="text-purple-400 relative z-10" />
              </div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[3px] border-[#0f172a]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">Glorious AI Expert</h2>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">Ваш преміальний тревел-гід</p>
            </div>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden h-full">
            <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>🔥 Анталія: -20% при бронюванні сьогодні</span>
              <span>🌊 Дубай: Новий готель 5* відкритий</span>
              <span>🏔️ Буковель: останній шанс на лижний сезон</span>
              <span>🔥 Анталія: -20% при бронюванні сьогодні</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="md:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Compass size={20} />
             </button>
             <button className="text-slate-500 hover:text-white transition-colors p-2">
                <X size={20} />
             </button>
          </div>
        </header>

        {/* Dynamic View Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 max-w-5xl mx-auto space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-600/10 to-blue-600/5 border border-purple-500/20 shadow-2xl relative overflow-hidden group">
                    <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-purple-500/10 group-hover:rotate-12 transition-transform duration-700" />
                    <h3 className="text-3xl font-bold text-white mb-4">Вітаємо у Glorious</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">Ми створили цей простір, щоб ваші подорожі починалися з комфорту та інновацій. Наш Ші-агент допоможе вам з будь-яким запитом.</p>
                    <button onClick={() => setView('chat')} className="px-8 py-3 bg-white text-black font-bold text-xs rounded-full hover:bg-slate-200 transition-colors shadow-lg">Почати чат</button>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-[#0f172a] border border-slate-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap size={20} className="text-orange-400" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Технічний Оазис</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-orange-400/50 pl-4">
                        "Для оптимізації вашого сайту `glorious-travel.vercel.app`, рекомендую перевірити формат зображень (WebP) та налаштувати lazy loading для карт."
                      </p>
                      <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-400/10 rounded-xl flex items-center justify-center text-orange-400">
                           <Zap size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Статус Оптимізації</p>
                          <p className="text-[10px] text-slate-500">Потрібна перевірка медіа-файлів</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <DashCard icon={<Plane size={20} />} title="Активні замовлення" value="0" />
                  <DashCard icon={<Trophy size={20} />} title="Рейтинг клієнта" value="Premium" />
                  <DashCard icon={<Navigation size={20} />} title="Відкритих маршрутів" value="3" />
                </div>

                <div className="pt-8">
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-2">Популярне зараз</h4>
                   <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                      {DESTINATIONS.slice(0, 3).map((d, i) => (
                        <div key={i} className="min-w-[280px] bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-purple-500/30 transition-all group">
                           <div className="h-40 rounded-2xl overflow-hidden mb-4">
                              <img src={d.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                           </div>
                           <div className="flex justify-between items-end">
                              <div>
                                 <p className="text-[10px] font-bold text-purple-400 uppercase mb-1">{d.tag}</p>
                                 <h5 className="text-sm font-bold text-white">{d.name}</h5>
                              </div>
                              <span className="text-xs font-bold text-purple-400">{d.price}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {view === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1 p-4 md:p-8 space-y-8 custom-scrollbar">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse" />
                        <div className="w-24 h-24 bg-gradient-to-b from-purple-500/10 to-blue-500/10 rounded-[2.5rem] flex items-center justify-center border border-purple-500/20 relative">
                           <Sparkles size={48} className="text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">Привіт, я ваш гід!</h4>
                        <p className="text-slate-500 text-sm px-4">Запитайте мене про що завгодно: від турів до Єгипту до секретних місць Риму.</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <QuickPrompt label="Тур в Туреччину 🇹🇷" sub="Від 15 000 грн" onClick={setInput} />
                        <QuickPrompt label="Готелі Балі 🏝️" sub="Вілли 5*" onClick={setInput} />
                      </div>
                    </div>
                  ) : (
                    messages.map((m) => (
                      <motion.div 
                        key={m.id} 
                        {...messageVariants}
                        className={`flex gap-4 md:gap-5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                          m.role === 'user' ? 'bg-purple-600 shadow-purple-900/10' : 'bg-slate-800 border border-slate-700 text-purple-400'
                        }`}>
                          {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-6 py-4 text-sm leading-relaxed tracking-wide ${
                          m.role === 'user' 
                          ? 'bg-purple-600 text-white rounded-tr-none shadow-xl' 
                          : 'bg-[#0f172a] border border-slate-800 text-slate-100 rounded-tl-none shadow-sm'
                        }`}>
                          {m.content}
                        </div>
                      </motion.div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-purple-400">
                        <Bot size={20} />
                      </div>
                      <div className="bg-slate-800/40 p-5 rounded-3xl animate-pulse flex gap-1.5 items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                
                <div className="p-4 md:p-8 bg-[#020617] border-t border-slate-800/30">
                  <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <div className="flex-1 relative group">
                      <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Напишіть нам..."
                        className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl py-4.5 px-6 focus:outline-none focus:border-purple-600/50 transition-colors text-white relative z-10"
                      />
                    </div>
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim() || isLoading}
                      className="p-4.5 bg-gradient-to-tr from-purple-600 to-blue-600 text-white rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shrink-0 shadow-lg shadow-purple-900/20"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'destinations' && (
              <motion.div 
                key="destinations"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 max-w-6xl mx-auto"
              >
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">Золоті Напрямки</h2>
                    <p className="text-slate-500 text-sm">Найкращі пропозиції сезону, обрані нашими тревел-експертами</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800 rounded-full text-xs font-bold text-white hover:bg-slate-700">Всі</button>
                    <button className="px-4 py-2 bg-purple-600/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold">Hot</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DESTINATIONS.map((dest, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => {
                        setView('chat');
                        handleSendMessage(`Розкажи більше про тур в ${dest.name}`);
                      }}
                    >
                      <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 border border-slate-800">
                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                           <span className="text-[10px] font-black text-white uppercase">{dest.tag}</span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="flex items-center gap-2 mb-2">
                              <Zap size={14} className="text-orange-400" />
                              <span className="text-xs font-bold text-orange-400">{dest.temp}</span>
                           </div>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1 font-mono">Best Deal</p>
                           <h4 className="text-lg font-bold text-white">{dest.name}</h4>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="text-sm font-black text-purple-400">{dest.price}</span>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                           <SendHorizontal size={14} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 p-12 rounded-[3rem] bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20 text-center">
                   <h3 className="text-2xl font-black text-white mb-4">Не знайшли ідеальний варіант?</h3>
                   <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">Напишіть нашому ІІ-агенту свої побажання, і він сформує для вас індивідуальну пропозицію за 5 секунд.</p>
                   <button 
                    onClick={() => setView('chat')}
                    className="px-10 py-4 bg-white text-black font-black text-xs rounded-full hover:scale-105 transition-transform"
                   >
                    Скласти Маршрут
                   </button>
                </div>
              </motion.div>
            )}

            {view === 'game' && (
              <motion.div 
                key="game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
              >
                {!gameStarted ? (
                  <div className="space-y-8">
                    <div className="w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-purple-500/30">
                      <Gamepad2 size={48} className="text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-4">Travel Trivia</h2>
                      <p className="text-slate-400 text-sm leading-relaxed">Поки ви чекаєте на відповідь, перевірте свої знання про світ та виграйте віртуальну нагороду!</p>
                    </div>
                    <button 
                      onClick={resetGame}
                      className="px-12 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40"
                    >
                      Почати гру
                    </button>
                  </div>
                ) : showResult ? (
                  <div className="space-y-8 animate-in zoom-in duration-500">
                    <div className="w-32 h-32 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-purple-500/20 relative">
                       <Trophy size={64} className="text-purple-400" />
                       <div className="absolute -bottom-2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold">EXPERT</div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white mb-2">Результат: {gameScore}/{TRIVIA_QUESTIONS.length}</h2>
                      <p className="text-slate-400">Ви справжній гуру подорожей! Напишіть цей результат менеджеру для приємного бонусу.</p>
                    </div>
                    <button 
                      onClick={resetGame}
                      className="px-10 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors text-white font-bold"
                    >
                      Спробувати ще 🔄
                    </button>
                  </div>
                ) : (
                  <div className="w-full space-y-10">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Питання {currentQuestion + 1}</span>
                       <div className="flex gap-2">
                          {TRIVIA_QUESTIONS.map((_, idx) => (
                             <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentQuestion ? 'bg-purple-500' : 'bg-slate-800'}`} />
                          ))}
                       </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-tight">{TRIVIA_QUESTIONS[currentQuestion].question}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {TRIVIA_QUESTIONS[currentQuestion].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleGameAnswer(idx)}
                          className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all font-medium text-slate-300 text-sm tracking-wide"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen, active, onClick }: { icon: ReactNode, label: string, isOpen: boolean, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${active ? 'bg-purple-600/10 text-white border border-purple-500/20' : 'hover:bg-slate-800/40 text-slate-500 hover:text-slate-100'}`}
    >
       <span className={`${active ? 'text-purple-400' : 'group-hover:text-purple-400'} transition-all group-hover:scale-110`}>{icon}</span>
       {isOpen && <span className="text-xs font-bold whitespace-nowrap tracking-wide">{label}</span>}
    </button>
  );
}

function DashCard({ icon, title, value }: { icon: ReactNode, title: string, value: string }) {
  return (
    <div className="p-8 bg-[#0f172a] border border-slate-800 rounded-[2.5rem] hover:bg-slate-800/50 transition-all group cursor-default">
      <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{title}</div>
      <div className="text-3xl font-black text-white">{value}</div>
    </div>
  );
}

function QuickPrompt({ label, sub, onClick }: { label: string, sub: string, onClick: (s: string) => void }) {
  return (
    <button 
      onClick={() => onClick(label)}
      className="bg-[#0f172a] border border-slate-800/50 p-5 rounded-3xl hover:border-purple-500/40 hover:bg-slate-800 transition-all text-left flex flex-col group min-w-[160px]"
    >
      <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">{label}</span>
      <span className="text-[10px] text-slate-500 mt-2 font-medium">{sub}</span>
    </button>
  );
}
