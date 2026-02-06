// CÓDIGO GOOGLE APPS SCRIPT - VERSÃO MELHORADA COM LOGS DETALHADOS

// Função para lidar com requisições GET (teste de conectividade)
function doGet(e) {
  console.log('=== GET REQUEST RECEBIDA ===');
  console.log('Parâmetros GET:', e ? e.parameter : 'undefined');
  
  return ContentService
    .createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Google Apps Script está funcionando!',
      timestamp: new Date().toISOString(),
      method: 'GET',
      status: 'online'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // Log inicial com timestamp
  const startTime = new Date();
  console.log(`=== INÍCIO EXECUÇÃO [${startTime.toISOString()}] ===`);
  
  // Verificação de segurança para o objeto e
  if (!e) {
    console.error('❌ ERRO CRÍTICO: Objeto e está undefined');
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error', 
        message: 'Objeto de evento não encontrado',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('Objeto e completo:', JSON.stringify(e, null, 2));
  console.log('e.parameter:', e.parameter || 'undefined');
  console.log('e.postData:', e.postData || 'undefined');
  console.log('Headers:', e.queryString || 'undefined');
  
  let nome, email, timestamp, source;
  
  // Tenta diferentes formas de obter os dados com logs detalhados
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    console.log('📊 Usando e.parameter (método preferencial)');
    console.log('📊 Chaves encontradas:', Object.keys(e.parameter));
    nome = e.parameter.nome;
    email = e.parameter.email;
    timestamp = e.parameter.timestamp;
    source = e.parameter.source || 'parameter-method';
    console.log('✅ Dados obtidos via e.parameter');
  } else if (e.postData && e.postData.contents) {
    console.log('📊 Tentando parsear postData.contents');
    try {
      const postString = e.postData.contents;
      console.log('PostData string completa:', postString);
      console.log('PostData type:', e.postData.type);
      
      // Se vier como URL encoded (form data)
      if (postString.includes('nome=') && postString.includes('email=')) {
        console.log('🔍 Parece ser URL encoded');
        
        // Parse manual mais robusto
        const pairs = postString.split('&');
        const params = {};
        for (const pair of pairs) {
          const [key, value] = pair.split('=');
          if (key && value) {
            params[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        }
        
        nome = params.nome;
        email = params.email;
        timestamp = params.timestamp;
        source = params.source || 'postdata-manual-parse';
        console.log('✅ Dados extraídos via parse manual:', params);
      } else {
        // Se vier como JSON
        console.log('🔍 Tentando como JSON');
        const postData = JSON.parse(postString);
        nome = postData.nome;
        email = postData.email;
        timestamp = postData.timestamp;
        source = postData.source || 'postdata-json';
        console.log('✅ Dados extraídos via JSON');
      }
    } catch (parseError) {
      console.error('❌ Erro ao parsear postData:', parseError.toString());
      console.error('❌ PostData problemático:', e.postData.contents);
    }
  } else {
    console.warn('⚠️ Nenhum método de obtenção de dados funcionou');
    console.warn('⚠️ Estrutura e:', e ? Object.keys(e) : 'e é undefined');
    console.warn('⚠️ e.parameter existe?', Boolean(e && e.parameter));
    console.warn('⚠️ e.postData existe?', Boolean(e && e.postData));
  }
  
  // Log dos valores obtidos com validação
  console.log('=== VALORES FINAIS ===');
  console.log('Nome:', nome, typeof nome, nome ? '✅' : '❌');
  console.log('Email:', email, typeof email, email ? '✅' : '❌');
  console.log('Timestamp:', timestamp);
  console.log('Source:', source);
  
  // Validação rigorosa
  if (!nome || !email || nome.trim() === '' || email.trim() === '') {
    console.error('❌ VALIDAÇÃO FALHOU - Dados obrigatórios ausentes ou vazios');
    console.error('❌ Nome válido?', Boolean(nome && nome.trim()));
    console.error('❌ Email válido?', Boolean(email && email.trim()));
    
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error', 
        message: 'Nome e email são obrigatórios e não podem estar vazios',
        received: { nome: nome || null, email: email || null, hasNome: Boolean(nome), hasEmail: Boolean(email) },
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  console.log('✅ VALIDAÇÃO PASSOU - Processando...');
  
  // ID da planilha - VERIFIQUE SE ESTÁ CORRETO
  const SHEET_ID = '1eVzF46_ujbu05qVod9wkQIFVzjvti9gA4T2rzfA4blE';
  console.log('📊 Abrindo planilha ID:', SHEET_ID);
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    console.log('✅ Planilha aberta com sucesso');
    console.log('📋 Nome da planilha:', sheet.getName());
    
    // Adiciona linha na planilha
    const rowData = [new Date(), nome.trim(), email.trim(), source || 'Checklist Ansiedade', timestamp || 'N/A'];
    console.log('📝 Dados para inserir:', rowData);
    
    sheet.appendRow(rowData);
    console.log('✅ Linha inserida na planilha');
    
    // ENVIA EMAIL AUTOMATICAMENTE
    console.log('📧 Iniciando envio de email...');
    const emailSent = enviarEmailComPDF(nome.trim(), email.trim());
    console.log('📧 Status final do email:', emailSent ? 'SUCESSO' : 'FALHOU');
    
    // Log final de sucesso
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    console.log(`✅ PROCESSAMENTO COMPLETO em ${duration}ms`);
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'success', 
        message: `Lead salvo com sucesso. Email ${emailSent ? 'enviado' : 'falhou (mas lead foi salvo)'}`,
        data: { nome: nome.trim(), email: email.trim(), emailSent },
        timestamp: endTime.toISOString(),
        processingTime: `${duration}ms`
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ ERRO CRÍTICO no processamento:', error.toString());
    console.error('❌ Stack trace:', error.stack);
    console.error('❌ Tipo do erro:', typeof error, error.name);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        result: 'error', 
        message: `Erro interno: ${error.toString()}`,
        errorType: error.name,
        step: 'processing',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarEmailComPDF(nome, email) {
  console.log(`📧 === ENVIO DE EMAIL INICIADO ===`);
  console.log(`📧 Destinatário: ${email}`);
  console.log(`📧 Nome: ${nome}`);
  
  // Valida email com regex mais rigorosa
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    console.error('❌ Email com formato inválido:', email);
    return false;
  }
  
  const assunto = '✅ Seu checklist chegou! Os 7 sinais da ansiedade';
  console.log(`📧 Assunto: ${assunto}`);
  
  const corpoEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2d2e83;">Olá ${nome}!</h2>
      
      <p>Muito obrigado por baixar o checklist! 🎉</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://menteserena.online/Checklist-MenteSerena.pdf" 
           style="background: linear-gradient(135deg, #2e7d32, #1b5e20); 
                  color: white; 
                  padding: 15px 30px; 
                  text-decoration: none; 
                  border-radius: 10px; 
                  font-weight: bold; 
                  display: inline-block;">
          📥 BAIXAR CHECKLIST AGORA
        </a>
      </div>
      
      <h3 style="color: #2d2e83;">📋 O que você vai encontrar:</h3>
      <ul style="line-height: 1.6;">
        <li>Os 7 sinais mais ignorados de ansiedade</li>
        <li>Explicações simples e práticas</li>
        <li>O que fazer hoje mesmo para retomar o controle</li>
        <li>Um primeiro passo seguro para sair do modo sobrevivência</li>
      </ul>
      
      <p><strong>⚠️ Dica importante:</strong> Salve o PDF no seu celular ou computador para consultar sempre que precisar.</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p>Este é apenas o primeiro passo. Se você quiser ir mais fundo e realmente transformar sua relação com a ansiedade, em breve vou compartilhar algo especial com você.</p>
      
      <p>Fique de olho no seu email! 📧</p>
      
      <p>Um abraço,<br>
      <strong>NeuroBrain</strong><br>
      Mente Serena</p>
      
      <p style="font-size: 12px; color: #666; margin-top: 30px;">
        P.S.: Se você não recebeu este email na caixa principal, verifique a pasta de spam.
      </p>
    </div>
  `;
  
  try {
    console.log('📧 Tentando enviar via MailApp (método simplificado)...');
    
    // Usa apenas MailApp - permissões mais simples
    MailApp.sendEmail({
      to: email,
      subject: assunto,
      htmlBody: corpoEmail,
      name: 'NeuroBrain - Mente Serena'
    });
    
    console.log(`✅ Email enviado com SUCESSO para ${email}`);
    console.log(`📧 Processo de email finalizado para: ${nome}`);
    return true;
    
  } catch (error) {
    console.error(`❌ ERRO CRÍTICO ao enviar email para ${email}:`);
    console.error(`❌ Tipo do erro: ${error.name}`);
    console.error(`❌ Mensagem: ${error.message}`);
    console.error(`❌ Stack: ${error.stack}`);
    
    // Se MailApp falhar, é problema de permissões
    console.error('❌ PROBLEMA DE PERMISSÕES - Execute a autorização conforme instrução');
    return false;
  }
}

// FUNÇÃO DE TESTE - Execute esta função manualmente no Google Apps Script
function testarManualmente() {
  console.log('=== TESTE MANUAL INICIADO ===');
  
  // Simula um evento POST
  const eventoTeste = {
    parameter: {
      nome: 'Teste Manual',
      email: 'teste.manual@gmail.com',
      timestamp: new Date().toISOString(),
      source: 'teste-manual-gas'
    },
    postData: null
  };
  
  console.log('📧 Executando doPost com dados de teste...');
  const resultado = doPost(eventoTeste);
  console.log('📧 Resultado do teste:', resultado.getContent());
  
  return 'Teste concluído - verifique os logs acima';
}

// FUNÇÃO PARA FORÇAR AUTORIZAÇÃO - Execute ESTA primeiro!
function autorizarPermissoes() {
  console.log('=== FORÇANDO AUTORIZAÇÃO DE PERMISSÕES ===');
  
  try {
    // Forçar criação de trigger para solicitar permissões
    console.log('🔐 Criando trigger temporário para forçar autorização...');
    
    // Cria um trigger temporário - isso SEMPRE pede autorização
    const trigger = ScriptApp.newTrigger('funcaoTemporaria')
      .timeBased()
      .after(1000) // 1 segundo
      .create();
    
    console.log('✅ Trigger criado com sucesso - autorização deve ter sido solicitada');
    console.log('🗑️ Removendo trigger temporário...');
    
    // Remove o trigger imediatamente
    ScriptApp.deleteTrigger(trigger);
    
    console.log('✅ Processo de autorização iniciado!');
    console.log('📧 Agora testando MailApp...');
    
    // Tenta usar MailApp
    const quota = MailApp.getRemainingDailyQuota();
    console.log(`✅ MailApp funcionando! Quota: ${quota}`);
    
    // Envia email de teste
    MailApp.sendEmail('hemilton.tuco@gmail.com', 'Teste de Autorização - FUNCIONOU!', 'Parabéns! As permissões foram autorizadas com sucesso. O sistema está pronto para usar.');
    
    console.log('🎉 SUCESSO TOTAL! Sistema autorizado e funcionando!');
    return 'Sistema autorizado com sucesso! Execute testarApenasEmail() agora';
    
  } catch (error) {
    console.error('❌ ERRO na autorização:', error.toString());
    console.log('💡 SOLUÇÃO ALTERNATIVA: Execute manualmente via Acionadores');
    console.log('💡 1. Vá em Acionadores (ícone relógio)');
    console.log('💡 2. Adicione acionador para autorizarPermissoes');
    console.log('💡 3. Autorize quando solicitado');
    console.log('💡 4. Delete o acionador após autorizar');
    return 'ERRO: Tente o método alternativo via Acionadores';
  }
}

// Função temporária para o trigger (não faz nada)
function funcaoTemporaria() {
  console.log('Função temporária executada - pode ignorar');
}

// FUNÇÃO PARA TESTAR APENAS O EMAIL
function testarApenasEmail() {
  console.log('=== TESTE APENAS EMAIL ===');
  
  const nome = 'Teste Email';
  const email = 'hemilton.tuco@gmail.com'; // Seu email real
  
  console.log(`📧 Testando envio de email para: ${email}`);
  const resultado = enviarEmailComPDF(nome, email);
  
  console.log(`📧 Resultado: ${resultado ? 'SUCESSO' : 'FALHOU'}`);
  return resultado ? 'Email enviado com sucesso!' : 'Falha no envio do email';
}
