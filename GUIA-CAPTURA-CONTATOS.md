# 🎯 STATUS ATUAL - MAILCHIMP INTEGRADO

**✅ CONFIGURAÇÃO ATIVA E PRONTA!**

**Suas informações do Mailchimp:**
- **Público ID**: `3873a0eaa2`
- **Região**: `us15` 
- **Email remetente**: `contato@menteserena.online`
- **Nome remetente**: `NeuroBrain`
- **URL formulário**: `http://eepurl.com/jx3ON6`
- **PDF URL**: `https://menteserena.online/Checklist-MenteSerena.pdf` ✅

**🚀 FLUXO ATUAL CONFIGURADO:**
1. Landing page captura leads → **Mailchimp + Google Sheets** 📊
2. Automação Mailchimp envia email → PDF automaticamente
3. Google Sheets salva backup de todos os leads
4. Analytics trackeia conversões → Google Analytics

**⚠️ AÇÃO NECESSÁRIA:**
Você precisa substituir `SEU_SCRIPT_ID_AQUI` pela URL real do seu Google Apps Script no arquivo `checklist-gratuito.html`

---

# 📧 GUIA: Como Capturar Contatos do Formulário

## 🚀 OPÇÃO 1: Google Sheets (GRATUITO - Recomendado para começar)

### Passo 1: Criar Google Apps Script
1. Acesse: https://script.google.com/
2. Clique em "Novo projeto"
3. Cole este código:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('SEU_ID_DA_PLANILHA').getActiveSheet();
  
  const nome = e.parameter.nome;
  const email = e.parameter.email;
  const timestamp = e.parameter.timestamp;
  
  // Adiciona linha na planilha
  sheet.appendRow([new Date(), nome, email, 'Checklist Ansiedade']);
  
  // Retorna sucesso
  return ContentService
    .createTextOutput(JSON.stringify({result: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Clique em "Implantar" > "Nova implantação"
5. Tipo: "Aplicativo da web"
6. Executar como: "Eu"
7. Quem tem acesso: "Qualquer pessoa"
8. Copie a URL gerada

### Passo 2: Criar Planilha Google
1. Crie uma planilha em: https://sheets.google.com/
2. Coloque cabeçalhos: Data | Nome | Email | Origem
3. Copie o ID da planilha da URL
4. Substitua 'SEU_ID_DA_PLANILHA' no código

### Passo 3: Configurar no HTML ⚠️ **IMPORTANTE**

**Na linha 569 do arquivo `checklist-gratuito.html`, substitua:**

```javascript
// DE:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_SCRIPT_ID_AQUI/exec';

// PARA (usando SUA URL real):
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123DEF456GHI789/exec';
```

**Como pegar sua URL:**
1. No Google Apps Script → Implantar → Nova implantação
2. Tipo: "Aplicativo da web"
3. Execute como: "Eu" 
4. Acesso: "Qualquer pessoa"
5. Copie a URL completa que aparece
6. Cole no lugar de `SEU_SCRIPT_ID_AQUI`

---

## 💌 OPÇÃO 2: Mailchimp (Gratuito até 500 contatos)

### Configuração:
1. Crie conta em: https://mailchimp.com/
2. Crie uma "Audience"
3. Vá em Audience > Signup forms > Embedded forms
4. Copie a URL do action (algo como):
   `https://your-audience.us1.list-manage.com/subscribe/post?u=123&id=456`

### No HTML:
- Descomente as linhas do Mailchimp
- Substitua `YOUR_USER_ID` e `YOUR_LIST_ID`

---

## 🔥 OPÇÃO 3: ConvertKit (Focado em criadores)

### Configuração:
1. Crie conta em: https://convertkit.com/
2. Crie um Form
3. Vá em Settings > API
4. Copie sua API Key e Form ID

### No HTML:
- Descomente as linhas do ConvertKit
- Configure API_KEY e FORM_ID

---

## 📊 OPÇÃO 4: RD Station (Popular no Brasil)

```html
<!-- Substitua o form atual por este -->
<form action="https://app.rdstation.com.br/leads/public/SEU_TOKEN" method="post">
  <input type="hidden" name="identificador" value="checklist_ansiedade">
  
  <div class="form-group">
    <label class="form-label" for="nome">Nome:</label>
    <input type="text" class="form-input" name="nome" required placeholder="Seu primeiro nome">
  </div>
  
  <div class="form-group">
    <label class="form-label" for="email">Email:</label>
    <input type="email" class="form-input" name="email" required placeholder="seu@email.com">
  </div>
  
  <button type="submit" class="submit-btn">QUERO RECEBER O CHECKLIST</button>
</form>
```

---

## 🎯 OPÇÃO 5: Webhook (Para desenvolvedores)

Crie um endpoint que receba POST com nome e email:

```javascript
// Exemplo em Node.js
app.post('/webhook', (req, res) => {
  const { nome, email } = req.body;
  
  // Salve no banco de dados
  // Envie para email marketing
  // Dispare email automático
  
  res.json({ result: 'success' });
});
```

---

## 📈 RECOMENDAÇÕES:

### Para Começar (Gratuito):
1. **Google Sheets** - Simples, gratuito, funciona imediatamente

### Para Escalar:
1. **Mailchimp** - Até 500 contatos grátis
2. **ConvertKit** - Melhor para criadores de conteúdo
3. **RD Station** - Popular no Brasil, tem automações

### Para Empresas:
1. **HubSpot** - CRM completo
2. **ActiveCampaign** - Automações avançadas
3. **GetResponse** - All-in-one marketing

---

## ⚡ DICA PRO:
Combine Google Sheets (backup) + Email Marketing (automação):
- Todos os leads vão para a planilha
- E também para sua ferramenta de email marketing
- Assim você nunca perde um contato!

---

## 🔄 PRÓXIMOS PASSOS:

1. **Escolha uma opção** (recomendo começar com Google Sheets)
2. **Configure** seguindo os passos
3. **Teste** o formulário
4. **Crie uma sequência de emails** para entregar o checklist
5. **Configure automações** para nutrir os leads

---

## 📧 ENTREGA DO CHECKLIST:

Depois de capturar o email, você precisa:

1. **Email automático** com link para download
2. **Criar o PDF** do checklist
3. **Hospedar** em Google Drive ou Dropbox
4. **Sequência de follow-up** (5-7 emails)

Quer que eu te ajude com algum desses passos específicos?

---

## 📧 CONFIGURAR AUTOMAÇÃO NO MAILCHIMP (ATIVO)

### ✅ Passo 1: Criar Automação
1. No Mailchimp, vá em **Automations** → **Create**
2. Escolha **Customer journey** → **Welcome new subscribers**
3. Configure:
   - **Audience**: Selecione sua lista `NeuroBrain`
   - **Trigger**: "Subscriber joins audience"
   - **Timing**: Send immediately

### ✅ Passo 2: Template do Email (COPIE E COLE)

**ASSUNTO:** ✅ Seu checklist chegou! Os 7 sinais da ansiedade

**CORPO DO EMAIL:**
```
Olá [FNAME|amigo(a)],

Muito obrigado por baixar o checklist! 🎉

👇 **Clique aqui para acessar seu material:**
https://menteserena.online/Checklist-MenteSerena.pdf

📋 **O que você vai encontrar:**
• Os 7 sinais mais ignorados de ansiedade
• Explicações simples e práticas
• O que fazer hoje mesmo para retomar o controle
• Um primeiro passo seguro para sair do modo sobrevivência

⚠️ **Dica importante:** Salve o PDF no seu celular ou computador para consultar sempre que precisar.

---

Este é apenas o primeiro passo. Se você quiser ir mais fundo e realmente transformar sua relação com a ansiedade, em breve vou compartilhar algo especial com você.

Fique de olho no seu email! 📧

Um abraço,
**NeuroBrain**
Mente Serena

P.S.: Se você não recebeu este email na caixa principal, verifique a pasta de spam e mova para a caixa de entrada.

---
🔒 Você está recebendo este email porque se cadastrou em menteserena.online
📧 Para sair da lista, clique aqui: [LINK_UNSUBSCRIBE]
```

### ✅ Passo 3: Ativar a Automação
1. Revise o email
2. Clique em **Start Journey**
3. A automação ficará ativa automaticamente
