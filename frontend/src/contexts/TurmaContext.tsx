import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TurmaData } from '../services/api'

interface TurmaContextType {
  turmaAtual: TurmaData | null
  setTurmaAtual: (turma: TurmaData | null) => void
  carregarTurma: (titulo: string) => Promise<void>
  limparTurma: () => void
}

const TurmaContext = createContext<TurmaContextType | undefined>(undefined)

interface TurmaProviderProps {
  children: ReactNode
}

export const TurmaProvider: React.FC<TurmaProviderProps> = ({ children }) => {
  const [turmaAtual, setTurmaAtual] = useState<TurmaData | null>(null)

  // Carrega turma do localStorage ao inicializar
  useEffect(() => {
    const savedTurma = localStorage.getItem('currentTurma')
    if (savedTurma) {
      try {
        setTurmaAtual(JSON.parse(savedTurma))
      } catch (error) {
        console.error('Erro ao carregar turma do localStorage:', error)
        localStorage.removeItem('currentTurma')
      }
    }
  }, [])

  // Salva turma no localStorage quando muda
  useEffect(() => {
    if (turmaAtual) {
      localStorage.setItem('currentTurma', JSON.stringify(turmaAtual))
    } else {
      localStorage.removeItem('currentTurma')
    }
  }, [turmaAtual])

  const carregarTurma = async (titulo: string) => {
    try {
      const { api } = await import('../services/api')
      const turma = await api.getTurmaById(titulo)
      setTurmaAtual(turma)
    } catch (error) {
      console.error('Erro ao carregar turma:', error)
      throw error
    }
  }

  const limparTurma = () => {
    setTurmaAtual(null)
  }

  const value: TurmaContextType = {
    turmaAtual,
    setTurmaAtual,
    carregarTurma,
    limparTurma
  }

  return (
    <TurmaContext.Provider value={value}>
      {children}
    </TurmaContext.Provider>
  )
}

export const useTurma = (): TurmaContextType => {
  const context = useContext(TurmaContext)
  if (context === undefined) {
    throw new Error('useTurma deve ser usado dentro de um TurmaProvider')
  }
  return context
}

export default TurmaContext
