import React, { useState, useEffect } from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import FilterBar from '../components/dashboard/FilterBar'
import CardTurma from '../components/dashboard/CardTurma'
import Pagination from '../components/dashboard/Pagination'
import { api, TurmaData } from '../services/api'

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [turmas, setTurmas] = useState<TurmaData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const totalPages = Math.ceil(turmas.length / 8) // 8 turmas por página

  // Carrega turmas do servidor
  useEffect(() => {
    const carregarTurmas = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const turmasData = await api.getTurmas()
        setTurmas(turmasData)
      } catch (err) {
        console.error('Erro ao carregar turmas:', err)
        setError('Erro ao carregar turmas. Tente novamente mais tarde.')
        // Fallback para dados mockados se a API falhar
        setTurmas([
          {
            id: '1',
            nome: 'Python - 25/6110',
            cod_turma: 'TURMA-001',
            materia: 'Programação Python',
            dna: 'Turma de programação Python com foco em desenvolvimento web.'
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }

    carregarTurmas()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Filtra turmas para a página atual
  const turmasPaginadas = turmas.slice((currentPage - 1) * 8, currentPage * 8)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <FilterBar />

      {/* Grid de Turmas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ada-red mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando turmas...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-ada-red text-white px-4 py-2 rounded-lg hover:bg-ada-red-dark transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : turmasPaginadas.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-gray-600 mb-4">Nenhuma turma encontrada.</p>
              <p className="text-sm text-gray-500">Crie sua primeira turma clicando no botão "Criar Turma".</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {turmasPaginadas.map((turma) => (
                <CardTurma
                  key={turma.id}
                  id={turma.id!}
                  titulo={turma.nome}
                  subtitulo={turma.materia}
                />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard
