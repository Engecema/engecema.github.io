/**
 * MOTOR DE SEGURANÇA ENGECEMA - GESTÃO RH
 * Responsável por controlar o acesso e o botão de Logout
 */

document.addEventListener("DOMContentLoaded", function() {
    // Verifica se existe uma sessão ativa ao carregar a página
    verificarSessao();
});

// FUNÇÃO DE LOGIN (CHAMADA PELO BOTÃO 'OK' DO INDEX)
function validarAcesso(event) {
    event.preventDefault();
    
    const ag = document.getElementById('ag').value;
    const ct = document.getElementById('ct').value;

    // Simulação de validação de acesso
    if(ag.length >= 4 && ct.length >= 4) {
        localStorage.setItem('engecema_auth', 'active');
        localStorage.setItem('user_session', ag + ct);
        
        // Redireciona para o painel de colaboradores que você já tem
        // Se a página for admin.html, mude abaixo:
        window.location.href = 'admin.html'; 
    } else {
        alert("Dados incorretos. Verifique Agência e Conta.");
    }
}

// FUNÇÃO QUE CONTROLA O QUE APARECE NA TELA
function verificarSessao() {
    const status = localStorage.getItem('engecema_auth');
    const formLogin = document.getElementById('form-login');
    const btnLogout = document.getElementById('btn-logout');

    if (status === 'active') {
        // Se logado: Esconde inputs e mostra botão de SAIR
        if (formLogin) formLogin.style.display = 'none';
        if (btnLogout) {
            btnLogout.style.display = 'block'; // FORÇA A APARIÇÃO
            btnLogout.style.visibility = 'visible';
        }
    } else {
        // Se deslogado: Mostra inputs e esconde botão de SAIR
        if (formLogin) formLogin.style.display = 'flex';
        if (btnLogout) btnLogout.style.display = 'none';

        // Proteção: Impede acesso direto à página de gestão sem login
        if (window.location.pathname.includes('admin.html')) {
            window.location.href = 'index.html';
        }
    }
}

// FUNÇÃO DO BOTÃO SAIR (LOGOUT)
function executarSair() {
    // Limpa os dados de segurança do navegador
    localStorage.removeItem('engecema_auth');
    localStorage.removeItem('user_session');
    
    alert("Sessão encerrada com segurança.");
    
    // Volta para a página inicial
    window.location.href = 'index.html';
}
