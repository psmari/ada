import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ConfigTab from './ConfigTab'
import StudioTab from './StudioTab'

const TabSystem: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'config' | 'studio'>('studio')

  // Lê o parâmetro 'tab' da URL
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'config' || tab === 'studio') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (tab: 'config' | 'studio') => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  return (
    <div className="pt-0">
      {/* Abas Principais */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            <button
              onClick={() => handleTabChange('config')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'config'
                  ? 'bg-ada-red text-white shadow-lg'
                  : 'text-gray-600 hover:text-ada-red hover:bg-gray-100'
              }`}
            >
              Configurações
            </button>
            <button
              onClick={() => handleTabChange('studio')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'studio'
                  ? 'bg-ada-red text-white shadow-lg'
                  : 'text-gray-600 hover:text-ada-red hover:bg-gray-100'
              }`}
            >
              Estúdio
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo das Abas */}
      <div className="min-h-screen bg-gray-50">
        {activeTab === 'config' && <ConfigTab />}
        {activeTab === 'studio' && <StudioTab />}
      </div>
    </div>
  )
}

export default TabSystem
