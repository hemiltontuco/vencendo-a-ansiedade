# 🔧 PASSO A PASSO PARA TESTAR E CORRIGIR

## 🚨 PROBLEMA IDENTIFICADO

O erro `TypeError: Cannot read properties of undefined (reading 'parameter')` indica que o Google Apps Script está recebendo `undefined` como parâmetro. Isso pode acontecer em diferentes situações.

## ✅ SOLUÇÃO EM ETAPAS

### 1. **ATUALIZE O CÓDIGO DO GOOGLE APPS SCRIPT**

Copie **TODO** o código do arquivo `google-apps-script-com-email.js` atualizado para o seu Google Apps Script. O código agora tem:

- ✅ Verificação se o objeto `e` existe
- ✅ Função `doGet()` para teste de conectividade
- ✅ Parse manual mais robusto
- ✅ Funções de teste manual

### 2. **TESTE MANUAL NO GOOGLE APPS SCRIPT**

No editor do Google Apps Script:

1. Selecione a função `testarManualmente` no dropdown
2. Clique no botão **"Executar"** (▶️)
3. Verifique os logs - deve aparecer: "✅ Email enviado com SUCESSO"

### 3. **TESTE APENAS O EMAIL**

1. No código, encontre a função `testarApenasEmail`
2. **IMPORTANTE**: Substitua `seu.email.real@gmail.com` pelo seu email real
3. Selecione `testarApenasEmail` no dropdown
4. Clique **"Executar"** - você deve receber o email!

### 4. **TESTE DE CONECTIVIDADE**

Abra no navegador:
```
https://script.google.com/macros/s/AKfycbzAfAK4mvEwK_65vfpTGLYzIAGMgyvkmBzVQ6ZSv50MszGLY9iKCMO4Fe2kyS7EVNqXcg/exec
```

Deve aparecer algo como:
```json
{
  "result": "success",
  "message": "Google Apps Script está funcionando!",
  "timestamp": "2026-01-27...",
  "method": "GET",
  "status": "online"
}
```

### 5. **TESTE VIA DASHBOARD**

1. Abra: http://localhost:8080/status-integracao.html
2. Clique **"Verificar URLs"** - deve aparecer "✅ URL acessível"
3. Clique **"Testar Google Apps Script"** - deve salvar na planilha E enviar email

### 6. **TESTE DA LANDING PAGE**

1. Abra: http://localhost:8080/checklist-gratuito.html
2. Preencha com dados REAIS (use seu email)
3. Clique "QUERO RECEBER O CHECKLIST"
4. Deve redirecionar para obrigado.html

## 🔍 VERIFICAÇÕES IMPORTANTES

### ✅ **Na Planilha Google Sheets:**
- Acesse: https://docs.google.com/spreadsheets/d/1eVzF46_ujbu05qVod9wkQIFVzjvti9gA4T2rzfA4blE/
- Confirme se apareceram novas linhas com os dados dos testes

### ✅ **No Email:**
- Verifique sua caixa de entrada
- Procure por: "✅ Seu checklist chegou! Os 7 sinais da ansiedade"
- Se não chegou, verifique spam/promoções

### ✅ **Nos Logs do Google Apps Script:**
- Acesse: https://script.google.com/
- Clique em "Execuções" (ícone de relógio)
- Deve aparecer: "✅ PROCESSAMENTO COMPLETO"

## 🚨 POSSÍVEIS PROBLEMAS E SOLUÇÕES

### **1. Erro "e is undefined"**
- **Causa**: Requisição GET em vez de POST
- **Solução**: Use a função `doGet()` que adicionei

### **2. "Dados obrigatórios ausentes"**
- **Cause**: Parâmetros não chegando
- **Solução**: Verificar se o Content-Type está correto

### **3. "Planilha não encontrada"**
- **Causa**: ID da planilha errado
- **Solução**: Confirmar ID: `1eVzF46_ujbu05qVod9wkQIFVzjvti9gA4T2rzfA4blE`

### **4. "Email não enviado"**
- **Causa**: Quota do Gmail esgotada ou sem permissões
- **Solução**: Execute `testarApenasEmail` para verificar

## 📋 CHECKLIST DE VALIDAÇÃO

Execute estes testes NA ORDEM:

1. ☐ **Função `testarManualmente`** executada com sucesso
2. ☐ **Função `testarApenasEmail`** - email recebido
3. ☐ **URL no navegador** retorna JSON de sucesso
4. ☐ **Dashboard status** mostra "✅ URL acessível"
5. ☐ **Teste via dashboard** salva na planilha + envia email
6. ☐ **Landing page real** funciona completamente

## 🎯 PRÓXIMO PASSO

Após todos os testes passarem:
1. Faça upload dos arquivos para a Hostinger
2. Atualize a URL do Google Analytics se necessário
3. Teste em produção com dados reais

---

## 💡 DICAS IMPORTANTES

- **Sempre execute as funções de teste primeiro** antes de usar a landing page
- **Use seu email real nos testes** para confirmar que os emails chegam
- **Verifique os logs detalhados** no Google Apps Script
- **Se algo falhar**, execute novamente - às vezes é problema temporário do Google

**Status Atual:** ✅ Sistema corrigido e pronto para testes!
