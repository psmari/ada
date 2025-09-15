import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTurma } from '../../contexts/TurmaContext'

const StudioHeader: React.FC = () => {
  const navigate = useNavigate()
  const { turmaAtual } = useTurma()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo A.D.A. */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-ada-red hover:text-ada-red-dark transition-colors duration-300 mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-ada-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="text-2xl font-bold text-ada-dark">
              <span className="text-ada-red">A</span>.<span className="text-ada-red">D</span>.<span className="text-ada-red">A</span>
            </div>
          </div>

          {/* Título da Turma */}
          <h1 className="text-2xl font-bold text-black text-left">
            {turmaAtual?.nome || 'Nenhuma turma selecionada'}
            {turmaAtual?.materia && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                - {turmaAtual.materia}
              </span>
            )}
          </h1>
        </div>
      </div>
    </header>
  )
}

export default StudioHeader
