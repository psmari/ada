import axios from 'axios'

// Em desenvolvimento, usa o proxy do Vite
// Em produção, usa a URL direta
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_BASE_URL = isDevelopment
  ? '' // Proxy do Vite redireciona /api para https://ada-y5en.onrender.com
  : 'https://ada-y5en.onrender.com'

export interface DnaRequest {
  materia: string
  dados_brutos: File
}

export interface DnaResponse {
  dna_turma: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  content: string
}

export interface StudioTalkRequest {
  dna_turma: string
  historico_conversa: ChatMessage[]
  nova_mensagem: string
}

export interface StudioTalkResponse {
  respostaIA: string
  historico_conversa: string
}

export interface TurmaData {
  id?: string
  nome: string
  cod_turma: string
  materia: string
  dna: string
}

export const api = {
  // Gerar DNA da turma
  generateDna: async (formData: FormData): Promise<DnaResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/gerar-dna`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Studio Talk - Chat com IA
  studioTalk: async (data: StudioTalkRequest): Promise<StudioTalkResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/studio/talk`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },

  // Salvar dados da turma
  saveTurma: async (data: TurmaData): Promise<void> => {
    const response = await axios.put(`${API_BASE_URL}/api/turmas`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },

  // Buscar todas as turmas
  getTurmas: async (): Promise<TurmaData[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/turmas`)
    return response.data
  },

  // Buscar turma por ID
  getTurmaById: async (id: string): Promise<TurmaData> => {
    const response = await axios.get(`${API_BASE_URL}/api/turmas?search=${id}&page=1&limit=20`)
    const data = response.data
    
    // A API retorna um array, então pegamos o primeiro item
    if (Array.isArray(data) && data.length > 0) {
      return data[0]
    }
    
    // Se não encontrou, retorna dados mockados
    return {
      id: id,
      nome: `Turma ${id}`,
      cod_turma: `TURMA-${id}`,
      materia: 'Matéria Padrão',
      dna: 'Esta é uma turma de exemplo. O DNA da turma será gerado quando você fizer upload de um arquivo CSV com os dados dos alunos.'
    }
  }
}

export default api
