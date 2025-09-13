import os
import google.generativeai as genai
from fastapi import FastAPI, Form, UploadFile, File, HTTPException, status
from pydantic import BaseModel
from typing import Annotated, List

try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except KeyError:
    raise RuntimeError(
        "A variável de ambiente GOOGLE_API_KEY não foi definida. "
        "Por favor, configure sua chave de API do Google."
    )
model = genai.GenerativeModel('gemini-2.5-pro')

app = FastAPI()

@app.get('/')
async def root():
    return {'message': 'Hello World'}

class DnaResponse(BaseModel):
    dna_turma: str

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

def montar_prompt(materia: str, conteudo_csv: str) -> str:
    """
    Formata o prompt final que será enviado para a API do Gemini,
    inserindo o nome da matéria e o conteúdo da planilha.
    """
    return f"""
        Você é um Analista de Dados Pedagógicos especializado em ensino técnico. Você recebeu dados brutos de uma pesquisa aplicada a uma turma do SENAI, no formato de planilha (CSV). Sua tarefa é analisar esses dados e gerar um parágrafo conciso e acionável chamado 'DNA da Turma'.

        Instruções para a Análise:
        Nível de Experiência: Analise as respostas do csv identifique a distribuição em porcentagem (ex: '80% iniciante', 'grupo bem dividido entre novatos e experientes (40% e 60%)') na matéria de {materia}.
        Afinidades Dominantes: Identifique as 2 ou 3 áreas de interesse ou experiência prévia mais citadas nas respostas de múltipla escolha.
        Padrões Ocultos: Análise as respostas abertas ('conte uma vez que consertou algo') e encontre temas recorrentes (ex: 'muitos relatam experiências com consertos eletrônicos', 'vários mencionam projetos com madeira').
        Estilo de Aprendizagem: Determine qual o estilo de aprendizagem (Visual, Auditivo, Leitura, Cinestésico) predominante na turma.
        Marcas e especificidades: Cite marcas que foram mencionada na pesquisa, liste coisas específicas da turma.
        Formato do Resultado: Apresente a análise final em um único parágrafo de texto, começando com 'DNA da Turma:'. O texto deve ser prático, direto e fácil para um instrutor entender e usar imediatamente.
        
        Esse são os dados do csv: 
        '''
        {conteudo_csv}
        '''
    """


@app.post(
    '/api/gerar-dna',
    response_model=DnaResponse,
    summary="Gera a análise 'DNA da Turma'",
    tags=["Análise Pedagógica"],
)
async def gerar_dna_da_turma(
    materia: Annotated[str, Form(description="Nome da matéria em análise. Ex: Gestão de Estoques")],
    dados_brutos: Annotated[UploadFile, File(description="Arquivo CSV com os dados da pesquisa da turma.")]
):
    """
    Recebe o nome de uma matéria e uma planilha CSV (`dados_brutos`) via FORM-DATA.

    **Ação:**
    1.  Valida se o arquivo enviado é do tipo CSV.
    2.  Lê o conteúdo da planilha.
    3.  Monta o prompt de análise pedagógica.
    4.  Envia o prompt para a API do Google Gemini.
    5.  Retorna a análise gerada em um JSON.
    """
    # Validação do tipo de arquivo
    if not dados_brutos.content_type == 'text/csv':
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tipo de arquivo inválido. Por favor, envie um arquivo .csv"
        )

    try:
        conteudo_csv_bytes = await dados_brutos.read()
        conteudo_csv_str = conteudo_csv_bytes.decode('utf-8')

        prompt_final = montar_prompt(materia=materia, conteudo_csv=conteudo_csv_str)

        response = await model.generate_content_async(prompt_final)

        return {"dna_turma": response.text}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ocorreu um erro inesperado ao processar a solicitação: {e}"
        )


@app.post(
    "/api/studio/talk",
    response_model=StudioTalkResponse,
    summary="Mantém uma conversa contextual com a IA",
    tags=["Studio Interativo"],
)
async def studio_talk(request: StudioTalkRequest):
    """
    Recebe o DNA da turma, o histórico da conversa e uma nova mensagem.
    Retorna a resposta da IA e um resumo atualizado da conversa.
    """
    try:
        contexto_inicial = f"Você é um assistente de criação de conteúdo para um instrutor do SENAI. Seu objetivo é ajudar a criar cenários, exercícios e exemplos práticos. Leve em consideração o seguinte perfil da turma para adaptar suas respostas: {request.dna_turma}"
        
        historico_formatado = [{"role": "user", "parts": [contexto_inicial]}, {"role": "model", "parts": ["Entendido. Estou pronto para ajudar com base no perfil desta turma. O que você gostaria de criar?"]}]
        for msg in request.historico_conversa:
            role = "model" if msg.role.lower() in ["assistant", "model", "ia"] else "user"
            historico_formatado.append({"role": role, "parts": [msg.content]})

        chat = model.start_chat(history=historico_formatado)
        response = await chat.send_message_async(request.nova_mensagem)
        resposta_ia = response.text

        conversa_completa_texto = f"Contexto da Turma: {request.dna_turma}\n\n"
        for msg in request.historico_conversa:
            conversa_completa_texto += f"{'Instrutor' if msg.role == 'user' else 'Assistente'}: {msg.content}\n"
        conversa_completa_texto += f"Instrutor: {request.nova_mensagem}\n"
        conversa_completa_texto += f"Assistente: {resposta_ia}\n"
        
        prompt_resumo = f"Resuma a conversa a seguir em um único parágrafo conciso, capturando o tópico principal e a última solicitação ou conclusão. A conversa é entre um instrutor e um assistente de IA.\n\nCONVERSA:\n{conversa_completa_texto}"
        
        # Faz uma segunda chamada à IA, especificamente para resumir
        resumo_response = await model.generate_content_async(prompt_resumo)
        resumo_conversa = resumo_response.text

        return {
            "respostaIA": resposta_ia,
            "historico_conversa": resumo_conversa
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ocorreu um erro inesperado na comunicação com a IA: {e}"
        )