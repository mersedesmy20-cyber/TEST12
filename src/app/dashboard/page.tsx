'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle, 
  Clock, 
  Loader2, 
  RefreshCw,
  Globe,
  Check,
  Send,
  AlertCircle,
  Edit,
  Trash2,
  X
} from 'lucide-react'

interface Task {
  id: string
  taskType: string
  taskName: string
  deadlineDate: string
  status: 'PENDING' | 'COMPLETED'
  isNotified: boolean
}

interface Tour {
  id: string
  clientName: string
  destination: string
  departureDate: string
  source: 'web' | 'telegram'
  createdAt: string
  tasks: Task[]
}

export default function Dashboard() {
  const [tours, setTours] = useState<Tour[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)
  
  // Telegram registration helper state
  const [customBotToken, setCustomBotToken] = useState('')
  const [registerStatus, setRegisterStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  })
  const [registering, setRegistering] = useState(false)

  // Edit Tour Modal State
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [editClientName, setEditClientName] = useState('')
  const [editDestination, setEditDestination] = useState('')
  const [editDepartureDate, setEditDepartureDate] = useState('')
  const [editTasks, setEditTasks] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fetchTours = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/tours')
      if (res.ok) {
        const data = await res.json()
        setTours(data)
      }
    } catch (error) {
      console.error('Error fetching tours:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const handleToggleTaskStatus = async (taskId: string, currentStatus: 'PENDING' | 'COMPLETED') => {
    const nextStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING'
    setUpdatingTaskId(taskId)
    
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: nextStatus })
      })

      if (res.ok) {
        // Update local state
        setTours(prevTours => 
          prevTours.map(tour => ({
            ...tour,
            tasks: tour.tasks.map(task => 
              task.id === taskId ? { ...task, status: nextStatus } : task
            )
          }))
        )
      } else {
        alert('Не вдалося оновити статус завдання')
      }
    } catch (error) {
      console.error('Error updating task status:', error)
    } finally {
      setUpdatingTaskId(null)
    }
  }

  // Edit Handlers
  const startEditTour = (tour: Tour) => {
    setEditingTour(tour)
    setEditClientName(tour.clientName)
    setEditDestination(tour.destination)
    setEditDepartureDate(tour.departureDate.split('T')[0])
    setEditTasks(tour.tasks.map(t => ({
      id: t.id,
      taskType: t.taskType,
      taskName: t.taskName,
      deadlineDate: t.deadlineDate.split('T')[0],
      status: t.status,
      isNotified: t.isNotified
    })))
  }

  const handleAddEditTask = () => {
    setEditTasks(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        taskType: 'custom',
        taskName: '',
        deadlineDate: '',
        status: 'PENDING',
        isNotified: false
      }
    ])
  }

  const handleRemoveEditTask = (id: string) => {
    setEditTasks(prev => prev.filter(t => t.id !== id))
  }

  const handleEditTaskName = (id: string, name: string) => {
    setEditTasks(prev => prev.map(t => t.id === id ? { ...t, taskName: name } : t))
  }

  const handleEditTaskDate = (id: string, date: string) => {
    setEditTasks(prev => prev.map(t => t.id === id ? { ...t, deadlineDate: date } : t))
  }

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTour) return
    setSaving(true)

    try {
      const res = await fetch(`/api/tours/${editingTour.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: editClientName,
          destination: editDestination,
          departureDate: new Date(editDepartureDate).toISOString(),
          tasks: editTasks.map(t => ({
            ...t,
            deadlineDate: new Date(t.deadlineDate).toISOString()
          }))
        })
      })

      if (res.ok) {
        await fetchTours()
        setEditingTour(null)
      } else {
        alert('Не вдалося зберегти зміни')
      }
    } catch (err) {
      console.error('Error saving tour:', err)
      alert('Помилка при збереженні змін')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTour = async () => {
    if (!editingTour) return
    if (!confirm('Ви впевнені, що хочете видалити цей тур та всі його завдання?')) return
    setDeleting(true)

    try {
      const res = await fetch(`/api/tours/${editingTour.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await fetchTours()
        setEditingTour(null)
      } else {
        alert('Не вдалося видалити тур')
      }
    } catch (err) {
      console.error('Error deleting tour:', err)
      alert('Помилка при видаленні туру')
    } finally {
      setDeleting(false)
    }
  }

  const handleRegisterWebhook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customBotToken) {
      setRegisterStatus({ type: 'error', message: 'Введіть токен бота' })
      return
    }

    setRegistering(true)
    setRegisterStatus({ type: 'idle', message: '' })

    try {
      const siteUrl = window.location.origin
      const webhookUrl = `${siteUrl}/api/telegram/webhook`
      
      const res = await fetch(`https://api.telegram.org/bot${customBotToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`)
      const data = await res.json()

      if (data.ok) {
        setRegisterStatus({
          type: 'success',
          message: 'Вебхук успішно зареєстровано! Бот готовий до роботи.'
        })
      } else {
        setRegisterStatus({
          type: 'error',
          message: `Помилка реєстрації: ${data.description || 'Невідома помилка'}`
        })
      }
    } catch (err: any) {
      setRegisterStatus({
        type: 'error',
        message: `Помилка мережі: ${err.message || 'Не вдалося надіслати запит'}`
      })
    } finally {
      setRegistering(false)
    }
  }

  const filteredTours = tours.filter(tour => {
    const query = searchQuery.toLowerCase()
    return (
      tour.clientName.toLowerCase().includes(query) ||
      tour.destination.toLowerCase().includes(query)
    )
  })

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      return `${day}.${month}.${year}`
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] flex flex-col font-sans">
      <Navigation />
      
      {/* Spacer for fixed navigation */}
      <div className="h-24"></div>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-[5%] py-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight text-glow">
              Панель Управління
            </h1>
            <p className="text-slate-400 mt-2 text-sm">
              Внутрішній органайзер дедлайнів Glorious Travel (Web + Telegram)
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchTours} 
              className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
              title="Оновити дані"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <Link 
              href="/dashboard/add"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Додати тур</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start mb-12">
          
          {/* Main Table Container (3 columns) */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Search Filter */}
            <div className="glass-card p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Пошук за ім'ям клієнта або напрямком..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-slate-500 w-full text-sm"
              />
            </div>

            {/* Tours Table */}
            <div className="glass rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                  <p>Завантаження турів...</p>
                </div>
              ) : filteredTours.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                  <p className="text-lg">Тури не знайдені</p>
                  <p className="text-sm text-slate-500">Додайте новий тур за допомогою кнопки вгорі або через Telegram бота</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-900/60">
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Клієнт / Напрямок</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400">Виліт / Джерело</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400 w-[50%]">Завдання та дедлайни</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Дії</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-slate-950/40">
                      {filteredTours.map(tour => {
                        const sortedTasks = [...tour.tasks].sort((a, b) => 
                          new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime()
                        )
                        return (
                          <tr key={tour.id} className="hover:bg-white/[0.02] transition-colors">
                            
                            {/* Client & Destination */}
                            <td className="py-5 px-6">
                              <div className="font-bold text-white text-base flex items-center gap-2">
                                <User className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                {tour.clientName}
                              </div>
                              <div className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                                {tour.destination}
                              </div>
                            </td>

                            {/* Departure & Source */}
                            <td className="py-5 px-6">
                              <div className="text-slate-200 text-sm flex items-center gap-1.5 font-medium">
                                <Calendar className="w-4 h-4 text-pink-400 flex-shrink-0" />
                                {formatDate(tour.departureDate)}
                              </div>
                              <div className="mt-1">
                                <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                  tour.source === 'telegram' 
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                }`}>
                                  {tour.source === 'telegram' ? 'Telegram' : 'Web панель'}
                                </span>
                              </div>
                            </td>

                            {/* Tasks Status */}
                            <td className="py-5 px-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {sortedTasks.map(task => {
                                  const isCompleted = task.status === 'COMPLETED'
                                  const isUpdating = updatingTaskId === task.id
                                  const isDeadlinePassed = new Date(task.deadlineDate).getTime() <= new Date().getTime() && !isCompleted

                                  return (
                                    <button
                                      key={task.id}
                                      onClick={() => handleToggleTaskStatus(task.id, task.status)}
                                      disabled={isUpdating}
                                      className={`flex flex-col text-left p-2.5 rounded-xl border transition-all relative group overflow-hidden ${
                                        isCompleted 
                                          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10' 
                                          : isDeadlinePassed
                                          ? 'bg-rose-500/5 border-rose-500/35 text-rose-400 hover:bg-rose-500/10'
                                          : 'bg-slate-900/50 border-white/5 text-slate-300 hover:border-indigo-500/30'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between w-full gap-2">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wide opacity-80 truncate max-w-[100px]" title={task.taskName}>
                                          {task.taskName}
                                        </span>
                                        {isUpdating ? (
                                          <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                                        ) : isCompleted ? (
                                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                        ) : isDeadlinePassed ? (
                                          <AlertCircle className="w-3.5 h-3.5 text-rose-400 animate-pulse flex-shrink-0" />
                                        ) : (
                                          <Clock className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0" />
                                        )}
                                      </div>
                                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                                        до {formatDate(task.deadlineDate)}
                                      </div>
                                      {task.isNotified && !isCompleted && (
                                        <span className="absolute bottom-1 right-2 text-[8px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                                          Сповіщено
                                        </span>
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </td>

                            {/* Actions Column */}
                            <td className="py-5 px-6 text-right">
                              <button
                                onClick={() => startEditTour(tour)}
                                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all text-slate-400 inline-flex items-center justify-center"
                                title="Редагувати тур"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Configuration sidebar (1 column) */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                <span>Статистика</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-xs">Всього турів</div>
                  <div className="text-2xl font-black text-white mt-1">{tours.length}</div>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-xs">Активні задачі</div>
                  <div className="text-2xl font-black text-indigo-400 mt-1">
                    {tours.reduce((acc, tour) => 
                      acc + tour.tasks.filter(t => t.status === 'PENDING').length, 0
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Telegram Webhook Setup helper */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Send className="w-5 h-5 text-sky-400" />
                <span>Налаштування бота</span>
              </h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                Зареєструйте вебхук для вашого Telegram-бота, щоб отримувати команди миттєво.
              </p>
              
              <form onSubmit={handleRegisterWebhook} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Токен Telegram бота
                  </label>
                  <input
                    type="password"
                    placeholder="Введіть 123456:ABC-DEF..."
                    value={customBotToken}
                    onChange={e => setCustomBotToken(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={registering}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/5"
                >
                  {registering ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Зареєструвати вебхук</span>
                  )}
                </button>
              </form>

              {registerStatus.message && (
                <div className={`mt-3 p-3 rounded-xl border text-[11px] leading-snug flex gap-2 ${
                  registerStatus.type === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}>
                  <div className="mt-0.5">
                    {registerStatus.type === 'success' ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  </div>
                  <div>{registerStatus.message}</div>
                </div>
              )}
            </div>

            {/* Instruction Card */}
            <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-indigo-500/10 rounded-2xl p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-indigo-400 mb-2">Telegram Формат</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Менеджер може додавати тури за допомогою команди бота:
              </p>
              <div className="bg-slate-950/80 p-2.5 rounded-xl text-[10px] font-mono border border-indigo-500/20 text-indigo-200 select-all mb-2">
                /add Сидоренко Анна | Єгипет, Шарм | 15.12.2026
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Обов&apos;язково заповніть <code className="text-slate-400">TELEGRAM_MANAGER_CHAT_ID</code> у конфігурації сервера, щоб обмежити доступ лише авторизованим менеджерам.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Edit Tour Modal */}
      {editingTour && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-card max-w-2xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl flex flex-col gap-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Редагувати тур та завдання
              </h2>
              <button 
                onClick={() => setEditingTour(null)} 
                className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="space-y-6">
              {/* Tour Main Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Клієнт</label>
                  <input 
                    type="text" 
                    value={editClientName} 
                    onChange={e => setEditClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1.5"
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Напрямок</label>
                  <input 
                    type="text" 
                    value={editDestination} 
                    onChange={e => setEditDestination(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1.5"
                    required 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Дата вильоту</label>
                  <input 
                    type="date" 
                    value={editDepartureDate} 
                    onChange={e => setEditDepartureDate(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 mt-1.5"
                    required 
                  />
                </div>
              </div>

              {/* Tasks Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Завдання та дедлайни
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddEditTask}
                    className="flex items-center gap-1.5 text-xs bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-600/20 hover:border-indigo-500/45 transition-all font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Додати завдання</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                  {editTasks.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">Немає призначених завдань</p>
                  ) : (
                    editTasks.map((task) => {
                      const isCustom = task.taskType === 'custom'
                      return (
                        <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/60 border border-white/5 p-3 rounded-xl">
                          {/* Task Name */}
                          <div className="flex-1 w-full">
                            {isCustom ? (
                              <input 
                                type="text" 
                                value={task.taskName} 
                                placeholder="Назва завдання (напр. Віза)"
                                onChange={e => handleEditTaskName(task.id, e.target.value)}
                                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                required
                              />
                            ) : (
                              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide pl-2">
                                {task.taskName}
                              </span>
                            )}
                          </div>

                          {/* Task Deadline */}
                          <div className="w-full sm:w-[180px]">
                            <input 
                              type="date" 
                              value={task.deadlineDate} 
                              onChange={e => handleEditTaskDate(task.id, e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                              required
                            />
                          </div>

                          {/* Delete Button (Only for Custom Tasks) */}
                          {isCustom ? (
                            <button
                              type="button"
                              onClick={() => handleRemoveEditTask(task.id)}
                              className="p-1.5 bg-rose-500/10 border border-rose-500/25 rounded-lg hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                              title="Видалити завдання"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-wider select-none">
                              сист.
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleDeleteTour}
                  disabled={deleting || saving}
                  className="flex items-center gap-2 bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600/20 hover:border-rose-500/45 text-rose-400 px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-full sm:w-auto justify-center"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  <span>Видалити тур</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setEditingTour(null)}
                    className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-colors w-full sm:w-auto"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={saving || deleting}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all w-full sm:w-auto justify-center"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Зберегти</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
