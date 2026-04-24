'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  RefreshCw, 
  Globe, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info
} from 'lucide-react';
import Link from 'next/link';

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const TRIVIA_QUESTIONS: Question[] = [
  { 
    id: 1, 
    question: "Яка країна відома як 'Країна ранкової свіжості'?", 
    options: ["Японія", "Південна Корея", "В'єтнам", "Таїланд"], 
    correct: 1,
    explanation: "Назва 'Чосон' (давня назва Кореї) буквально означає 'Країна ранкової свіжості'."
  },
  { 
    id: 2, 
    question: "Де знаходиться 'Загублене місто інків' Мачу-Пікчу?", 
    options: ["Чилі", "Бразилія", "Перу", "Мексика"], 
    correct: 2,
    explanation: "Мачу-Пікчу розташований на вершині гірського хребта в Андах у Перу."
  },
  { 
    id: 3, 
    question: "Яка європейська столиця стоїть на 14 островах?", 
    options: ["Амстердам", "Стокгольм", "Венеція", "Копенгаген"], 
    correct: 1,
    explanation: "Стокгольм побудований на 14 островах, де Балтійське море зустрічається з озером Меларен."
  },
  { 
    id: 4, 
    question: "В якій країні знаходиться найбільший храм у світі — Ангкор-Ват?", 
    options: ["Індія", "Індонезія", "Камбоджа", "Лаос"], 
    correct: 2,
    explanation: "Ангкор-Ват — велетенський храмовий комплекс у Камбоджі, присвячений богу Вішну."
  },
  {
    id: 5,
    question: "Який острів називають 'Островом Богів'?",
    options: ["Пхукет", "Мальдіви", "Балі", "Санторіні"],
    correct: 2,
    explanation: "Балі відомий своєю унікальною духовною культурою та тисячами храмів."
  }
];

export default function GamePage() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === TRIVIA_QUESTIONS[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setGameState('results');
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden pt-24 pb-12">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">На головну</span>
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-full border border-white/5">
            <Gamepad2 size={18} className="text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Travel Trivia</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[40px] text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Globe size={48} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Як добре ти знаєш <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">наш світ?</span>
              </h1>
              <p className="text-slate-400 max-w-lg mx-auto mb-12 leading-relaxed">
                Перевір свої знання про найкращі туристичні напрямки. Дай відповідь на 5 запитань та доведи, що ти справжній мандрівник!
              </p>
              <button
                onClick={startGame}
                className="group relative px-12 py-5 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                   ПОЧАТИ ГРУ <Sparkles size={20} className="text-purple-600" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Progress Bar */}
              <div className="bg-slate-900/40 backdrop-blur-md p-2 rounded-full border border-white/5 flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / TRIVIA_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  />
                </div>
                <span className="text-xs font-bold px-4 text-slate-400">Питання {currentQuestion + 1}/{TRIVIA_QUESTIONS.length}</span>
              </div>

              {/* Question Card */}
              <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Trophy size={120} />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-tight relative z-10">
                  {TRIVIA_QUESTIONS[currentQuestion].question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TRIVIA_QUESTIONS[currentQuestion].options.map((option, idx) => {
                    const isCorrect = idx === TRIVIA_QUESTIONS[currentQuestion].correct;
                    const isSelected = selectedOption === idx;
                    
                    let buttonClass = "bg-slate-800/50 hover:bg-slate-800 border-white/5";
                    if (isAnswered) {
                      if (isCorrect) buttonClass = "bg-green-500/20 border-green-500/50 text-green-400";
                      else if (isSelected) buttonClass = "bg-red-500/20 border-red-500/50 text-red-400";
                      else buttonClass = "bg-slate-800/30 border-white/5 opacity-50";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`group p-6 rounded-2xl border transition-all text-left flex items-start gap-4 ${buttonClass} ${!isAnswered ? 'hover:-translate-y-1' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold transition-colors ${isSelected ? 'bg-white text-slate-950' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="font-medium text-lg">{option}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-10 p-6 bg-purple-500/10 rounded-3xl border border-purple-500/20 flex gap-4 items-start"
                    >
                      <div className="p-2 bg-purple-500/20 rounded-xl">
                        <Info size={20} className="text-purple-400" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        {TRIVIA_QUESTIONS[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[40px] text-center shadow-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-orange-500/20 transform rotate-12">
                <Trophy size={48} className="text-white" />
              </div>

              <h2 className="text-4xl font-black mb-2 tracking-tight">Ваш результат:</h2>
              <div className="text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                {score} / {TRIVIA_QUESTIONS.length}
              </div>

              <div className="max-w-md mx-auto mb-12">
                {score === TRIVIA_QUESTIONS.length ? (
                  <div className="space-y-4">
                    <p className="text-green-400 font-bold flex items-center justify-center gap-2">
                       <CheckCircle2 size={20} /> СПРАВЖНІЙ ТРЕВЕЛ-ГУРУ!
                    </p>
                    <p className="text-slate-400 text-sm">Неймовірно! Ви знаєте наш світ як свої п'ять пальців.</p>
                  </div>
                ) : score >= 3 ? (
                  <div className="space-y-4">
                    <p className="text-blue-400 font-bold flex items-center justify-center gap-2">
                       <Globe size={20} /> ВПЕВНЕНИЙ МАНДРІВНИК!
                    </p>
                    <p className="text-slate-400 text-sm">Гарний результат, але завжди є куди рости та подорожувати.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-orange-400 font-bold flex items-center justify-center gap-2">
                       <XCircle size={20} /> ЧАС ВІДКРИВАТИ СВІТ!
                    </p>
                    <p className="text-slate-400 text-sm">Можливо, прийшов час для нової пригоди з Glorious Travel?</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCw size={20} /> СПРОБУВАТИ ЩЕ РАЗ
                </button>
                <Link
                  href="/ai-assistant"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-3"
                >
                  СПЛАНУВАТИ ТУР <ArrowLeft className="rotate-180" size={20} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <div className="mt-12 text-center text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
          Glorious Travel Experience • interactive entertainment
        </div>
      </div>
    </div>
  );
}
