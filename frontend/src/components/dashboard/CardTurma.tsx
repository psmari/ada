import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTurma } from '../../contexts/TurmaContext'

interface CardTurmaProps {
  id: string
  titulo: string
  subtitulo: string
}

const CardTurma: React.FC<CardTurmaProps> = ({ titulo, subtitulo }) => {
  const navigate = useNavigate()
  const { carregarTurma } = useTurma()

  const handleCardClick = async () => {
    try {
      // Carrega os dados específicos da turma
      await carregarTurma(titulo)
      // Navega para o estúdio na aba conversas
      navigate('/studio?tab=studio&subtab=conversas')
    } catch (error) {
      console.error('Erro ao carregar turma:', error)
      alert('Erro ao carregar dados da turma. Tente novamente.')
    }
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-red-100 hover:bg-red-200 rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
      style={{ backgroundColor: '#FAD4D4' }}
    >
      <div className="flex flex-col h-full">
        {/* Conteúdo Principal */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-black mb-2 group-hover:text-ada-red transition-colors duration-300">
            {titulo}
          </h3>
          <p className="text-black text-sm opacity-80">
            {subtitulo}
          </p>
        </div>

      </div>
    </div>
  )
}

export default CardTurma
