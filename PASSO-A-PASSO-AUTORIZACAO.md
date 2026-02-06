# 🔐 PASSO A PASSO: AUTORIZAR PERMISSÕES DE EMAIL

## 📋 **ROTEIRO EXATO PARA RESOLVER**

### **PASSO 1: Atualizar o Código**
1. ✅ Copie **TODO** o código do arquivo `google-apps-script-com-email.js`
2. ✅ Cole no Google Apps Script (substitua tudo)
3. ✅ Clique **"Salvar"** (Ctrl+S ou Cmd+S)

### **PASSO 2: Executar Função de Autorização**
1. 🔧 No dropdown de funções, selecione `autorizarPermissoes`
2. 🔧 Clique no botão **"Executar"** (▶️)
3. 🔐 **APARECERÁ UMA TELA DE AUTORIZAÇÃO**

### **PASSO 3: Processo de Autorização**
Quando aparecer a tela de autorização:

#### **3.1 - Primeira Tela**
- Clique **"Revisar permissões"**

#### **3.2 - Escolher Conta**
- Selecione sua conta Google (hemilton.tuco@gmail.com)

#### **3.3 - Tela de Aviso**
- Aparecerá: *"Este app não foi verificado"*
- Clique **"Avançado"** (no canto inferior esquerdo)

#### **3.4 - Ir para o App**
- Clique **"Ir para [nome do projeto] (não seguro)"**

#### **3.5 - Conceder Permissões**
- Aparecerá lista de permissões:
  - ✅ **Enviar emails como você**
  - ✅ **Ver e gerenciar planilhas do Google Sheets**
  - ✅ **Conectar-se a um serviço externo**
- **Clique "Permitir"** para TODAS

### **PASSO 4: Confirmar Sucesso**
Após autorizar, você deve ver nos logs:
```
✅ Autorização bem-sucedida! Quota restante: 100
✅ Email de teste enviado com sucesso!
```

**E RECEBER UM EMAIL** com assunto "Teste de Autorização"

### **PASSO 5: Testar Sistema Completo**
1. Execute `testarApenasEmail` - deve aparecer: `✅ Email enviado com SUCESSO`
2. Execute `testarManualmente` - deve aparecer: `✅ PROCESSAMENTO COMPLETO`
3. **Verifique seu email** - deve ter recebido o checklist!

## 🚨 **SE NÃO APARECER A TELA DE AUTORIZAÇÃO**

### **Opção A: Forçar via Editor**
1. Vá em **"Editor"** (ícone `</>`)
2. Clique no ícone **"Executar"** na função `autorizarPermissoes`
3. Se não aparecer, clique em **"Debug"** (ícone do inseto 🐛)

### **Opção B: Via Gatilhos**
1. Vá em **"Acionadores"** (ícone de relógio ⏰)
2. Clique **"+ Adicionar acionador"**
3. Função: `autorizarPermissoes`
4. Evento: **Acionado por tempo**
5. Tipo: **Minutos**
6. Intervalo: **A cada minuto**
7. Clique **"Salvar"** - aparecerá a autorização
8. **DEPOIS DE AUTORIZAR, DELETE O ACIONADOR**

### **Opção C: Via Configurações**
1. Vá em **"Configurações"** (⚙️)
2. Marque **"Mostrar projetos ocultos/com falha"**
3. Execute a função novamente

## ✅ **SINAIS DE QUE FUNCIONOU**

### **Nos Logs:**
```
✅ Autorização bem-sucedida! Quota restante: 100
✅ Email de teste enviado com sucesso!
📧 Tentando enviar via MailApp (método simplificado)...
✅ Email enviado com SUCESSO para hemilton.tuco@gmail.com
```

### **No Email:**
- ✅ Email "Teste de Autorização" recebido
- ✅ Email com checklist recebido (HTML formatado)

### **Na Planilha:**
- ✅ Novas linhas com dados dos testes

## 🎯 **APÓS AUTORIZAÇÃO COMPLETA**

1. ✅ Teste a landing page: http://localhost:8080/checklist-gratuito.html
2. ✅ Use dados reais (seu nome e email)
3. ✅ Deve redirecionar para obrigado.html
4. ✅ Deve receber email automático
5. ✅ Sistema 100% funcional!

## 📞 **SE CONTINUAR COM PROBLEMA**

### **Problema Comum: "Não foi possível autorizar"**
**Solução:**
1. Use uma **nova aba anônima/privada** no navegador
2. Faça login com sua conta Google
3. Acesse o Google Apps Script
4. Execute a função de autorização

### **Problema: "App não verificado"**
**É NORMAL!** Todos os scripts pessoais mostram isso.
- Clique **"Avançado"** e continue
- É seguro porque é SEU próprio script

---

## 🎉 **RESULTADO FINAL**

Após seguir todos os passos:
- ✅ **Permissões autorizadas** (só precisa fazer uma vez)
- ✅ **Sistema completo funcionando**
- ✅ **Landing page capturando leads**
- ✅ **Emails automáticos sendo enviados**

**IMPORTANTE:** Depois que autorizar uma vez, funciona para sempre! Todos os usuários da sua landing page receberão emails automaticamente! 🚀
