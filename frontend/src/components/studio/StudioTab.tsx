import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VerDna from './VerDna'
import Conversas from './Conversas'
import NovaConversa from './NovaConversa'

const StudioTab: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeSubTab, setActiveSubTab] = useState<'ver-dna' | 'conversas' | 'nova-conversa'>('conversas')

  // Lê o parâmetro 'subtab' da URL
  useEffect(() => {
    const subtab = searchParams.get('subtab')
    if (subtab === 'ver-dna' || subtab === 'conversas' || subtab === 'nova-conversa') {
      setActiveSubTab(subtab)
    }
  }, [searchParams])

  const handleSubTabChange = (subtab: 'ver-dna' | 'conversas' | 'nova-conversa') => {
    setActiveSubTab(subtab)
    setSearchParams({ tab: 'studio', subtab })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Sub-abas */}
      <div className="bg-white rounded-t-xl shadow-lg">
        <div className="flex space-x-1 p-4 border-b border-gray-200">
          <button
            onClick={() => handleSubTabChange('ver-dna')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeSubTab === 'ver-dna'
                ? 'bg-ada-red text-white shadow-lg'
                : 'text-gray-600 hover:text-ada-red hover:bg-gray-100'
            }`}
          >
            Ver DNA
          </button>
          <button
            onClick={() => handleSubTabChange('conversas')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeSubTab === 'conversas'
                ? 'bg-ada-red text-white shadow-lg'
                : 'text-gray-600 hover:text-ada-red hover:bg-gray-100'
            }`}
          >
            Conversas
          </button>
          <button
            onClick={() => handleSubTabChange('nova-conversa')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeSubTab === 'nova-conversa'
                ? 'bg-ada-red text-white shadow-lg'
                : 'text-gray-600 hover:text-ada-red hover:bg-gray-100'
            }`}
          >
            Nova Conversa (in future)
          </button>
        </div>

        {/* Conteúdo das sub-abas */}
        <div className="p-6">
          {activeSubTab === 'ver-dna' && <VerDna />}
          {activeSubTab === 'conversas' && <Conversas />}
          {activeSubTab === 'nova-conversa' && <NovaConversa />}
        </div>
      </div>
    </div>
  )
}

export default StudioTab
