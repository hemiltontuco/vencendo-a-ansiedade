# 🔐 SOLUÇÃO: CONFIGURAR PERMISSÕES DE EMAIL

## ✅ **BOA NOTÍCIA!**
O sistema está **98% funcionando**:
- ✅ Google Apps Script funcionando
- ✅ Dados chegando corretamente  
- ✅ Planilha sendo atualizada
- ❌ Apenas faltam permissões de email

## 🔧 **SOLUÇÃO EM 3 PASSOS**

### **PASSO 1: Atualizar o Código**
1. Copie o código atualizado do arquivo `google-apps-script-com-email.js`
2. Cole no Google Apps Script (substituindo tudo)
3. Clique **"Salvar"** (Ctrl+S)

### **PASSO 2: Autorizar Permissões**
1. No Google Apps Script, execute a função `testarApenasEmail`
2. **Aparecerá uma tela de autorização**
3. Clique **"Revisar permissões"**
4. Escolha sua conta Google
5. Clique **"Avançado"**
6. Clique **"Ir para [nome do projeto] (não seguro)"**
7. **Clique "Permitir" PARA TODAS as permissões**

### **PASSO 3: Testar Novamente**
1. Execute `testarApenasEmail` novamente
2. **Deve aparecer**: `✅ Email enviado com SUCESSO`
3. **Verifique sua caixa de entrada**

## 📧 **PERMISSÕES NECESSÁRIAS**

O Google vai pedir autorização para:
- ✅ **Enviar emails como você**
- ✅ **Acessar Google Sheets**
- ✅ **Executar como aplicativo da web**

**AUTORIZE TODAS!** Elas são necessárias para o funcionamento.

## 🎯 **TESTE FINAL**

Após autorizar, execute novamente:

### **1. Função `testarApenasEmail`**
**Resultado esperado:**
```
✅ Email enviado com SUCESSO para hemilton.tuco@gmail.com
```

### **2. Função `testarManualmente`**
**Resultado esperado:**
```
✅ PROCESSAMENTO COMPLETO
Lead salvo com sucesso. Email enviado
```

## 🚨 **SE AINDA NÃO FUNCIONAR**

### **Problema: "Script não autorizado"**
**Solução:**
1. Vá em **"Configurações"** ⚙️
2. Marque **"Mostrar projetos ocultos/com falha"**
3. Execute a função novamente
4. Autorize quando solicitado

### **Problema: "Quota excedida"**
**Solução:**
- Google Apps Script permite 100 emails/dia
- Se já enviou muitos, aguarde até amanhã
- Use um email diferente para testes

### **Problema: "Email não chega"**
**Solução:**
1. Verifique **spam/promoções**
2. Verifique se o email está correto
3. Teste com outro provedor (Gmail, Yahoo, etc.)

## 📊 **LOGS DE SUCESSO**

Quando funcionar, você verá:
```
📧 === ENVIO DE EMAIL INICIADO ===
📧 Destinatário: hemilton.tuco@gmail.com
📧 Assunto: ✅ Seu checklist chegou! Os 7 sinais da ansiedade
📧 Tentando enviar via MailApp (método simplificado)...
✅ Email enviado com SUCESSO para hemilton.tuco@gmail.com
✅ PROCESSAMENTO COMPLETO
```

## 🎉 **APÓS RESOLVER**

Quando o email funcionar:
1. ✅ Teste a landing page completa
2. ✅ Use o dashboard de status para monitorar
3. ✅ Faça upload para a Hostinger
4. ✅ Sistema 100% funcional!

---

**⚡ IMPORTANTE:** As permissões são solicitadas apenas uma vez. Depois que autorizar, o sistema funcionará automaticamente para todos os usuários da landing page!
