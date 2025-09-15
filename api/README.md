# A.D.A - Api

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009485.svg)
![Google Gemini](https://img.shields.io/badge/Google-Gemini%20API-4285F4.svg)

Uma API back-end construída com FastAPI que utiliza a API do Google Gemini para auxiliar instrutores do SENAI a criar conteúdo pedagógico personalizado, analisando o perfil da turma e mantendo uma conversa contextual para o desenvolvimento de materiais de aula.

## Funcionalidades

-   **Análise de Perfil de Turma**: Endpoint que recebe um arquivo `.csv` e gera um "DNA da Turma".
-   **Chat com Contexto**: Endpoint de conversação que considera o perfil da turma e o histórico do chat.
-   **Resumo de Conversa**: A cada nova mensagem, a API retorna um resumo atualizado da conversa para fácil referência.
-   **API Moderna e Documentada**: Construída com FastAPI, oferecendo documentação interativa automática (Swagger UI).

## Tecnologias Utilizadas

-   **Backend**: Python 3.13
-   **Framework**: FastAPI
-   **Validação de Dados**: Pydantic
-   **Servidor ASGI**: Uvicorn
-   **IA Generativa**: Google Gemini API (`google-generativeai`)

## Pré-requisitos

Antes de começar, você precisará ter:
-   [Python 3.8](https://www.python.org/downloads/) ou superior instalado.
-   Uma **Chave de API do Google Gemini**. Você pode obter uma gratuitamente no [Google AI Studio](https://aistudio.google.com/).

## Instalação e Configuração

Siga estes passos para configurar o ambiente de desenvolvimento local.

**1. Clone o Repositório**
```bash
git clone https://github.com/psmari/ada.git
cd /ada
```

**2. Crie e Ative um Ambiente Virtual**
- No macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

- No Windows:

```bash
python -m venv venv
.\venv\Scripts\activate
```

**3. Instale as Dependências**
Com o ambiente virtual ativado, instale todas as bibliotecas necessárias.

```bash
pip install -r requirements.txt
```

**4. Configure a Chave de API**
A aplicação precisa da sua chave do Google Gemini para funcionar. Configure-a como uma variável de ambiente. (olhe o .env-example)

## Como Executar
Com o ambiente virtual ativado e a variável de ambiente configurada, inicie o servidor:

```bash
uvicorn principal:app --reload
```

A API estará disponível em http://127.0.0.1:8000.

## Documentação da API

Acesse a documentação interativa (Swagger UI) para testar os endpoints diretamente do seu navegador:

http://127.0.0.1:8000/docs

