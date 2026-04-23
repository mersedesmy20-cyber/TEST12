'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
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
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: input,
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
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId ? { ...msg, content: fullText } : msg
          ));
        }
      }
    } catch (error: any) {
      console.error("AI Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `🚨 Помилка ШІ: ${error.message || "Не вдалося з'єднатися з сервером."}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-200 font-sans overflow-hidden">
      {/* Interactive Sidebar */}
      <aside className={`bg-[#1E293B] border-r border-slate-800 transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="text-white w-6 h-6" />
                </div>
                <Link href="/" className="font-bold text-xl tracking-tight text-white">Glorious</Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Compass className={`${!isSidebarOpen && 'mx-auto'} text-slate-400`} />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4">
          <SidebarItem icon={<MapPin className="w-5 h-5" />} label="Путівники" isOpen={isSidebarOpen} />
          <SidebarItem icon={<Plane className="w-5 h-5" />} label="Авіаквитки" isOpen={isSidebarOpen} />
          <SidebarItem icon={<NavIcon className="w-5 h-5" />} label="Маршрути" isOpen={isSidebarOpen} />
        </div>

        {isSidebarOpen && (
          <div className="p-6 bg-slate-900/50 m-4 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-semibold text-white mb-2">Акція дня</h4>
            <p className="text-xs text-slate-400">Знижка 20% на всі тури до Європи при бронюванні сьогодні!</p>
          </div>
        )}
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between bg-[#1E293B]/80 backdrop-blur-md border-b border-slate-800 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-indigo-500 overflow-hidden shadow-inner">
                 <Bot className="text-indigo-400" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1E293B]" />
            </div>
            <div>
              <h2 className="font-semibold text-white">ШІ Агент Glorious</h2>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Онлайн</p>
            </div>
          </div>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </Link>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-6">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 bg-gradient-to-b from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border border-indigo-500/30"
              >
                <Sparkles size={48} className="text-indigo-400" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Куди відправимось сьогодні?</h3>
                <p className="text-slate-400">Я допоможу з підбором тура, бронюванням готелів та порадами для мандрівників.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                <QuickPrompt label="Тур в Італію" onClick={setInput} />
                <QuickPrompt label="Готелі Балі" onClick={setInput} />
                <QuickPrompt label="Відпочинок у Греції" onClick={setInput} />
                <QuickPrompt label="Гарячі тури" onClick={setInput} />
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <motion.div 
                key={m.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                  m.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-[#1E293B] border border-slate-700 text-indigo-400'
                }`}>
                  {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[75%] rounded-3xl p-5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  m.role === 'user' 
                  ? 'bg-indigo-600/90 text-white rounded-tr-none' 
                  : 'bg-[#1E293B] border border-slate-700 text-slate-200 rounded-tl-none'
                }`}>
                  {m.content || (m.role === 'assistant' && <span className="animate-pulse">друкує...</span>)}
                </div>
              </motion.div>
            ))
          )}
          {isLoading && !messages[messages.length - 1]?.content && messages[messages.length - 1]?.role === 'assistant' && (
             <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-slate-700 flex items-center justify-center text-indigo-400">
                <Bot size={20} />
              </div>
              <div className="bg-[#1E293B] border border-slate-700 rounded-3xl rounded-tl-none p-5">
                <div className="flex gap-1.5">
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 pt-0">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Напишіть агенту..."
                className="w-full bg-[#1E293B] border border-slate-700 rounded-2xl py-5 pl-6 pr-16 focus:outline-none focus:border-indigo-500 transition-all text-white placeholder-slate-500 shadow-xl"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 p-3.5 bg-gradient-to-tr from-indigo-600 to-purple-500 text-white rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-tighter">
            Powered by Gemini AI • Glorious Travel Assistant
          </p>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen }: { icon: ReactNode, label: string, isOpen: boolean }) {
  return (
    <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all group">
       <span className="text-slate-400 group-hover:text-indigo-400 transition-colors">{icon}</span>
       {isOpen && <span className="text-sm font-medium text-slate-300 group-hover:text-white">{label}</span>}
    </button>
  );
}

function QuickPrompt({ label, onClick }: { label: string, onClick: (s: string) => void }) {
  return (
    <button 
      onClick={() => onClick(label)}
      className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all text-sm text-slate-300 text-left"
    >
      {label}
    </button>
  );
}
