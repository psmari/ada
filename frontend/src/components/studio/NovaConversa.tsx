import React, { useState } from 'react'

const NovaConversa: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      console.log('Nova conversa:', inputMessage)
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-ada-dark mb-6">
        Nova Conversa
      </h3>

      {/* Instruções */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Dica:</strong> Comece uma nova conversa com a ADA para criar conteúdo personalizado. 
              Seja específico sobre o que você precisa para sua turma.
            </p>
          </div>
        </div>
      </div>

      {/* Área de Chat Vazia */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-ada-gray rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-ada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-ada-dark mb-2">
          Inicie uma nova conversa
        </h4>
        <p className="text-gray-600">
          Digite sua mensagem abaixo para começar a conversar com a ADA
        </p>
      </div>

      {/* Sugestões de Início */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-ada-dark">
          Ideias para começar:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Criar exercícios de Python para iniciantes',
            'Sugerir projetos práticos de automação',
            'Explicar conceitos de programação orientada a objetos',
            'Criar cenários de uso real para Python',
            'Desenvolver atividades de análise de dados',
            'Sugerir ferramentas e bibliotecas úteis'
          ].map((idea, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(idea)}
              className="bg-white hover:bg-ada-gray border border-gray-200 hover:border-ada-red text-ada-dark font-medium px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md text-left"
            >
              {idea}
            </button>
          ))}
        </div>
      </div>

      {/* Caixa de Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem para iniciar uma nova conversa com a ADA..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ada-red focus:border-transparent outline-none transition-all duration-300 resize-none"
              rows={4}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-ada-red hover:bg-ada-red-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Pressione Enter para enviar ou Shift+Enter para nova linha
        </p>
      </div>
    </div>
  )
}

export default NovaConversa
