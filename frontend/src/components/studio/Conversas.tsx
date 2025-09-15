import React, { useState, useRef } from 'react'
import useChat from '../../hooks/useChat'
import { useTurma } from '../../contexts/TurmaContext'

const Conversas: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { turmaAtual } = useTurma()
  
  // Usa o DNA da turma carregada ou fallback
  const dnaTurma = turmaAtual?.dna || "Nenhuma turma selecionada. Selecione uma turma no Dashboard para começar a conversar com a ADA."
  
  const { messages, isLoading, error, sendMessage, clearChat } = useChat({ dnaTurma })

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      await sendMessage(inputMessage)
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  // // Auto scroll para a última mensagem
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [messages])

  return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-ada-dark">
                Conversas com ADA
              </h3>
              {turmaAtual && (
                <p className="text-sm text-gray-600 mt-1">
                  Turma: <span className="font-semibold">{turmaAtual.nome}</span>
                  {turmaAtual.materia && (
                    <span className="ml-2">• {turmaAtual.materia}</span>
                  )}
                </p>
              )}
            </div>
            <button
              onClick={clearChat}
              className="text-sm text-ada-red hover:text-ada-red-dark font-medium transition-colors duration-300"
            >
              Limpar Chat
            </button>
          </div>

      {/* Área de Mensagens */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-ada-red' 
                  : 'bg-ada-gray'
              }`}>
                {message.role === 'user' ? (
                  <span className="text-white font-bold text-xs">V</span>
                ) : (
                  <span className="text-ada-red font-bold text-xs">A</span>
                )}
              </div>
              <div className={`flex-1 ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                  message.role === 'user'
                    ? 'bg-ada-red text-white'
                    : 'bg-red-100 text-gray-800'
                }`} style={message.role === 'model' ? { backgroundColor: '#FAD4D4' } : {}}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.role === 'user' ? 'Você' : 'ADA'} • agora
                </p>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-ada-gray rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-ada-red font-bold text-xs">A</span>
              </div>
              <div className="flex-1">
                <div className="bg-red-100 p-3 rounded-lg inline-block" style={{ backgroundColor: '#FAD4D4' }}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-ada-red rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-ada-red rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-ada-red rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Campo de Sugestões da ADA */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-ada-dark">
          Sugestões da ADA:
        </h4>
        <div className="flex flex-wrap gap-3">
          {[
            'Explicar um conteúdo',
            'Criar uma atividade',
            'Gerar exercícios práticos',
            'Sugerir projetos',
            'Criar cenários de uso',
            'Explicar conceitos complexos'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="bg-ada-gray hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-ada-dark font-medium px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md disabled:transform-none"
            >
              {suggestion}
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
              placeholder="Digite sua mensagem para a ADA..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ada-red focus:border-transparent outline-none transition-all duration-300 resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
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
        
        {/* Error message */}
        {error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default Conversas
