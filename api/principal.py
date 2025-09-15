import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import Depends, FastAPI, Form, Response, UploadFile, File, HTTPException, status
from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_ 
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

from servicos.banco_de_dados import get_db
from db_models.turma import Turma
from schemas.turma_models import TurmaRead, TurmaUpsert
from schemas.dna_models import DnaResponse
from schemas.studio_models import StudioTalkRequest, StudioTalkResponse
from servicos.prompts import gerar_prompt_para_dna

load_dotenv()

try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except KeyError:
    raise RuntimeError(
        "A variável de ambiente GOOGLE_API_KEY não foi definida. "
        "Por favor, configure sua chave de API do Google."
    )
model = genai.GenerativeModel('gemini-2.5-pro')

app = FastAPI()

origins = [
    os.environ["FRONTEND_URL"]
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.get('/')
async def root():
    return {'message': 'Hello World'}

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

        prompt_final = gerar_prompt_para_dna(materia=materia, conteudo_csv=conteudo_csv_str)

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

@app.get("/api/turmas", response_model=List[TurmaRead],  tags=["Turma"],)
async def get_turmas(
    db: AsyncSession = Depends(get_db),
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 20
):
    """
    Retorna uma lista paginada de turmas.
    Se o parâmetro 'search' for fornecido, filtra por nome e código da turma.
    """
    query = select(Turma).order_by(Turma.id)

    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            or_(
                Turma.nome.ilike(search_filter),
                Turma.cod_turma.ilike(search_filter)
            )
        )

    query = query.offset((page - 1) * limit).limit(limit)

    result = await db.execute(query)
    turmas = result.scalars().all()
    return turmas


@app.put("/api/turmas", status_code=status.HTTP_200_OK,  tags=["Turma"],)
async def upsert_turma(turma: TurmaUpsert, db: AsyncSession = Depends(get_db)):
    """
    Cria uma nova turma se o ID não for fornecido.
    Atualiza uma turma existente se o ID for fornecido.
    """
    if turma.id:
        db_turma = await db.get(Turma, turma.id)
        if not db_turma:
            raise HTTPException(status_code=404, detail="Turma não encontrada")
        
        turma_data = turma.model_dump(exclude_unset=True)
        for key, value in turma_data.items():
            setattr(db_turma, key, value)
            
        message = f"Turma {turma.id} atualizada com sucesso"
        db.add(db_turma)

    else:
        result = await db.execute(select(Turma).filter(Turma.cod_turma == turma.cod_turma))
        if result.scalars().first():
            raise HTTPException(status_code=409, detail="Uma turma com este código já existe")
            
        db_turma = Turma(**turma.model_dump())
        db.add(db_turma)
        message = "Turma criada com sucesso"
    
    await db.commit()
    await db.refresh(db_turma)

    return {"message": message}


@app.delete("/api/turmas/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Turma"],)
async def delete_turma(id: int, db: AsyncSession = Depends(get_db)):
    """
    Deleta uma turma específica pelo seu ID.
    """
    db_turma = await db.get(Turma, id)

    if not db_turma:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Turma com o id {id} não encontrada"
        )

    await db.delete(db_turma)

    await db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
