'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  X, 
  Globe,
  MessageSquare,
  Compass
} from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function BotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Привіт! 👋 Я ваш особистий AI-помічник Glorious. З радістю допоможу підібрати ідеальну подорож! Куди б ви хотіли вирушити?' }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userText = input.trim()
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: userText }
    
    setInput('')
    setIsLoading(true)
    setMessages(prev => [...prev, userMsg])

    const assistantMsgId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: userText,
          history: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            text: m.content
          }))
        }),
      })

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Network error');
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          fullText += chunk
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMsgId ? { ...msg, content: fullText } : msg
          ))
        }
      }
    } catch (error: any) {
      console.error(error)
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMsgId ? { ...msg, content: `⚠️ Помилка: ${error.message}. Спробуйте пізніше.` } : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-none">
      {/* Premium Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1E293B] border border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl w-[380px] sm:w-[420px] mb-6 overflow-hidden pointer-events-auto flex flex-col h-[600px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-[#0F172A] p-5 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Bot className="text-white w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0F172A]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">ШІ Агент Glorious</h3>
                  <p className="text-green-500 text-[10px] font-bold uppercase tracking-wider">Онлайн</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-[#0F172A]/50 space-y-5 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400 border border-slate-700'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
                  }`}>
                    {msg.content || (msg.role === 'assistant' && <span className="animate-pulse">друкує...</span>)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Promo Banner */}
            <div className="px-5 py-2 bg-indigo-600/10 border-t border-b border-indigo-500/20 flex items-center justify-between">
              <span className="text-[10px] text-indigo-300 font-medium">Потрібна повна консультація?</span>
              <Link href="/ai-assistant" className="text-[10px] text-white bg-indigo-600 px-2 py-1 rounded-lg font-bold hover:bg-indigo-500 transition-colors">
                Повна версія
              </Link>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-5 bg-[#0F172A] border-t border-slate-800">
              <div className="relative flex items-center group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
                <input
                  type="text"
                  disabled={isLoading}
                  placeholder="Напишіть агенту..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-[#1E293B] border border-slate-700 rounded-2xl pl-5 pr-14 py-4 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all relative z-10"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 z-20 w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl text-white shadow-lg disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-slate-600 text-center mt-3 uppercase tracking-widest font-medium">Powered by Gemini AI</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 items-center pointer-events-auto">
        {/* Telegram Button */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative"
          >
            <Link
              href="https://t.me/lizazakharchenko"
              target="_blank"
              className="w-14 h-14 bg-[#229ED9] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(34,158,217,0.4)] hover:shadow-[0_15px_30px_rgba(34,158,217,0.6)] transition-all hover:scale-110 active:scale-95 overflow-hidden"
            >
               <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944s11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.281 8.113c-.161 1.704-1.214 7.821-1.751 10.665-.226 1.205-.724 1.623-1.154 1.66-.944.08-1.657-.626-2.57-1.221-1.428-.93-2.221-1.503-3.003-2.015-1.135-.745-.399-1.155.247-1.821.168-.175 3.093-2.833 3.149-3.07.007-.03-.002-.14-.069-.199a.23.23 0 0 0-.203-.013c-.088.02-1.492.951-4.212 2.784-.399.273-.759.407-1.08.399-.355-.008-1.037-.202-1.545-.367-.622-.202-1.116-.31-1.073-.654.022-.18.269-.364.743-.553 2.91-1.267 4.848-2.102 5.811-2.505 2.744-1.149 3.32-.349 3.712-.349.088 0 .285.02.412.124.104.088.134.208.139.301.004.104-.009.215-.102.327z"/>
               </svg>
            </Link>
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
              Написати нам
            </span>
          </motion.div>
        )}

        {/* AI Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(99,102,241,0.5)] hover:shadow-[0_20px_45px_rgba(99,102,241,0.7)] transition-all hover:scale-110 active:scale-95 group relative"
        >
          {isOpen ? <X className="text-white" size={28} /> : <Bot className="text-white" size={32} />}
          
          {!isOpen && (
            <>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-4 border-slate-950 animate-pulse z-10" />
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                ШІ Помічник
              </span>
            </>
          )}
        </motion.button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
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
  )
}
