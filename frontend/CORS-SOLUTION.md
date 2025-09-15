# Solução para Problema de CORS

## Problema
A API em produção não possui headers CORS configurados, causando erro:
```
Access to XMLHttpRequest at 'https://ada-y5en.onrender.com/api/gerar-dna' from origin 'http://localhost:3000' has been blocked by CORS policy
```

## Solução Implementada

### 1. Proxy do Vite (Desenvolvimento)
Configurado no `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://ada-y5en.onrender.com',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, '/api')
    }
  }
}
```

### 2. Serviço de API Inteligente
O `api.ts` detecta automaticamente o ambiente:
- **Desenvolvimento**: Usa proxy local (`/api/gerar-dna`)
- **Produção**: Usa URL direta (`https://ada-y5en.onrender.com/api/gerar-dna`)

## Como Funciona

### Em Desenvolvimento (localhost:3000):
1. Frontend faz requisição para `/api/gerar-dna`
2. Vite proxy intercepta a requisição
3. Proxy redireciona para `https://ada-y5en.onrender.com/api/gerar-dna`
4. Resposta retorna sem problemas de CORS

### Em Produção:
1. Frontend faz requisição diretamente para `https://ada-y5en.onrender.com/api/gerar-dna`
2. Requisição é feita do mesmo domínio (sem CORS)

## Testando a Solução

1. **Reinicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

2. **Teste o upload de CSV**:
   - Acesse a página Estúdio
   - Vá para a aba Configurações
   - Clique no botão "+" do DNA da Turma
   - Faça upload de um arquivo CSV

3. **Verifique no Network Tab**:
   - A requisição deve ir para `http://localhost:3000/api/gerar-dna`
   - O proxy deve redirecionar para a API externa

## Alternativas (se necessário)

### Opção 1: CORS Anywhere (Desenvolvimento)
```bash
npm install -g cors-anywhere
cors-anywhere
```
Usar: `http://localhost:8080/https://ada-y5en.onrender.com/api/gerar-dna`

### Opção 2: Extensão do Browser
Instalar extensão "CORS Unblock" ou similar para desenvolvimento.

### Opção 3: Backend Proxy
Criar um endpoint no backend local que faça proxy para a API externa.

## Notas Importantes

- ✅ **Desenvolvimento**: Funciona com proxy do Vite
- ✅ **Produção**: Funciona diretamente (mesmo domínio)
- ✅ **Sem modificações na API**: Solução 100% frontend
- ✅ **Transparente**: Código não precisa saber da diferença
