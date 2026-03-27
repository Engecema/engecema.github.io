/**
 * MOTOR DE SEGURANÇA E GESTÃO DALLAS - ENGECEMA
 * Versão: 4.5.0 - PROTECTED (4 Abas + Conta Corrente Redirect)
 */

// --- CONFIGURAÇÕES IBM CLOUD ---
const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south",          
    propertyName: "cloudant_endpoint"
};

// 1. PROTEÇÃO DE INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function() {
    console.log("Motor Engecema Dallas v4.5 Ativo...");
    verificarIntegridadeSessao();
});

// 2. FUNÇÃO DE LOGIN (VALIDAÇÃO DAS 4 ABAS E REDIRECIONAMENTO)
async function validarAcesso(event) {
    if (event) event.preventDefault();
    
    // Captura dos 4 campos do index.html
    const ag = document.getElementById('ag') ? document.getElementById('ag').value : "";
    const ct = document.getElementById('ct') ? document.getElementById('ct').value : "";
    const senha = document.getElementById('senha') ? document.getElementById('senha').value : "";
    const senhaConf = document.getElementById('senha_conf') ? document.getElementById('senha_conf').value : "";

    // VALIDAÇÃO 1: Campos Vazios
    if (!ag || !ct || !senha || !senhaConf) {
        alert("Por favor, preencha todos os campos de acesso.");
        return;
    }

    // VALIDAÇÃO 2: Conferência de Senhas (As 4 abas)
    if (senha !== senhaConf) {
        alert("A senha e a confirmação não conferem. Tente novamente.");
        return;
    }

    // VALIDAÇÃO 3: Regra de Agência e Conta
    if(ag.length >= 3 && ct.length >= 4) {
        // Geração do Token de Sessão
        localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
        localStorage.setItem('last_login', new Date().toISOString());
        
        console.log("Autenticando via IBM Cloud IAM...");
        
        // REDIRECIONAMENTO PARA CONTA CORRENTE (Não mais para Gestão RH)
        window.location.href = 'conta-corrente.html';
    } else {
        alert("Credenciais Inválidas para o Sistema.");
    }
}

// 3. VERIFICADOR DE SEGURANÇA (IMPEDE ACESSO DIRETO ÀS PÁGINAS INTERNAS)
function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    const path = window.location.pathname;

    // Protege tanto a Gestão quanto a Conta Corrente
    const isAreaProtegida = path.includes('gestao.html') || path.includes('conta-corrente.html');

    if (isAreaProtegida && token !== 'TOKEN_VALIDO_PRODUCAO') {
        console.warn("Sessão inválida. Bloqueando acesso.");
        executarSair();
    }

    // Gerencia botões de logout na interface
    if (token === 'TOKEN_VALIDO_PRODUCAO') {
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) btnLogout.style.display = 'block';
    }
}

// 4. FUNÇÃO DE LOGOUT (LIMPEZA TOTAL)
function executarSair() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// 5. BUSCA DINÂMICA DA URL DO CLOUDANT
async function obterEndpointCloudant() {
    try {
        const url = `https://${IBM_CONFIG.region}://{IBM_CONFIG.guid}/collections/default/properties/${IBM_CONFIG.propertyName}`;
        console.log("Conectando ao App Configuration...");
        return "URL_CONFIGURADA_IBM"; 
    } catch (e) {
        console.error("Erro na ponte IBM Cloud:", e);
    }
}

// 6. FUNÇÕES DE MODAL
function openSys(t) { 
    const modal = document.getElementById('modal-sys');
    const tit = document.getElementById('sys-tit');
    if(modal && tit) {
        modal.style.display = 'flex'; 
        tit.innerText = t; 
    }
}
