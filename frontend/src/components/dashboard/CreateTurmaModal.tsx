import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CreateTurmaModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateTurmaModal: React.FC<CreateTurmaModalProps> = ({ isOpen, onClose }) => {
  const [nomeTurma, setNomeTurma] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nomeTurma.trim()) {
      alert('Por favor, insira o nome da turma.')
      return
    }

    setIsCreating(true)

    try {
      // Salva o nome da turma no localStorage
      const turmaData = {
        nome: nomeTurma.trim(),
        cod_turma: `TURMA-${Date.now()}`, // Gera código único
        materia: '',
        dna: ''
      }
      
      localStorage.setItem('currentTurma', JSON.stringify(turmaData))
      
      // Navega para o estúdio na aba configurações
      navigate('/studio?tab=config')
      
      // Fecha o modal
      onClose()
      
    } catch (error) {
      console.error('Erro ao criar turma:', error)
      alert('Erro ao criar turma. Tente novamente.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    if (!isCreating) {
      onClose()
      setNomeTurma('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ada-dark">
              Criar Nova Turma
            </h2>
            <button
              onClick={handleClose}
              disabled={isCreating}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome da Turma */}
            <div>
              <label htmlFor="nomeTurma" className="block text-sm font-medium text-ada-dark mb-2">
                Nome da Turma *
              </label>
              <input
                type="text"
                id="nomeTurma"
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
                placeholder="Ex: Python 25/6110, Matemática Básica..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ada-red focus:border-transparent outline-none transition-all duration-300"
                required
                disabled={isCreating}
              />
              <p className="text-xs text-gray-500 mt-1">
                Este nome será usado para identificar a turma no sistema
              </p>
            </div>

            {/* Informações */}
            <div className="bg-ada-gray rounded-lg p-4">
              <h4 className="font-semibold text-ada-dark mb-2">Próximos passos:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Será redirecionado para o Estúdio</li>
                <li>• Configure a matéria e faça upload do CSV</li>
                <li>• Gere o DNA da turma</li>
                <li>• Comece a criar conteúdo personalizado</li>
              </ul>
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isCreating}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-ada-dark font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isCreating || !nomeTurma.trim()}
                className="flex-1 bg-ada-red hover:bg-ada-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                {isCreating ? 'Criando...' : 'Criar Turma'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTurmaModal
