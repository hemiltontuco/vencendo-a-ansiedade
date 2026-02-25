// ===== CONFIGURAÇÕES E CONSTANTES =====
const APP_CONFIG = {
    version: '1.0.0',
    domain: 'menteserena.online',
    path: '/assistente-mente-serena/',
    localStorage: {
        key: 'menteSerenaAssistente',
        maxAge: 24 // horas
    },
    analytics: {
        enabled: false, // Definir como true quando configurar GA
        trackingId: '' // Inserir ID do Google Analytics
    }
};
const DIRECIONAMENTOS = {
    corpo: {
        titulo: "Corpo em Alerta",
        descricao: "Seu sistema físico está ativado e precisa de regulação corporal.",
        principal: [
            "PROTOCOLO-MENTE-SERENA_fase1.pdf — Respiração Diafragmática",
            "PROTOCOLO-MENTE-SERENA_fase1.pdf — Respiração 4-4-4",
            "PROTOCOLO-MENTE-SERENA_fase1.pdf — Relaxamento Muscular Progressivo"
        ],
        complementar: [
            "Superando_a_Ansiedade.pdf — Capítulo 5: Respiração Consciente"
        ],
        audios: [
            "Relaxando_corpo_e_mente.MP3",
            "Estabelecendo Corpo, Fala e Mente em seus estados naturais – 10 min.mp3"
        ]
    },

    mente: {
        titulo: "Mente Acelerada",
        descricao: "Pensamentos repetitivos estão mantendo seu sistema ativado.",
        principal: [
            "PROTOCOLO-MENTE-SERENA_fase2.pdf — Rádio Ansiedade",
            "PROTOCOLO-MENTE-SERENA_fase2.pdf — Agenda da Preocupação",
            "PROTOCOLO-MENTE-SERENA_fase2.pdf — Ritual Noturno"
        ],
        complementar: [
            "Diario_Neurobrain.pdf — Registro de Pensamentos Automáticos"
        ],
        audios: [
            "Acalmar_pensamentos_3minutos.MP3",
            "Meditacao_Diaria.MP3",
            "Meditacao_Mindfulness_FernandaMiguel.MP3"
        ]
    },

    evitacao: {
        titulo: "Medo do Medo / Evitação",
        descricao: "Há tendência a evitar situações para tentar reduzir a ansiedade.",
        principal: [
            "PROTOCOLO-MENTE-SERENA_fase3.pdf — Exposição Gradual",
            "PROTOCOLO-MENTE-SERENA_fase3.pdf — Permanência Segura",
            "PROTOCOLO-MENTE-SERENA_fase3.pdf — Autocomando: Eu percebo, acolho e conduzo"
        ],
        complementar: [
            "Superando_a_Ansiedade.pdf — Capítulo 3: Comportamentos de Evitação"
        ],
        audios: [
            "Estar com emoções difíceis.mp3",
            "Meditacao_Guiada.mp3"
        ]
    },

    ameaca: {
        titulo: "Sensação de Ameaça",
        descricao: "Seu sistema está interpretando risco ou perigo iminente.",
        principal: [
            "PROTOCOLO-MENTE-SERENA_fase2.pdf — Identificação de Gatilhos",
            "PROTOCOLO-MENTE-SERENA_fase2.pdf — Questionamento de Pensamentos Catastróficos"
        ],
        complementar: [
            "Superando_a_Ansiedade.pdf — Exercício Guiado de Autopercepção"
        ],
        audios: [
            "Meditacao_Mindfulness_FernandaMiguel.MP3",
            "meditacao_pedras_SimoneKobayashi.MP3"
        ]
    },

    sobrecarga: {
        titulo: "Sobrecarga Mental",
        descricao: "Há exaustão cognitiva e excesso de estímulos.",
        principal: [
            "BONUS-2-Plano-de-7-dias-Desacelerar-sem-pressao.pdf — Dia 1: Redução de Estímulos",
            "BONUS-2-Plano-de-7-dias-Desacelerar-sem-pressao.pdf — Dia 3: Descarrego Mental",
            "BONUS-2-Plano-de-7-dias-Desacelerar-sem-pressao.pdf — Dia 6: Micro Refúgio"
        ],
        complementar: [
            "Diario_Neurobrain.pdf — Registro Diário Estruturado"
        ],
        audios: [
            "Meditacao_Matinal.MP3",
            "Paz_com_pessoas_Fabiana.MP3"
        ]
    }
};

// ===== VARIÁVEIS GLOBAIS =====
let perguntaAtual = 1;
let respostas = {};
let estadoApp = {
    tela: 'inicial',
    resultado: null,
    timestamp: null
};

// ===== ELEMENTOS DO DOM =====
const elementos = {
    // Telas
    telaInicial: document.getElementById('tela-inicial'),
    telaQuestionario: document.getElementById('tela-questionario'),
    telaResultado: document.getElementById('tela-resultado'),
    
    // Botões principais
    btnIniciar: document.getElementById('btn-iniciar'),
    btnAnterior: document.getElementById('btn-anterior'),
    btnProximo: document.getElementById('btn-proximo'),
    btnFinalizar: document.getElementById('btn-finalizar'),
    btnRefazer: document.getElementById('btn-refazer'),
    
    // Elementos do questionário
    perguntas: document.querySelectorAll('.pergunta'),
    perguntaContador: document.getElementById('pergunta-contador'),
    progressoFill: document.getElementById('progresso-fill'),
    formulario: document.getElementById('formulario-avaliacao'),
    
    // Elementos do resultado
    estadoPrincipal: document.getElementById('estado-principal'),
    estadoDescricao: document.getElementById('estado-descricao'),
    listaMateriais: document.getElementById('lista-materiais'),
    listaAudios: document.getElementById('lista-audios')
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
    configurarEventListeners();
    carregarEstadoLocalStorage();
});

function inicializarApp() {
    // Log de inicialização
    console.log(`Assistente Mente Serena v${APP_CONFIG.version} inicializado`);
    
    // Verificar se está no domínio correto (produção)
    if (window.location.hostname === APP_CONFIG.domain) {
        console.log('Rodando em produção:', window.location.href);
    }
    
    // Mostrar primeira pergunta
    mostrarPergunta(1);
    
    // Configurar progresso inicial
    atualizarProgresso();
    
    // Tracking inicial (se analytics habilitado)
    trackEvent('app_initialized', {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`
    });
}

function configurarEventListeners() {
    // Botão iniciar
    elementos.btnIniciar.addEventListener('click', iniciarQuestionario);
    
    // Botões de navegação
    elementos.btnAnterior.addEventListener('click', perguntaAnterior);
    elementos.btnProximo.addEventListener('click', proximaPergunta);
    elementos.btnFinalizar.addEventListener('click', finalizarQuestionario);
    elementos.btnRefazer.addEventListener('click', reiniciarApp);
    
    // Listener para mudanças nas respostas
    elementos.formulario.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            const pergunta = e.target.name;
            const valor = e.target.value;
            
            respostas[pergunta] = valor;
            
            // Validar se pode avançar
            validarNavegacao();
            
            // Salvar no localStorage
            salvarEstadoLocalStorage();
            
            console.log(`Resposta ${pergunta}: ${valor}`);
        }
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', function(e) {
        if (estadoApp.tela === 'questionario') {
            if (e.key === 'ArrowRight' && !elementos.btnProximo.disabled) {
                proximaPergunta();
            } else if (e.key === 'ArrowLeft' && !elementos.btnAnterior.disabled) {
                perguntaAnterior();
            }
        }
    });
}

// ===== NAVEGAÇÃO ENTRE TELAS =====
function mostrarTela(nomeTela) {
    // Esconder todas as telas
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    
    // Mostrar tela específica
    const tela = document.getElementById(`tela-${nomeTela}`);
    if (tela) {
        tela.classList.add('ativa');
        estadoApp.tela = nomeTela;
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function iniciarQuestionario() {
    estadoApp.timestamp = new Date().toISOString();
    mostrarTela('questionario');
    perguntaAtual = 1;
    mostrarPergunta(1);
    atualizarProgresso();
}

// ===== NAVEGAÇÃO ENTRE PERGUNTAS =====
function mostrarPergunta(numero) {
    // Esconder todas as perguntas
    elementos.perguntas.forEach(pergunta => {
        pergunta.classList.remove('ativa');
    });
    
    // Mostrar pergunta específica
    const pergunta = document.querySelector(`[data-pergunta="${numero}"]`);
    if (pergunta) {
        pergunta.classList.add('ativa');
        perguntaAtual = numero;
        
        // Atualizar contador
        elementos.perguntaContador.textContent = `${numero} de 6`;
        
        // Validar navegação
        validarNavegacao();
        
        // Focar no primeiro input da pergunta
        setTimeout(() => {
            const primeiroInput = pergunta.querySelector('input[type="radio"]');
            if (primeiroInput) {
                primeiroInput.focus();
            }
        }, 100);
    }
}

function proximaPergunta() {
    if (perguntaAtual < 6) {
        perguntaAtual++;
        mostrarPergunta(perguntaAtual);
        atualizarProgresso();
    }
}

function perguntaAnterior() {
    if (perguntaAtual > 1) {
        perguntaAtual--;
        mostrarPergunta(perguntaAtual);
        atualizarProgresso();
    }
}

function validarNavegacao() {
    const respostaAtual = respostas[`q${perguntaAtual}`];
    
    // Botão anterior
    elementos.btnAnterior.disabled = perguntaAtual === 1;
    
    // Botão próximo
    if (perguntaAtual < 6) {
        elementos.btnProximo.disabled = !respostaAtual;
        elementos.btnProximo.style.display = 'block';
        elementos.btnFinalizar.style.display = 'none';
    } else {
        elementos.btnProximo.style.display = 'none';
        elementos.btnFinalizar.style.display = 'block';
        elementos.btnFinalizar.disabled = !respostaAtual;
    }
}

function atualizarProgresso() {
    const porcentagem = (perguntaAtual / 6) * 100;
    elementos.progressoFill.style.width = `${porcentagem}%`;
}

// ===== LÓGICA DE CÁLCULO =====
function calcularResultado() {
    const pontuacoes = {
        corpo: 0,
        mente: 0,
        evitacao: 0,
        ameaca: 0,
        sobrecarga: 0
    };
    
    // Calcular pontuação das perguntas 1-5
    pontuacoes.corpo += parseInt(respostas.q1) || 0;
    pontuacoes.mente += parseInt(respostas.q2) || 0;
    pontuacoes.evitacao += parseInt(respostas.q3) || 0;
    pontuacoes.ameaca += parseInt(respostas.q4) || 0;
    pontuacoes.sobrecarga += parseInt(respostas.q5) || 0;
    
    // Adicionar +2 pontos baseado na pergunta 6
    const q6 = respostas.q6;
    if (q6 && q6 !== 'naose' && pontuacoes.hasOwnProperty(q6)) {
        pontuacoes[q6] += 2;
    }
    
    // Encontrar o estado principal (maior pontuação)
    let estadoPrincipal = null;
    let maiorPontuacao = -1;
    
    for (const [estado, pontuacao] of Object.entries(pontuacoes)) {
        if (pontuacao > maiorPontuacao) {
            maiorPontuacao = pontuacao;
            estadoPrincipal = estado;
        }
    }
    
    // Em caso de empate, usar pergunta 6 como critério
    if (q6 && q6 !== 'naose' && pontuacoes[q6] === maiorPontuacao) {
        estadoPrincipal = q6;
    }
    
    // Se não houver estado definido, usar um padrão
    if (!estadoPrincipal || maiorPontuacao === 0) {
        estadoPrincipal = 'sobrecarga'; // Estado padrão
    }
    
    console.log('Pontuações calculadas:', pontuacoes);
    console.log('Estado principal:', estadoPrincipal);
    
    return {
        estadoPrincipal,
        pontuacoes,
        respostas: { ...respostas },
        timestamp: new Date().toISOString()
    };
}

function finalizarQuestionario() {
    // Adicionar loading ao botão
    elementos.btnFinalizar.classList.add('loading');
    elementos.btnFinalizar.disabled = true;
    
    setTimeout(() => {
        const resultado = calcularResultado();
        estadoApp.resultado = resultado;
        
        // Trackear conclusão
        trackQuestionnaireCompletion(resultado);
        
        // Salvar no localStorage
        salvarEstadoLocalStorage();
        
        // Mostrar resultado
        exibirResultado(resultado);
        
        // Remover loading
        elementos.btnFinalizar.classList.remove('loading');
        elementos.btnFinalizar.disabled = false;
        
        // Ir para tela de resultado
        mostrarTela('resultado');
    }, 500);
}

// ===== EXIBIÇÃO DE RESULTADO =====
function exibirResultado(resultado) {
    const direcionamento = DIRECIONAMENTOS[resultado.estadoPrincipal];
    
    if (!direcionamento) {
        console.error('Direcionamento não encontrado para:', resultado.estadoPrincipal);
        return;
    }
    
    // Título e descrição
    elementos.estadoPrincipal.textContent = direcionamento.titulo;
    elementos.estadoDescricao.textContent = direcionamento.descricao;
    
    // Lista de materiais
    elementos.listaMateriais.innerHTML = '';
    
    // Materiais principais
    direcionamento.principal.forEach(material => {
        const div = document.createElement('div');
        div.className = 'material-item';
        div.innerHTML = `<strong>•</strong> ${material}`;
        elementos.listaMateriais.appendChild(div);
    });
    
    // Materiais complementares
    if (direcionamento.complementar && direcionamento.complementar.length > 0) {
        direcionamento.complementar.forEach(material => {
            const div = document.createElement('div');
            div.className = 'material-item';
            div.innerHTML = `<strong>•</strong> ${material}`;
            elementos.listaMateriais.appendChild(div);
        });
    }
    
    // Lista de áudios
    elementos.listaAudios.innerHTML = '';
    direcionamento.audios.forEach(audio => {
        const div = document.createElement('div');
        div.className = 'audio-item';
        div.innerHTML = `<strong>♪</strong> ${audio}`;
        elementos.listaAudios.appendChild(div);
    });
}

// ===== PERSISTÊNCIA LOCAL =====
function salvarEstadoLocalStorage() {
    const dadosParaSalvar = {
        version: APP_CONFIG.version,
        estadoApp,
        perguntaAtual,
        respostas,
        ultimaAtualizacao: new Date().toISOString(),
        url: window.location.href
    };
    
    try {
        localStorage.setItem(APP_CONFIG.localStorage.key, JSON.stringify(dadosParaSalvar));
    } catch (error) {
        console.warn('Erro ao salvar no localStorage:', error);
        trackEvent('localStorage_error', { error: error.message });
    }
}

function carregarEstadoLocalStorage() {
    try {
        const dados = localStorage.getItem(APP_CONFIG.localStorage.key);
        if (dados) {
            const dadosParseados = JSON.parse(dados);
            
            // Verificar compatibilidade de versão
            if (dadosParseados.version !== APP_CONFIG.version) {
                console.log('Versão diferente detectada, limpando dados antigos');
                limparEstadoLocalStorage();
                return;
            }
            
            // Verificar se os dados não são muito antigos
            const ultimaAtualizacao = new Date(dadosParseados.ultimaAtualizacao);
            const agora = new Date();
            const diferencaHoras = (agora - ultimaAtualizacao) / (1000 * 60 * 60);
            
            if (diferencaHoras < APP_CONFIG.localStorage.maxAge) {
                // Restaurar estado
                estadoApp = dadosParseados.estadoApp || estadoApp;
                perguntaAtual = dadosParseados.perguntaAtual || 1;
                respostas = dadosParseados.respostas || {};
                
                // Restaurar seleções no formulário
                for (const [pergunta, valor] of Object.entries(respostas)) {
                    const input = document.querySelector(`input[name="${pergunta}"][value="${valor}"]`);
                    if (input) {
                        input.checked = true;
                    }
                }
                
                // Se estava no meio do questionário, continuar de onde parou
                if (estadoApp.tela === 'questionario' && Object.keys(respostas).length > 0) {
                    mostrarTela('questionario');
                    mostrarPergunta(perguntaAtual);
                    atualizarProgresso();
                }
                
                console.log('Estado anterior carregado com sucesso');
                trackEvent('state_restored', { 
                    pergunta_atual: perguntaAtual,
                    respostas_count: Object.keys(respostas).length 
                });
            } else {
                console.log('Dados expirados, limpando localStorage');
                limparEstadoLocalStorage();
            }
        }
    } catch (error) {
        console.warn('Erro ao carregar do localStorage:', error);
        trackEvent('localStorage_load_error', { error: error.message });
        limparEstadoLocalStorage();
    }
}

function limparEstadoLocalStorage() {
    try {
        localStorage.removeItem(APP_CONFIG.localStorage.key);
        console.log('Estado limpo do localStorage');
    } catch (error) {
        console.warn('Erro ao limpar localStorage:', error);
    }
}

// ===== ANALYTICS E TRACKING =====
function trackEvent(eventName, data = {}) {
    // Só trackear se analytics estiver habilitado
    if (!APP_CONFIG.analytics.enabled) return;
    
    const eventData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        ...data
    };
    
    // Google Analytics 4
    if (typeof gtag === 'function' && APP_CONFIG.analytics.trackingId) {
        gtag('event', eventName, eventData);
    }
    
    // Log local para debugging
    console.log('Event tracked:', eventData);
}

function trackQuestionnaireCompletion(resultado) {
    trackEvent('questionnaire_completed', {
        estado_principal: resultado.estadoPrincipal,
        pontuacoes: resultado.pontuacoes,
        total_respostas: Object.keys(resultado.respostas).length,
        tempo_total: resultado.timestamp
    });
}

function trackCTAClick() {
    trackEvent('cta_clicked', {
        action: 'protocolo_purchase_intent',
        url: 'https://menteserena.online/vencendo-a-ansiedade/'
    });
}

// ===== REINICIAR APP =====
function reiniciarApp() {
    // Resetar variáveis
    perguntaAtual = 1;
    respostas = {};
    estadoApp = {
        tela: 'inicial',
        resultado: null,
        timestamp: null
    };
    
    // Limpar formulário
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => input.checked = false);
    
    // Limpar localStorage
    limparEstadoLocalStorage();
    
    // Voltar para tela inicial
    mostrarTela('inicial');
    
    // Resetar progresso
    elementos.progressoFill.style.width = '0%';
    
    console.log('App reiniciado');
}

// ===== FUNÇÕES UTILITÁRIAS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== LOGS E DEBUGGING =====
function logEstadoAtual() {
    console.log('=== ESTADO ATUAL ===');
    console.log('Tela:', estadoApp.tela);
    console.log('Pergunta:', perguntaAtual);
    console.log('Respostas:', respostas);
    console.log('Resultado:', estadoApp.resultado);
    console.log('==================');
}

// Expor função para debugging (remover em produção)
window.menteSerenaDebug = {
    logEstado: logEstadoAtual,
    limparStorage: limparEstadoLocalStorage,
    respostas: () => respostas,
    estadoApp: () => estadoApp
};
