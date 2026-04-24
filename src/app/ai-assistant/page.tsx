'use client';

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MapPin, 
  Plane, 
  Compass,
  MessageSquare,
  X,
  Navigation as NavIcon,
  Globe,
  Share2,
  Phone,
  SendHorizontal,
  ExternalLink,
  Info
} from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'itinerary';
};

const messageVariants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.3 }
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: messageText,
          history: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            text: m.content
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Помилка сервера');
      }

      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          fullContent += chunk;
          
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId ? { ...m, content: fullContent } : m
          ));
        }
      }
    } catch (error: any) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: "🚨 На жаль, у нас тимчасове перевантаження мережі. Будь ласка, напишіть нам у Telegram для швидкої відповіді!",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden selection:bg-purple-500/30 pt-[72px]">
      {/* Sidebar */}
      <aside className={`bg-[#0f172a] border-r border-slate-800/50 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-0 md:w-20'} flex flex-col z-20 overflow-hidden`}>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/50 shrink-0">
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
                <Globe size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">Glorious AI</span>
            </motion.div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <Compass size={20} className={!isSidebarOpen ? 'mx-auto' : ''} />
          </button>
        </div>

        <div className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<MapPin size={20} />} label="Популярні напрямки" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Plane size={20} />} label="Пошук авіаквитків" isOpen={isSidebarOpen} />
          <SidebarItem icon={<NavIcon size={20} />} label="Особисті маршрути" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Info size={20} />} label="Про нас" isOpen={isSidebarOpen} />
        </div>

        {isSidebarOpen && (
          <div className="p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 m-4 rounded-2xl border border-purple-500/20 shrink-0">
            <h4 className="text-[10px] font-bold text-purple-400 mb-3 uppercase tracking-[0.2em]">Прямий зв'язок</h4>
            <div className="space-y-3">
              <a 
                href="https://t.me/lizazakharchenko"
                target="_blank"
                rel="no-referrer"
                className="flex items-center gap-3 p-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition-all group"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <SendHorizontal size={14} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white">Менеджер в Telegram</span>
                  <span className="text-[9px] text-white/70 italic">Відповімо за 5 хв</span>
                </div>
                <ExternalLink size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="flex items-center gap-4 px-2">
                <a href="https://www.instagram.com/lizazakharchenko" target="_blank" className="text-slate-500 hover:text-white transition-colors"><Share2 size={16} /></a>
                <a href="tel:+380000000000" className="text-slate-500 hover:text-white transition-colors"><Phone size={16} /></a>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative bg-[#020617]">
        {/* Chat Header */}
        <header className="h-16 px-6 md:px-8 flex items-center justify-between bg-[#0f172a]/95 border-b border-slate-800/50 z-10 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
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
              <h2 className="text-sm font-bold text-white tracking-wide">Glorious AI Agent</h2>
              <p className="text-[10px] text-slate-500 font-medium">Ваш персональний тревел-експерт</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="md:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Compass size={20} />
             </button>
          </div>
        </header>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-10 animate-pulse" />
                <div className="w-24 h-24 bg-gradient-to-b from-purple-500/10 to-blue-500/10 rounded-[2.5rem] flex items-center justify-center border border-purple-500/20 relative">
                  <Sparkles size={48} className="text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">Привіт, мандрівнику!</h3>
                <p className="text-slate-400 text-sm leading-relaxed px-4">
                  Я знаю все про найкращі готелі, затишні вулички та гарячі пропозиції. Куди хочеш поїхати?
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
                <QuickPrompt label="Тур в Туреччину 🇹🇷" sub="Від 15 000 грн" onClick={(s) => handleSendMessage(s)} />
                <QuickPrompt label="Готелі на Мальдівах 🏝️" sub="Преміум сервіс" onClick={(s) => handleSendMessage(s)} />
                <QuickPrompt label="Екскурсія в Італію 🇮🇹" sub="Рим, Мілан, Венеція" onClick={(s) => handleSendMessage(s)} />
                <QuickPrompt label="Гарячі тури 🔥" sub="Виліт сьогодні" onClick={(s) => handleSendMessage(s)} />
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <motion.div 
                key={m.id} 
                initial="initial"
                animate="animate"
                variants={messageVariants}
                className={`flex gap-3 md:gap-5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  m.role === 'user' 
                  ? 'bg-purple-600 border border-purple-500 shadow-purple-900/10' 
                  : 'bg-slate-800 border border-slate-700 text-purple-400'
                }`}>
                  {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-5 py-4 text-sm leading-relaxed tracking-wide ${
                  m.role === 'user' 
                  ? 'bg-purple-600/90 text-white rounded-tr-none shadow-xl' 
                  : 'bg-slate-800/80 border border-slate-700 text-slate-100 rounded-tl-none whitespace-pre-wrap'
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))
          )}
          {isLoading && !messages[messages.length-1]?.content && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-purple-400">
                <Bot size={20} />
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl rounded-tl-none px-6 py-4 flex items-center gap-1.5 shadow-inner">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 bg-[#020617] border-t border-slate-800/30 shrink-0">
          <div className="max-w-4xl mx-auto flex items-center gap-2 md:gap-4">
            <div className="flex-1 relative group">
              <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Куди ви мрієте поїхати?"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 md:py-5 pl-6 pr-6 focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder-slate-600 shadow-2xl relative z-10"
              />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="p-4 md:p-5 bg-gradient-to-tr from-purple-600 to-blue-600 text-white rounded-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-xl shadow-purple-900/30 shrink-0"
            >
              <Send size={22} />
            </button>
          </div>
          <p className="text-center text-[9px] text-slate-600 mt-5 uppercase tracking-[0.3em] font-bold">
            Glorious Travel AI • Experience World Premium
          </p>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen }: { icon: ReactNode, label: string, isOpen: boolean }) {
  return (
    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-slate-800/40 transition-all group overflow-hidden">
       <span className="text-slate-500 group-hover:text-purple-400 transition-all group-hover:scale-110">{icon}</span>
       {isOpen && <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-100 whitespace-nowrap">{label}</span>}
    </button>
  );
}

function QuickPrompt({ label, sub, onClick }: { label: string, sub: string, onClick: (s: string) => void }) {
  return (
    <button 
      onClick={() => onClick(label)}
      className="bg-[#0f172a] border border-slate-800/50 p-4 rounded-2xl hover:border-purple-500/40 hover:bg-slate-800/50 transition-all text-left flex flex-col group"
    >
      <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">{label}</span>
      <span className="text-[10px] text-slate-500 mt-1">{sub}</span>
    </button>
  );
}
