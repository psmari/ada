# A.D.A. Frontend

Frontend da plataforma A.D.A. (Análise de Dados Acadêmicos) construído com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para aplicações React
- **Axios** - Cliente HTTP para requisições à API

## 📦 Instalação

1. Clone o repositório
2. Navegue até a pasta frontend:
   ```bash
   cd frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse http://localhost:3000 no seu navegador

## 🎨 Design System

### Cores
- **Vermelho Principal**: #E30613
- **Vermelho Escuro**: #FF0000
- **Cinza Claro**: #F5F5F5
- **Preto**: #1A1A1A

### Componentes
- Botões primários em vermelho com texto branco
- Botões secundários em cinza claro com texto preto
- Cards com sombras e efeitos hover
- Animações suaves em transições

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── dashboard/      # Componentes específicos do dashboard
│   │   ├── DashboardHeader.tsx
│   │   ├── FilterBar.tsx
│   │   ├── CardTurma.tsx
│   │   └── Pagination.tsx
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── HeroSection.tsx # Seção principal da landing page
│   ├── LoginForm.tsx   # Formulário de login/cadastro
│   ├── AboutSection.tsx # Seção sobre a plataforma
│   ├── CreatorsSection.tsx # Seção dos criadores
│   └── Footer.tsx      # Rodapé da aplicação
├── pages/              # Páginas da aplicação
│   ├── LandingPage.tsx # Página inicial
│   ├── Dashboard.tsx   # Dashboard principal
│   └── Studio.tsx      # Página do estúdio
├── App.tsx             # Componente raiz
├── main.tsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🌐 Integração com API

O frontend está configurado para se comunicar com a API externa em `https://ada-y5en.onrender.com`.

### Solução de CORS:
- **Desenvolvimento**: Usa proxy do Vite para contornar restrições CORS
- **Produção**: Comunicação direta com a API

### Endpoints Utilizados:
- `POST /api/gerar-dna` - Geração de DNA da turma
- `POST /api/studio/talk` - Chat com IA contextual

### Configuração do Proxy:
```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'https://ada-y5en.onrender.com',
      changeOrigin: true,
      secure: true
    }
  }
}
```

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Funcionalidades

### Landing Page
- Header fixo com navegação
- Seção hero com call-to-action
- Formulário de login/cadastro
- Seção explicativa sobre a plataforma
- Cards dos criadores
- Rodapé com links e contato

### Dashboard
- **Header**: Título "Painel" em destaque
- **Seção de Turmas**: 
  - Subtítulo "Suas turmas"
  - Filtro dropdown com opção "Value"
  - Barra de busca com ícone de lupa
  - Botão "Criar Turma" em vermelho
- **Grid de Turmas**: 
  - Cards responsivos (2-4 colunas)
  - Fundo vermelho claro (#FAD4D4)
  - Título e subtítulo da turma
  - Botão "Primary" no canto inferior direito
- **Paginação**: 
  - Estilo minimalista
  - Navegação entre páginas
  - Página atual destacada em vermelho

### Estúdio
- **Header fixo** com logo A.D.A. e título da turma
- **Sistema de abas** principais: Configurações e Estúdio
- **Aba Configurações**:
  - Card "DNA da Turma" com ícone de "+"
  - Texto "Inteligência do Curso (in future)"
  - Cards adicionais para futuras funcionalidades
- **Aba Estúdio** com três sub-abas:
  - **Ver DNA**: Análise completa do perfil da turma
  - **Conversas**: Chat com ADA e sugestões
  - **Nova Conversa**: Interface para iniciar nova conversa
- **Footer** com fundo vermelho e texto "Desenvolvido by SENAI3.90"

## 🎨 Componentes do Dashboard

### DashboardHeader
- Título "Painel" em destaque
- Design limpo e minimalista

### FilterBar
- Dropdown de filtro com opção "Value"
- Barra de busca com ícone de lupa
- Botão "Criar Turma" em vermelho com modal
- Layout responsivo

### CardTurma
- Fundo vermelho claro (#FAD4D4)
- Título e subtítulo da turma
- Botão "Primary" no canto inferior direito
- Efeito hover com escala e sombra
- Redirecionamento para página do estúdio

### Pagination
- Design minimalista
- Navegação Previous/Next
- Números de página com destaque para atual
- Suporte a páginas com reticências

## 🎨 Componentes do Estúdio

### StudioHeader
- Header fixo com logo A.D.A.
- Botão de navegação de volta ao dashboard
- Título da turma em destaque

### TabSystem
- Sistema de abas principais (Configurações e Estúdio)
- Abas em estilo pill com destaque vermelho
- Navegação entre abas

### ConfigTab
- Card "DNA da Turma" com ícone de "+" clicável
- Modal de upload de arquivo CSV
- Integração com API para geração de DNA
- Exibição do DNA gerado na interface
- Cards adicionais para futuras funcionalidades

### StudioTab
- Sistema de sub-abas (Ver DNA, Conversas, Nova Conversa)
- Navegação entre sub-abas
- Conteúdo dinâmico baseado na aba ativa

### VerDna
- Análise completa do perfil da turma
- Métricas visuais com barras de progresso
- Recomendações pedagógicas
- Design responsivo

### Conversas
- Interface de chat completa com histórico de mensagens
- Integração real com API `/api/studio/talk`
- Campo de sugestões em botões pills
- Caixa de input com ícone de envio
- Indicador de loading durante processamento
- Tratamento de erros com mensagens específicas
- Auto-scroll para última mensagem
- Botão para limpar histórico do chat

### NovaConversa
- Interface para iniciar nova conversa
- Sugestões de início de conversa
- Área de chat vazia com instruções
- Campo de input expandido

### StudioFooter
- Footer com fundo vermelho
- Texto centralizado "Desenvolvido by SENAI3.90"

### UploadModal
- Modal para upload de arquivo CSV
- Validação de tipo de arquivo (.csv)
- Drag and drop para seleção de arquivo
- Integração com API de geração de DNA
- Alertas de sucesso e erro
- Interface responsiva e acessível

### useChat Hook
- Hook personalizado para gerenciamento de estado do chat
- Integração com API `/api/studio/talk`
- Gerenciamento de histórico de mensagens
- Estados de loading e erro
- Função para enviar mensagens
- Função para limpar chat
- Mensagem inicial automática da ADA

### CreateTurmaModal
- Modal para criação de nova turma
- Campo para nome da turma
- Geração automática de código único
- Navegação automática para o Estúdio
- Persistência de dados no localStorage
- Interface responsiva e acessível

### TurmaContext
- Contexto React para gerenciamento global da turma atual
- Carregamento de turmas do servidor
- Persistência automática no localStorage
- Funções para carregar, definir e limpar turma atual
- Integração com API GET /api/turmas e GET /api/turmas/:id

## 🔄 Funcionalidades de Navegação

### Dashboard → Estúdio
- **Carregamento de turmas**: GET /api/turmas ao inicializar
- **Seleção de turma**: Clique no card carrega dados específicos
- **Navegação inteligente**: Redireciona para Estúdio → Conversas
- **Estados de loading**: Indicadores visuais durante carregamento
- **Tratamento de erros**: Fallback para dados mockados se API falhar

### Gerenciamento de Estado
- **TurmaContext**: Estado global da turma atual
- **Persistência local**: Dados salvos no localStorage
- **Sincronização**: Atualização automática entre componentes
- **Navegação por URL**: Suporte a parâmetros de URL para abas

### Integração com Chat
- **DNA específico**: Chat usa DNA da turma selecionada
- **Contexto personalizado**: Respostas baseadas no perfil da turma
- **Informações da turma**: Exibição do nome e matéria no chat
- **Fallback inteligente**: Mensagem informativa se nenhuma turma selecionada

### Funcionalidades Finais Implementadas
- **Carregamento de turmas**: GET /api/turmas com parâmetros de busca
- **Seleção específica**: GET /api/turmas?search=ID&page=1&limit=20
- **Cabeçalho dinâmico**: Nome e matéria da turma no StudioHeader
- **DNA persistido**: Exibição do DNA na aba Ver DNA
- **Chat contextual**: Uso do DNA específico da turma no bate-papo
- **Estados condicionais**: Métricas só aparecem se houver DNA
- **Fallback robusto**: Dados mockados se API não retornar dados

## 🚀 Próximos Passos

1. Implementar integração real com a API
2. Adicionar validação de formulários
3. Implementar autenticação
4. Criar funcionalidades específicas do estúdio
5. Adicionar testes unitários
6. Implementar gerenciamento de estado global
