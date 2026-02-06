# 🚨 SOLUÇÃO: Google Apps Script "Não acessível"

## ❌ PROBLEMA IDENTIFICADO

O erro **"Google Apps Script: Não acessível"** indica que o script não foi implantado corretamente ou as permissões não estão configuradas adequadamente.

## ✅ SOLUÇÃO PASSO A PASSO

### 1. **Acesse o Google Apps Script**
- Abra: https://script.google.com/
- Faça login com sua conta Google
- Encontre seu projeto do script

### 2. **Atualize o Código do Script**
- Clique no seu projeto
- **SUBSTITUA TODO O CÓDIGO** pelo conteúdo do arquivo `google-apps-script-com-email.js`
- Clique em **"Ctrl+S"** ou **"Cmd+S"** para salvar

### 3. **Configure as Permissões (IMPORTANTE)**
- Clique em **"Editor"** (ícone de código `</>`)
- Clique no ícone de **"Executar"** (▶️) para testar o código
- Aparecerá uma tela de autorização - clique **"Revisar permissões"**
- Selecione sua conta Google
- Clique **"Avançado"** → **"Ir para [nome do projeto] (não seguro)"**
- Clique **"Permitir"** para dar acesso ao Gmail e Google Sheets

### 4. **REIMPLANTE o Script (PASSO CRÍTICO)**
- Clique em **"Implantar"** (no canto superior direito)
- Clique em **"Nova implantação"**
- Clique no ícone de **"engrenagem/configurações"** ⚙️
- Selecione **"Aplicativo da Web"**

### 5. **Configure a Implantação**
```
Descrição: Sistema de Captura de Leads - Ansiedade
Executar como: Eu (seu.email@gmail.com)
Quem tem acesso: Qualquer pessoa
```

### 6. **COPIE A NOVA URL**
- Clique **"Implantar"**
- **COPIE a nova URL** (será diferente da anterior!)
- A URL deve terminar com `/exec`

### 7. **ATUALIZE o HTML**
- Abra o arquivo `checklist-gratuito.html`
- Encontre a linha com `GOOGLE_SCRIPT_URL`
- **SUBSTITUA** pela nova URL copiada

## 🔧 CÓDIGO PARA ATUALIZAR

No arquivo `checklist-gratuito.html`, linha ~557:

```javascript
// SUBSTITUA ESTA URL PELA NOVA URL DO SEU SCRIPT
const GOOGLE_SCRIPT_URL = 'COLE_AQUI_SUA_NOVA_URL_DO_SCRIPT';
```

## ✅ TESTE FINAL

1. Abra: http://localhost:8080/status-integracao.html
2. Clique **"Verificar URLs"**
3. Deve aparecer: **"Google Apps Script: URL acessível"** ✅
4. Clique **"Testar Google Apps Script"**
5. Deve aparecer: **"SUCESSO TOTAL! Lead salvo na planilha E email enviado!"** ✅

## 🔍 COMO VERIFICAR SE FUNCIONOU

### Na Planilha Google Sheets:
- Abra: https://docs.google.com/spreadsheets/d/1eVzF46_ujbu05qVod9wkQIFVzjvti9gA4T2rzfA4blE/
- Verifique se apareceu uma nova linha com:
  - Data/hora
  - Nome: "Teste Status Dashboard"
  - Email de teste
  - Source: "dashboard-status"

### No Gmail:
- Verifique se recebeu um email com:
  - Assunto: "✅ Seu checklist chegou! Os 7 sinais da ansiedade"
  - Remetente: "NeuroBrain - Mente Serena"
  - Link para download do PDF

## 🚨 SE AINDA NÃO FUNCIONAR

### Problemas Comuns:

1. **"Acesso negado"**
   - Repita o passo 3 (permissões)
   - Execute o script uma vez no editor antes de implantar

2. **"URL inválida"**
   - Certifique-se de que copiou a URL completa
   - A URL deve terminar com `/exec`

3. **"Planilha não encontrada"**
   - Verifique se o ID da planilha está correto no script
   - ID atual: `1eVzF46_ujbu05qVod9wkQIFVzjvti9gA4T2rzfA4blE`

4. **"Email não enviado"**
   - Verifique se o Gmail tem quota disponível (máx. 100 emails/dia)
   - Verifique a pasta de spam

## 📞 PRÓXIMOS PASSOS

Após seguir estes passos:
1. Teste novamente com o dashboard
2. Teste o formulário da landing page real
3. Confirme se tudo está funcionando
4. Então você pode fazer o upload para a Hostinger

---

**⚡ DICA:** Se você fez alguma alteração no código do Google Apps Script, sempre clique em **"Nova implantação"** para gerar uma nova URL. A URL antiga não funcionará mais!
