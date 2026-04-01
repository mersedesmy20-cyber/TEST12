'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Message = {
  id: string
  role: 'user' | 'model'
  text: string
}

export default function BotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Привіт! 👋 Я ваш особистий AI-помічник. З радістю допоможу підібрати ідеальну подорож! Куди б ви хотіли вирушити?' }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Show widget after a delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userText = input.trim()
    setInput('')
    setIsLoading(true)

    // Append user message
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user' as const, text: userText }]
    setMessages(newMessages)

    // Prepare model's placeholder response
    const tempId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, { id: tempId, role: 'model' as const, text: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: userText,
          history: newMessages.slice(0, -1).map(m => ({ role: m.role, text: m.text }))
        }),
      })

      if (!response.ok) throw new Error('Network error')

      // Read streaming text
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (reader) {
        const { value, done } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk

        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? { ...msg, text: fullText } : msg
        ))
      }
    } catch (error) {
      console.error(error)
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, text: "Ой, сталася помилка з'єднання 😅 Перевірте підключення або напишіть у наш Telegram!" } : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div
        className={`bg-slate-900 border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] rounded-2xl w-[350px] mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto flex flex-col ${isOpen ? 'h-[500px] scale-100 opacity-100 translate-y-0' : 'h-0 scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shadow-inner">
               🤖
             </div>
             <div>
               <h3 className="text-white font-bold text-sm">ШІ Агент Glorious</h3>
               <p className="text-indigo-200 text-xs flex items-center gap-1">
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Онлайн
               </p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-2xl leading-none w-8 h-8 rounded-full hover:bg-white/20 transition-colors">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-slate-950/90 backdrop-blur-xl flex flex-col gap-4">
          {messages.map((msg) => (
             <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-100 border border-white/5 shadow-md rounded-tl-sm'}`}>
                   {msg.text || (msg.role === 'model' && <span className="animate-pulse">друкує...</span>)}
                </div>
             </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-white/10 shrink-0">
           <div className="relative flex items-center">
              <input
                type="text"
                disabled={isLoading}
                placeholder="Напишіть агенту..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-full pl-4 pr-12 py-3 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full text-white shadow-md hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 transition-colors"
               >
                 <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
           </div>
        </form>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col gap-3 items-center pointer-events-auto">
        {/* Telegram Button */}
        {!isOpen && (
           <Link
             href="https://t.me/lizazakharchenko?text=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B3%D0%BE%20%D0%B4%D0%BD%D1%8F!%20%D0%AF%20%D0%B7%20%D1%81%D0%B0%D0%B9%D1%82%D1%83%20Glorious%20Travel,%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D1%82%D1%80%D0%B8%D0%BC%D0%B0%D1%82%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D1%96%D1%8E%20%D1%89%D0%BE%D0%B4%D0%BE%20%D0%BF%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D1%96."
             target="_blank"
             onClick={() => {
               import('@/lib/gtag').then(gtag => {
                 gtag.trackTelegramClick()
                 gtag.trackGoogleAdsConversion()
               })
             }}
             className="group relative w-14 h-14 bg-[#229ED9] hover:bg-[#208aba] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(34,158,217,0.4)] transition-all hover:scale-110 active:scale-95 animate-fadeIn"
           >
             <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944s11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.281 8.113c-.161 1.704-1.214 7.821-1.751 10.665-.226 1.205-.724 1.623-1.154 1.66-.944.08-1.657-.626-2.57-1.221-1.428-.93-2.221-1.503-3.003-2.015-1.135-.745-.399-1.155.247-1.821.168-.175 3.093-2.833 3.149-3.07.007-.03-.002-.14-.069-.199a.23.23 0 0 0-.203-.013c-.088.02-1.492.951-4.212 2.784-.399.273-.759.407-1.08.399-.355-.008-1.037-.202-1.545-.367-.622-.202-1.116-.31-1.073-.654.022-.18.269-.364.743-.553 2.91-1.267 4.848-2.102 5.811-2.505 2.744-1.149 3.32-.349 3.712-.349.088 0 .285.02.412.124.104.088.134.208.139.301.004.104-.009.215-.102.327z"/>
             </svg>
             
             {/* Tooltip */}
             <span className="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
               Написати в Telegram
             </span>

             {/* Pulsing Dot */}
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping z-10 opacity-75" />
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white z-20" />
           </Link>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all hover:scale-110 active:scale-95 pointer-events-auto overflow-hidden"
        >
          <span className={`text-2xl transition-transform duration-300 absolute ${isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>💬</span>
          <span className={`text-2xl transition-transform duration-300 absolute ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>✖️</span>

          {/* Notification Badge */}
          {!isOpen && (
             <>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping z-10" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 z-20" />
             </>
          )}

          {/* Tooltip for AI */}
          {!isOpen && (
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-xl text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              Запитати АІ Агента
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
