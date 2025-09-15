import React, { useState } from 'react'
import { api } from '../../services/api'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (dna: string) => void
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [materia, setMateria] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile)
      } else {
        alert('Por favor, selecione um arquivo CSV válido.')
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile)
      } else {
        alert('Por favor, selecione um arquivo CSV válido.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!materia.trim() || !file) {
      alert('Por favor, preencha o nome da matéria e selecione um arquivo CSV.')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('materia', materia.trim())
      formData.append('dados_brutos', file)

      const response = await api.generateDna(formData)
      
      // Atualiza a matéria no localStorage
      const savedTurma = localStorage.getItem('currentTurma')
      if (savedTurma) {
        const turmaData = JSON.parse(savedTurma)
        turmaData.materia = materia.trim()
        localStorage.setItem('currentTurma', JSON.stringify(turmaData))
      }
      
      alert('DNA da turma gerado com sucesso!')
      onSuccess(response.dna_turma)
      onClose()
      
      // Reset form
      setMateria('')
      setFile(null)
      
    } catch (error: any) {
      console.error('Erro ao gerar DNA:', error)
      const errorMessage = error.response?.data?.detail || 'Erro ao processar o arquivo. Tente novamente.'
      alert(`Erro: ${errorMessage}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    if (!isUploading) {
      onClose()
      setMateria('')
      setFile(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ada-dark">
              Gerar DNA da Turma
            </h2>
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Matéria */}
            <div>
              <label htmlFor="materia" className="block text-sm font-medium text-ada-dark mb-2">
                Nome da Matéria *
              </label>
              <input
                type="text"
                id="materia"
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
                placeholder="Ex: Gestão de Estoques, Python, Matemática..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ada-red focus:border-transparent outline-none transition-all duration-300"
                required
                disabled={isUploading}
              />
            </div>

            {/* Upload de Arquivo */}
            <div>
              <label className="block text-sm font-medium text-ada-dark mb-2">
                Arquivo CSV *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                  dragActive
                    ? 'border-ada-red bg-red-50'
                    : 'border-gray-300 hover:border-ada-red hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  <div className="w-12 h-12 bg-ada-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-ada-dark mb-2">
                    {file ? file.name : 'Clique para selecionar ou arraste um arquivo CSV'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Apenas arquivos .csv são aceitos
                  </p>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isUploading}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-ada-dark font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isUploading || !materia.trim() || !file}
                className="flex-1 bg-ada-red hover:bg-ada-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                {isUploading ? 'Processando...' : 'Gerar DNA'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadModal
