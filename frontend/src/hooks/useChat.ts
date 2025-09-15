import { useState, useCallback } from 'react'
import { api, ChatMessage, StudioTalkRequest, StudioTalkResponse } from '../services/api'

interface UseChatProps {
  dnaTurma: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (message: string) => Promise<void>
  clearChat: () => void
}

export const useChat = ({ dnaTurma }: UseChatProps): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: 'Olá! Sou a ADA, sua assistente de criação de conteúdo. Posso ajudar você a criar exercícios, cenários e materiais personalizados para a sua turma. Como posso te ajudar hoje?'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return

    // Adiciona mensagem do usuário
    const userMessage: ChatMessage = {
      role: 'user',
      content: message.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const requestData: StudioTalkRequest = {
        dna_turma: dnaTurma,
        historico_conversa: messages,
        nova_mensagem: message.trim()
      }

      const response: StudioTalkResponse = await api.studioTalk(requestData)

      // Adiciona resposta da IA
      const aiMessage: ChatMessage = {
        role: 'model',
        content: response.respostaIA
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (err: any) {
      console.error('Erro ao enviar mensagem:', err)
      const errorMessage = err.response?.data?.detail || 'Erro ao processar sua mensagem. Tente novamente.'
      setError(errorMessage)
      
      // Adiciona mensagem de erro
      const errorMsg: ChatMessage = {
        role: 'model',
        content: `Desculpe, ocorreu um erro: ${errorMessage}`
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }, [dnaTurma, messages, isLoading])

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: 'model',
        content: 'Olá! Sou a ADA, sua assistente de criação de conteúdo. Posso ajudar você a criar exercícios, cenários e materiais personalizados para a sua turma. Como posso te ajudar hoje?'
      }
    ])
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  }
}

export default useChat
