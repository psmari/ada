import React, { useState, useEffect } from 'react'
import UploadModal from './UploadModal'
import { api, TurmaData } from '../../services/api'

const ConfigTab: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [dnaData, setDnaData] = useState<string | null>(null)
  const [turmaData, setTurmaData] = useState<TurmaData | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Carrega dados da turma do localStorage
  useEffect(() => {
    const savedTurma = localStorage.getItem('currentTurma')
    if (savedTurma) {
      setTurmaData(JSON.parse(savedTurma))
    }
  }, [])

  const handleUploadSuccess = async (dna: string) => {
    setDnaData(dna)
    
    // Atualiza os dados da turma com o DNA gerado
    if (turmaData) {
      const updatedTurma = {
        ...turmaData,
        dna: dna
      }
      
      setTurmaData(updatedTurma)
      
      // Salva no localStorage
      localStorage.setItem('currentTurma', JSON.stringify(updatedTurma))
      
      // Persiste na API
      try {
        setIsSaving(true)
        await api.saveTurma(updatedTurma)
        alert('Turma salva com sucesso!')
      } catch (error) {
        console.error('Erro ao salvar turma:', error)
        alert('Erro ao salvar turma. Os dados foram salvos localmente.')
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-ada-dark mb-8 text-center">
          Configurações da Turma
        </h2>

        {/* Card DNA da Turma */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            {/* Área central com ícone de + */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-32 h-32 mx-auto mb-6 bg-ada-gray rounded-full flex items-center justify-center hover:bg-red-100 transition-colors duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-ada-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </button>

            {/* Texto embaixo */}
            <h3 className="text-2xl font-bold text-ada-dark mb-2">
              DNA da Turma
            </h3>
            <p className="text-gray-600 mb-4">
              {turmaData?.nome ? `${turmaData.nome}` : 'Turma não configurada'}
            </p>
            
            {/* Exibir DNA se disponível */}
            {(dnaData || turmaData?.dna) && (
              <div className="mt-6 p-4 bg-ada-gray rounded-lg text-left">
                <h4 className="font-semibold text-ada-dark mb-2">Análise da Turma:</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {dnaData || turmaData?.dna}
                </p>
                {isSaving && (
                  <div className="mt-2 text-sm text-ada-red">
                    Salvando dados...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cards adicionais para futuras funcionalidades */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-ada-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-ada-dark mb-2">
              Inteligência do Curso (in future)
            </h4>
            <p className="text-gray-600 text-sm">
            Em breve você poderá visualizar e gerenciar o perfil completo da sua turma.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-ada-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-ada-dark mb-2">
              Relatórios (in future)
            </h4>
            <p className="text-gray-600 text-sm">
              Visualize relatórios detalhados
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Upload */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  )
}

export default ConfigTab
