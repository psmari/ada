import React, { useState } from 'react'
import CreateTurmaModal from './CreateTurmaModal'

const FilterBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [filterValue, setFilterValue] = useState('Value')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleSearch = () => {
    // Implementar lógica de busca
    console.log('Buscar:', searchValue)
  }

  const handleClearSearch = () => {
    setSearchValue('')
  }

  const handleCreateTurma = () => {
    setIsCreateModalOpen(true)
  }

  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Título e Filtros */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-black">
              Suas turmas
            </h2>
            
            {/* Dropdown Filter */}
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ada-red focus:border-transparent outline-none transition-all duration-300 bg-white"
            >
              <option value="Todas">Todas</option>
              <option value="Ativas">Ativas</option>
              <option value="Inativas">Inativas</option>
            </select>
          </div>

          {/* Barra de Busca e Botão */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Barra de Busca */}
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar turmas..."
                className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ada-red focus:border-transparent outline-none transition-all duration-300"
              />
              {searchValue && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-ada-red hover:text-ada-red-dark transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Botão Criar Turma */}
            <button 
              onClick={handleCreateTurma}
              className="bg-ada-red hover:bg-ada-red-dark text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              Criar Turma
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Criação de Turma */}
      <CreateTurmaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

export default FilterBar
