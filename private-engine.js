/**
 * MOTOR DE SEGURANÇA E FOMENTO DALLAS - ENGECEMA
 * Integração GitHub & IBM Cloud
 */

// Ao carregar a página, verifica se o usuário já está "logado"
document.addEventListener("DOMContentLoaded", function() {
    checkSession();
});

function handleLogin(event) {
    event.preventDefault();
    
    const ag = document.getElementById('agencia').value;
    const ct = document.getElementById('conta').value;

    if(ag.length >= 4 && ct.length >= 4) {
        // Simula gravação de sessão (Padrão IBM Cloud Auth)
        localStorage.setItem('engecema_session', 'active');
        localStorage.setItem('user_ref', ag + "-" + ct);
        
        // Redireciona para o painel de RH / Admin
        // Se estiver na index, apenas atualiza a barra superior
        alert("Acesso autorizado! Redirecionando ao Painel RH...");
        window.location.href = 'admin.html'; 
    } else {
        alert("Por favor, preencha os dados corretamente.");
    }
}

function checkSession() {
    const session = localStorage.getItem('engecema_session');
    const formLogin = document.getElementById('form-login');
    const btnSair = document.getElementById('btn-sair');

    if (session === 'active') {
        // Se logado: Esconde formulário e mostra botão Sair
        if(formLogin) formLogin.style.display = 'none';
        if(btnSair) btnSair.style.display = 'block';
    } else {
        // Se deslogado: Mostra formulário e esconde botão Sair
        if(formLogin) formLogin.style.display = 'flex';
        if(btnSair) btnSair.style.display = 'none';
    }
}

function logout() {
    // Limpa os dados de segurança
    localStorage.removeItem('engecema_session');
    localStorage.removeItem('user_ref');
    
    alert("Sessão encerrada com segurança.");
    
    // Redireciona para a home limpa
    window.location.href = 'index.html';
}

// Interceptação de segurança para páginas privadas
if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('painel.html')) {
    if (localStorage.getItem('engecema_session') !== 'active') {
        window.location.href = 'index.html';
    }
}
