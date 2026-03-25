/**
 * MOTOR DE SEGURANÇA E GESTÃO DALLAS - ENGECEMA
 * Versão: 2.0.4 - Integração IBM Cloud & GitHub Enterprise
 */

// 1. PROTEÇÃO DE INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", function() {
    console.log("Motor Engecema Ativo...");
    verificarIntegridadeSessao();
});

// 2. FUNÇÃO DE LOGIN (CHAMADA PELA INDEX.HTML)
function validarAcesso(event) {
    if (event) event.preventDefault();
    
    // Captura opcional de dados para logs de segurança
    const ag = document.getElementById('ag') ? document.getElementById('ag').value : "";
    const ct = document.getElementById('ct') ? document.getElementById('ct').value : "";

    // Define a trava de segurança no navegador (Sessão Ativa)
    localStorage.setItem('engecema_auth', 'active');
    localStorage.setItem('last_login', new Date().toISOString());
    
    // Redirecionamento forçado para o painel de gestão
    window.location.replace('admin.html');
}

// 3. VERIFICADOR DE SEGURANÇA (IMPEDE ACESSO INDEVIDO)
function verificarIntegridadeSessao() {
    const status = localStorage.getItem('engecema_auth');
    const path = window.location.pathname;

    // Se estiver na admin sem estar logado, expulsa para a index
    if (path.includes('admin.html') && status !== 'active') {
        console.warn("Acesso negado. Redirecionando...");
        window.location.replace('index.html');
    }

    // Se estiver logado, garante que o botão de sair apareça
    if (status === 'active') {
        const btnSair = document.getElementById('btn-sair-header');
        if (btnSair) {
            btnSair.style.display = 'block';
            btnSair.style.visibility = 'visible';
        }
    }
}

// 4. FUNÇÃO DE LOGOUT (ENCERRAMENTO DE SESSÃO)
function executarSair() {
    // Limpeza total de rastros de sessão
    localStorage.removeItem('engecema_auth');
    localStorage.removeItem('last_login');
    localStorage.clear();
    sessionStorage.clear();
    
    // Alerta de segurança padrão Bradesco/RH
    alert("Sessão Engecema encerrada com sucesso.");
    
    // Redireciona para a página inicial limpando o histórico
    window.location.replace('index.html');
}

// 5. FUNÇÕES DE SUPORTE AO PAINEL (MODAL E OPERAÇÕES)
function abrir(titulo) {
    const modal = document.getElementById('modal-br');
    const mTit = document.getElementById('m-tit');
    if (modal && mTit) {
        mTit.innerText = titulo;
        modal.style.display = 'flex';
    }
}

function fechar() {
    const modal = document.getElementById('modal-br');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Listener para fechar modal com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") fechar();
});
