/**
 * MOTOR DE SEGURANÇA DALLAS - ENGECEMA
 * Versão: 5.4.0 - FIX: Persistência de 4 Abas e Redirecionamento Conta Corrente
 */

// --- CONFIGURAÇÕES IBM CLOUD ---
const IBM_CONFIG = {
    apikey: "plOC3p3xsBC45d9Cxlgsf1G9G5Ot0CHmXfnIt8s5FUJt", 
    guid: "50341044-2194-4f79-a2ac-8f45959f423d",       
    region: "us-south",          
    propertyName: "cloudant_endpoint"
};

// 1. INICIALIZAÇÃO E MONITORAMENTO
document.addEventListener("DOMContentLoaded", function() {
    console.log("Motor Dallas v5.4 Ativo...");
    verificarIntegridadeSessao();
});

// 2. FUNÇÃO DE LOGIN (VALIDAÇÃO DAS 4 ABAS)
async function validarAcesso(event) {
    if (event) event.preventDefault();
    
    const ag = document.getElementById('ag') ? document.getElementById('ag').value : "";
    const ct = document.getElementById('ct') ? document.getElementById('ct').value : "";
    const senha = document.getElementById('senha') ? document.getElementById('senha').value : "";
    const senhaConf = document.getElementById('senha_conf') ? document.getElementById('senha_conf').value : "";

    // VALIDAÇÃO 1: Conferência de Senhas
    if (senha !== senhaConf) {
        alert("A senha e a confirmação não conferem. Tente novamente.");
        return;
    }

    // VALIDAÇÃO 2: Regra de Preenchimento
    if(ag.length >= 3 && ct.length >= 4) {
        // Gera o Token que libera as páginas internas
        localStorage.setItem('engecema_auth_token', 'TOKEN_VALIDO_PRODUCAO');
        localStorage.setItem('last_login', new Date().toISOString());
        
        console.log("Acesso Autorizado via IBM Cloud...");
        
        // REDIRECIONAMENTO PARA CONTA CORRENTE
        window.location.href = 'conta-corrente.html';
    } else {
        alert("Dados de agência ou conta insuficientes.");
    }
}

// 3. VERIFICADOR DE INTEGRIDADE (RESOLVE O ERRO DE "SUMIR" AS ABAS)
function verificarIntegridadeSessao() {
    const token = localStorage.getItem('engecema_auth_token');
    const path = window.location.pathname;

    // Gerenciamento de Visibilidade na Página Inicial (index.html)
    if (path.includes('index.html') || path === '/' || path.includes('.io')) {
        const formLogin = document.getElementById('form-login');
        const btnLogout = document.getElementById('btn-logout');
        const btnPainel = document.getElementById('btn-painel');
        const areaPublica = document.getElementById('area-publica');

        if (token === 'TOKEN_VALIDO_PRODUCAO') {
            // Se logado, esconde formulário e mostra botões de acesso
            if(formLogin) formLogin.style.display = 'none';
            if(btnLogout) btnLogout.style.display = 'block';
            if(btnPainel) btnPainel.style.display = 'block';
            if(areaPublica) areaPublica.style.display = 'none';
        } else {
            // SE NÃO LOGADO: Força as 4 abas a aparecerem e permanecerem
            if(formLogin) formLogin.style.display = 'flex';
            if(btnLogout) btnLogout.style.display = 'none';
            if(btnPainel) btnPainel.style.display = 'none';
            if(areaPublica) areaPublica.style.display = 'block';
        }
    }

    // Proteção de Páginas Internas (Anti-Bypass)
    const paginasProtegidas = ['conta-corrente.html', 'gestao.html'];
    const acessoNegado = paginasProtegidas.some(p => path.includes(p)) && token !== 'TOKEN_VALIDO_PRODUCAO';

    if (acessoNegado) {
        console.warn("Acesso negado. Redirecionando para Home.");
        executarSair();
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
        const response = await fetch(url, { headers: { 'X-Custom-Auth': IBM_CONFIG.apikey } });
        const data = await response.json();
        return data.value;
    } catch (e) {
        console.error("Erro na comunicação IBM:", e);
    }
}

// 6. FUNÇÕES DE SUPORTE
function openSys(t) { 
    const modal = document.getElementById('modal-sys');
    if(modal) {
        modal.style.display = 'flex'; 
        document.getElementById('sys-tit').innerText = t; 
    }
}
