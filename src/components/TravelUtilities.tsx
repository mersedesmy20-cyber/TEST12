'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Calculator, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  X, 
  Backpack,
  DollarSign,
  Euro,
  Coins
} from 'lucide-react'

// Mock rates if API fails or for speed, but ideally we'd fetch
const RATES = {
  USD: 41.5,
  EUR: 44.2,
  PLN: 10.3,
  EGP: 0.85,
  TRY: 1.25
}

export default function TravelUtilities() {
  const [activeTab, setActiveTab] = useState<'calc' | 'list'>('calc')
  
  // Calculator State
  const [amount, setAmount] = useState<string>('100')
  const [fromCurrency, setFromCurrency] = useState<keyof typeof RATES>('USD')
  const [toCurrency, setToCurrency] = useState<'UAH'>('UAH')
  
  // Packing List State
  const [items, setItems] = useState<{id: string, text: string, checked: boolean}[]>([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('packing-list')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    } else {
      // Default items
      setItems([
        { id: '1', text: 'Закордонний паспорт', checked: false },
        { id: '2', text: 'Страховка', checked: false },
        { id: '3', text: 'Зарядка та павербанк', checked: false },
        { id: '4', text: 'Аптечка', checked: false }
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('packing-list', JSON.stringify(items))
  }, [items])

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    setItems([{ id: Date.now().toString(), text: newItem, checked: false }, ...items])
    setNewItem('')
  }

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const convert = () => {
    const val = parseFloat(amount) || 0
    return (val * RATES[fromCurrency]).toFixed(2)
  }

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-[5%] relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-sm block mb-4"
          >
            Travel Tools
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Корисні інструменти для мандрівника
          </motion.h2>
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveTab('calc')}
              className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'calc' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Coins size={18} />
              <span>Конвертер валют</span>
            </button>
            <button 
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'list' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Backpack size={18} />
              <span>Чек-ліст речей</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-start-3 md:col-span-8 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl">
            <AnimatePresence mode="wait">
              {activeTab === 'calc' ? (
                <motion.div
                  key="calc"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-3">
                      <label className="text-slate-400 text-sm font-bold uppercase tracking-wider px-2">Сума</label>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl font-bold focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <label className="text-slate-400 text-sm font-bold uppercase tracking-wider px-2">З валюти</label>
                      <select 
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value as any)}
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="USD">🇺🇸 USD (Долар США)</option>
                        <option value="EUR">🇪🇺 EUR (Євро)</option>
                        <option value="PLN">🇵🇱 PLN (Злотий)</option>
                        <option value="TRY">🇹🇷 TRY (Ліра)</option>
                        <option value="EGP">🇪🇬 EGP (Фунт)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                      <Calculator size={20} />
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-3xl p-8 text-center border border-white/5">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Орієнтовна сума в UAH</p>
                    <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      {convert()} ₴
                    </div>
                    <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-widest leading-relaxed">
                      * Курс є орієнтовним та може відрізнятися від банківського. 
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <form onSubmit={addItem} className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Додати щось важливе..."
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-purple-500 transition-all"
                    />
                    <button 
                      type="submit"
                      className="bg-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:bg-purple-500 transition-all hover:scale-105 active:scale-95 shrink-0"
                    >
                      <Plus size={24} />
                    </button>
                  </form>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          item.checked ? 'bg-slate-950/30 border-white/5 opacity-50' : 'bg-slate-950 border-white/10'
                        }`}
                      >
                        <div 
                          className="flex items-center gap-4 flex-1 cursor-pointer"
                          onClick={() => toggleItem(item.id)}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            item.checked ? 'bg-green-500 border-green-500' : 'border-white/20'
                          }`}>
                            {item.checked && <CheckCircle2 size={16} className="text-white" />}
                          </div>
                          <span className={`font-bold transition-all ${item.checked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {item.text}
                          </span>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-600 hover:text-red-400 p-2 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                    {items.length === 0 && (
                      <div className="text-center py-12 text-slate-600 font-bold uppercase tracking-widest">
                        Список порожній... Додайте речі!
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
    </section>
  )
}
