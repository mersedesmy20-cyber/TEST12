'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Destination } from '@/types/destination'

interface ModalContextType {
  isOpen: boolean
  isQuizOpen: boolean
  selectedDestination: Destination | null
  openModal: (destination: Destination) => void
  closeModal: () => void
  openQuiz: () => void
  closeQuiz: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null)

  const openModal = (destination: Destination) => {
    setSelectedDestination(destination)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedDestination(null)
    document.body.style.overflow = ''
  }

  const openQuiz = () => {
    setIsQuizOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeQuiz = () => {
    setIsQuizOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        isQuizOpen,
        selectedDestination,
        openModal,
        closeModal,
        openQuiz,
        closeQuiz
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

