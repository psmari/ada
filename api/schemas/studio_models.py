from pydantic import BaseModel
from typing import List


class ChatMessage(BaseModel):
    """Define a estrutura de uma única mensagem no histórico."""
    role: str  # "user" ou "model"
    content: str

class StudioTalkRequest(BaseModel):
    """Define a estrutura do corpo da requisição (JSON de entrada)."""
    dna_turma: str
    historico_conversa: List[ChatMessage]
    nova_mensagem: str

class StudioTalkResponse(BaseModel):
    """Define a estrutura da resposta JSON de saída."""
    respostaIA: str
    historico_conversa: str