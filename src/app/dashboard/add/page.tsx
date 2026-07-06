'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowLeft, User, MapPin, Calendar, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function AddTour() {
  const router = useRouter()
  const [clientName, setClientName] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !destination || !departureDate) {
      setError('Заповніть всі обов\'язкові поля')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName,
          destination,
          departureDate,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        const data = await res.json()
        setError(data.error || 'Помилка при створенні туру')
      }
    } catch (err: any) {
      setError(err.message || 'Сталася помилка зв\'язку з сервером')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] flex flex-col font-sans">
      <Navigation />

      {/* Spacer for fixed navigation */}
      <div className="h-24"></div>

      <main className="flex-1 max-w-[800px] w-full mx-auto px-[5%] py-8 flex flex-col justify-center">
        
        {/* Back Link */}
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm self-start group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Назад до панелі</span>
        </Link>

        {/* Form Container */}
        <div className="glass rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
          
          {/* Subtle glowing backgrounds */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
              <h2 className="text-2xl font-black text-white">Тур успішно додано!</h2>
              <p className="text-slate-400 text-sm mt-2">
                Завдання та дедлайни згенеровано. Перенаправлення до панелі керування...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Новий Запис</span>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">
                  Створення Туру
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Після додавання туру система автоматично створить завдання для страховки, оплати та документів.
                </p>
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Client Name */}
                <div className="space-y-2">
                  <label htmlFor="clientName" className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ПІБ Клієнта</span>
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    required
                    placeholder="Наприклад: Сидоренко Анна Володимирівна"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  />
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>Напрямок / Готель</span>
                  </label>
                  <input
                    id="destination"
                    type="text"
                    required
                    placeholder="Наприклад: Єгипет, Шарм-ель-Шейх, Rixos"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
                  />
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <label htmlFor="departureDate" className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    <span>Дата вильоту</span>
                  </label>
                  <input
                    id="departureDate"
                    type="date"
                    required
                    value={departureDate}
                    onChange={e => setDepartureDate(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-sm [color-scheme:dark]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-8 text-sm"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Зберегти та розрахувати завдання</span>
                  )}
                </button>

              </form>
            </>
          )}

        </div>

      </main>

      <Footer />
    </div>
  )
}
